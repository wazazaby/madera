'use strict';
import * as schemas from './schemas';
import db from '../../utils/db';

export default async app => {
    const base = '/quotationStatus';

    app.get(`${base}/all`, {
        preHandler: app.auth([app.verifyJWT])
    }, async () => {
        const quotationStatuses = await db.quotationStatus.findMany();
        return {
            statusCode: 200,
            message: '',
            data: { quotationStatuses }
        }
    });

    app.get(`${base}/:id`, {
        schema: schemas.byId,
        preHandler: app.auth([app.verifyJWT])
    }, async (req, rep) => {
        const { id } = req.params;
        const quotationStatus = await db.quotationStatus.findFirst({
            where: { id }
        });
        return quotationStatus === null 
            ? rep.notFound('Statut de devis introuvable') 
            : { statusCode: 200, message: '', data: { quotationStatus } };
    });
}