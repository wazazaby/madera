'use strict';

import { PrismaClient } from '@prisma/client';
import * as schemas from './schemas';

export default async app => {
    const BASE = '/role';
    const db = new PrismaClient();

    app.get(`${BASE}/all`, {
        preHandler: app.auth([app.verifyJWT])
    }, async () => {
        const roles = await db.role.findMany();
        return {
            statusCode: 200,
            message: '',
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