'use strict';
import * as schemas from './schemas';
import db from '../../utils/db';

export default async app => {
    const base = '/payment';
    
    app.post(`${base}/add`, {
        schema: schemas.add,
        preHandler: app.auth([app.verifyJWT, app.isCommercial], { relation: 'and' })
    }, async (req, rep) => {
        const { paymentId, value } = req.body;
        const { entityId } = req.user;
        // Vérification pour savoir si le commercial peut modifier ce paiement
        const quotation = await db.quotation.findFirst({
            where: {
                orders: {
                    payments: {
                        some: { id: paymentId }
                    }
                }
            }
        });
        if (quotation === null || quotation.commercialId !== entityId) {
            return rep.unauthorized('Vous ne pouvez pas mettre à jour ce paiement');
        }
        // Vérification sur les valeurs des paiements
        const payment = await db.payment.findFirst({ where: { id: paymentId } });
        if (payment.leftToPay === 0) {
            return rep.badRequest('Paiement déjà complété');
        }
        if ((payment.currentlyPaid + value) > payment.total) {
            return rep.badRequest('Valeur envoyé trop grande');
        }
        const currentlyPaid = Number((payment.currentlyPaid + value).toFixed(2));
        const leftToPay = Number((payment.leftToPay - value).toFixed(2));
        const newPayment = await db.payment.update({
            where: { id: paymentId },
            data: { currentlyPaid, leftToPay, historic: { create: { value } } },
            include: {
                type: true,
                historic: true
            }
        });
        const message = newPayment.leftToPay === 0 
            ? 'Paiement complété' 
            : 'Valeur ajoutée au paiement';
        return { 
            statusCode: 200, 
            message, 
            data: { payment: newPayment} 
        }
    });
}