'use strict';
import * as schemas from './schemas';
import db from '../../utils/db';

export default async app => {
    const base = '/orderStatus';

    app.get(`${base}/all`, {
        preHandler: app.auth([app.verifyJWT])
    }, async () => {
        const orderStatuses = await db.orderStatus.findMany();
        return {
            statusCode: 200,
            message: '',
            data: { orderStatuses }
        }
    });

    app.get(`${base}/:id`, {
        schema: schemas.byId,
        preHandler: app.auth([app.verifyJWT])
    }, async (req, rep) => {
        const { id } = req.params;
        const orderStatus = await db.orderStatus.findFirst({
            where: { id }
        });
        return orderStatus === null 
            ? rep.notFound('Status de commande introuvable') 
            : { statusCode: 200, message: '', data: { orderStatus } };
    });
}