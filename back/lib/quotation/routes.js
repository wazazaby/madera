'use strict';
import * as schemas from './schemas';
import db from '../../utils/db';

export default async app => {
    const base = '/quotation';
<<<<<<< HEAD
    const calculatePercentage = price => percentage => Number(((price / 100) * percentage).toFixed(2));
    
=======

>>>>>>> 995becd2ca39c11cc1ff4bf0e690c6e2033110fe
    app.post(`${base}/create`, {
        schema: schemas.create,
        preHandler: app.auth([app.verifyJWT, app.isCommercial], { relation: 'and' })
    }, async (req, rep) => {
        console.log('*********************************')
        const { label, shortDescription, clientId, modulesId } = req.body;

        console.log(label, shortDescription, clientId, modulesId)
        const { getStatus, getModules } = req.query;
        try {
            // On récupère tout les composants en fonction des modules choisis
            // Permettra de faire le calcul pour le total du devis
            const toAggregate = await Promise.all(
                modulesId.map(id => (
                    db.module.findFirst({
                        where: { id },
                        select: {
                            components: {
                                select: { component: { select: { price: true } } }
                            }
                        }
                    })
                ))
            );
            // On fait le calcul, et on garde 2 décimals pour le prix
            const calc = toAggregate
                .reduce((a1, c1) => a1 + c1.components.reduce((a2, c2) => a2 + c2.component.price, 0), 0);
            const price = Number(calc.toFixed(2));
            // Si l'utilisateur veut fetch les modules une fois le devis inséré
            const moar = getModules === true
                ? { modules: { include: { module: true } } }
                : {};
            const newQuotation = await db.quotation.create({
                data: {
                    label,
                    shortDescription,
                    price,
                    commercial: { connect: { id: req.user.entityId } },
                    client: { connect: { id: clientId } },
                    status: { connect: { code: 'WAITING' } },
                    modules: {
                        create: modulesId.map(id => ({ module: { connect: { id } } }))
                    }
                },
                include: {
                    status: getStatus === true,
                    ...moar
                }
            });

            return { statusCode: 200, message: 'Devis créé', data: { quotation: newQuotation } }
        } catch (e) {
            app.log.error(e.message);
            return rep.internalServerError('Il y a eu un problème lors de la création de votre devis, merci de réessayer');
        }
    });

    app.put(`${base}/approve`, {
        schema: schemas.approve,
        preHandler: app.auth([app.verifyJWT, app.isCommercial], { relation: 'and' })
    }, async (req, rep) => {
        const { quotationId } = req.body;
        const { entityId } = req.user;
        const quotation = await db.quotation.findFirst({
            where: { id: quotationId, commercialId: entityId },
            include: { status: true }
        });
        if (quotation === null) {
            return rep.notFound('Devis introuvable');
        }
        // Si le devis est déjà approuvé/refusé
        switch (quotation.status.code) {
            case 'ACCEPTED': return rep.conflict('Devis déjà approuvé');
            case 'DENIED': return rep.conflict('Devis déjà refusé');
        }
        // Calcule des valeurs de chaque paiement
        const calculateWithPrice = calculatePercentage(quotation.price);
        const threePercent = calculateWithPrice(3);
        const sevenPercent = calculateWithPrice(7);
        const fivePercent = calculateWithPrice(5);
        const tenPercent = calculateWithPrice(10);
        const fifteenPercent = calculateWithPrice(15);
        const thirtyfivePercent = calculateWithPrice(35);
        const twentyPercent = calculateWithPrice(20);
        const newQuotation = await db.quotation.update({
            where: { id: quotationId },
            data: { 
                status: { connect: { code: 'ACCEPTED' } },
                orders: {
                    create: {
                        status: { connect: { code: 'WAITING' } },
                        totalPaid: 0,
                        payments: {
                            create: [
                                { 
                                    type: { connect: { code: 'AT_SIGNATURE'} },
                                    total: threePercent,
                                    currentlyPaid: 0,
                                    leftToPay: threePercent,
                                },
                                {
                                    type: { connect: { code: 'AT_CONSTRUCTION_LICENCE_OBTENTION'} },
                                    total: sevenPercent,
                                    currentlyPaid: 0,
                                    leftToPay: sevenPercent,
                                },
                                {
                                    type: { connect: { code: 'AT_SITE_OPENING'} },
                                    total: fivePercent,
                                    currentlyPaid: 0,
                                    leftToPay: fivePercent,
                                },
                                {
                                    type: { connect: { code: 'AT_FOUNDATION_COMPLETION'} },
                                    total: tenPercent,
                                    currentlyPaid: 0,
                                    leftToPay: tenPercent,
                                },
                                {
                                    type: { connect: { code: 'AT_WALLS_COMPLETION'} },
                                    total: fifteenPercent,
                                    currentlyPaid: 0,
                                    leftToPay: fifteenPercent,
                                },
                                {
                                    type: { connect: { code: 'AT_WATER_AIR_PUT_OUT'} },
                                    total: thirtyfivePercent,
                                    currentlyPaid: 0,
                                    leftToPay: thirtyfivePercent,
                                },
                                {
                                    type: { connect: { code: 'AT_EQUIPMENT_WORK_COMPLETION'} },
                                    total: twentyPercent,
                                    currentlyPaid: 0,
                                    leftToPay: twentyPercent,
                                },
                                {
                                    type: { connect: { code: 'AT_KEY_HANDING'} },
                                    total: fivePercent,
                                    currentlyPaid: 0,
                                    leftToPay: fivePercent,
                                }
                            ]
                        }
                    }
                }
            },
            include: {
                status: true,
                orders: {
                    include: {
                        status: true,
                        payments: { include: { type: true } } 
                    }
                }
            }
        });

        return { statusCode: 200, message: 'Devis approuvé avec succès', data: { quotation: newQuotation } }
    });

    app.put(`${base}/deny`, {
        schema: schemas.approve,
        preHandler: app.auth([app.verifyJWT, app.isCommercial], { relation: 'and' })
    }, async (req, rep) => {
        const { quotationId } = req.body;
        const { entityId } = req.user;
        const quotation = await db.quotation.findFirst({
            where: { id: quotationId, commercialId: entityId },
            include: { status: true }
        });
        if (quotation === null) {
            return rep.notFound('Devis introuvable');
        }
        switch (quotation.status.code) {
            case 'ACCEPTED': return rep.conflict('Devis déjà approuvé');
            case 'DENIED': return rep.conflict('Devis déjà refusé');
        }
        // Mise à jour du statut du devis
        const denied = await db.quotation.update({
            where: { id: quotationId },
            data: {
                status: { connect: { code: 'DENIED' } }
            },
            include: { status: true }
        });

        return { statusCode: 200, message: 'Devis refusé avec succès', data: { quotation: denied } }
    });

    app.get(`${base}/all`, {
        preHandler: app.auth([app.verifyJWT, app.isCommercial], { relation: 'and' })
    }, async req => {
        const { entityId } = req.user;
        const quotations = await db.quotation.findMany({
            where: {
                commercialId: entityId
            }
        });
        return { statusCode: 200, message: '', data: { quotations } }
    });

    app.get(`${base}/:id`, {
        schema: schemas.byId,
        preHandler: app.auth([app.verifyJWT, app.isCommercial], { relation: 'and' })
    }, async (req, rep) => {
        const { getStatus, getModules, getPayments } = req.query;
        const { id } = req.params;
        const { entityId } = req.user;
        const moarModules = getModules === true 
            ? { modules: { include: { module: true } } } 
            : {}
        const moarPayments = getPayments === true
            ? { orders: { include: { status: true, payments: { include: { type: true } } } } }
            : {}
        const quotation = await db.quotation.findFirst({
            where: {
                id,
                commercialId: entityId
            },
            include: {
                status: getStatus === true,
                ...moarPayments,
                ...moarModules
            }
        });
        return quotation === null
            ? rep.notFound('Devis introuvable')
            : { statusCode: 200, message: '', data: { quotation } }
    });
}
