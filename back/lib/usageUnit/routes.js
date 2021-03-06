'use strict';
import * as schemas from './schemas';
import db from '../../utils/db';

export default async app => {
    const base = '/usageUnit';

    app.get(`${base}/all`, {
        preHandler: app.auth([app.verifyJWT])
    }, async () => {
        const usageUnits = await db.usageUnit.findMany();
        return {
            statusCode: 200,
            message: '',
            data: { usageUnits }
        }
    });

    app.get(`${base}/:id`, {
        schema: schemas.byId,
        preHandler: app.auth([app.verifyJWT])
    }, async (req, rep) => {
        const { id } = req.params;
        const usageUnit = await db.usageUnit.findFirst({
            where: { id }
        });
        return usageUnit === null 
            ? rep.notFound('Unité introuvable') 
            : { statusCode: 200, message: '', data: { usageUnit } };
    });
}