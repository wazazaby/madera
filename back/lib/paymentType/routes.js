'use strict';
import * as schemas from './schemas';
import db from '../../utils/db';

export default async app => {
    const base = '/paymentType';

    app.get(`${base}/all`, {
        preHandler: app.auth([app.verifyJWT])
    }, async () => {
        const paymentTypes = await db.paymentType.findMany();
        return {
            statusCode: 200,
            message: '',
            data: { paymentTypes }
        }
    });

    app.get(`${base}/:id`, {
        schema: schemas.byId,
        preHandler: app.auth([app.verifyJWT])
    }, async (req, rep) => {
        const { id } = req.params;
        const paymentType = await db.paymentType.findFirst({
            where: { id }
        });
        return paymentType === null 
            ? rep.notFound('Type de paiement introuvable') 
            : { statusCode: 200, message: '', data: { paymentType } };
    });
}