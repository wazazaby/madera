'use strict';
import * as schemas from './schemas';
import db from '../../utils/db';

export default async app => {
    const BASE = '/role';

    app.get(`${BASE}/all`, {
        preHandler: app.auth([app.verifyJWT])
    }, async () => {
        const roles = await db.role.findMany();
        return {
            statusCode: 200,
            message: 'Liste des rôles',
            data: { roles }
        }
    });

    app.get(`${BASE}/:id`, {
        schema: schemas.byId,
        preHandler: app.auth([app.verifyJWT])
    }, async (req, rep) => {
        const { id } = req.params;
        const role = await db.role.findFirst({
            where: { id }
        });
        return role === null
            ? rep.notFound('Rôle introuvable')
            : { statusCode: 200, message: '', data: { role } };
    });
}
