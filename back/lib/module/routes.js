'use strict';

import { PrismaClient } from '@prisma/client';
import * as schemas from './schemas';

export default async app => {
    const base = '/module';
    const db = new PrismaClient();

    app.post(`${base}/create`, {
        schema: schemas.create,
        preHandler: app.auth([app.verifyJWT, app.isCommercial], { relation: 'and' })
    }, async (req, rep) => {
        const { label, reference, shortDescription, description, componentsId } = req.body;
        const { getComponents } = req.query;
        const module = await db.module.findFirst({
            where: { reference }
        });

        if (module !== null) {
            return rep.conflict('Il existe déjà un module avec cette référence');
        }

        const newModule =  await db.module.create({
            data: {
                label,
                reference,
                shortDescription,
                description,
                components: {
                    connect: componentsId.map(id => ({ id }))
                }
            },
            include: {
                components: getComponents === undefined ? false : getComponents
            }
        });

        return newModule
    });
}