'use strict';
import { PrismaClient } from '@prisma/client';
import * as schemas from './schemas';

export default async app => {
    const base = '/quotation';
    const db = new PrismaClient();
    
    app.post(`${base}/create`, {
        schema: schemas.create,
        preHandler: app.auth([app.verifyJWT, app.isCommercial], { relation: 'and' })
    }, async (req, rep) => {
        const { label, shortDescription, clientId, modulesId } = req.body;
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
                                select: {
                                    component: {
                                        select: { price: true }
                                    }
                                }
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
}