'use strict';

import { PrismaClient } from '@prisma/client';
import * as schemas from './schemas';

export default async app => {
    const base = '/component';
    const db = new PrismaClient();

    app.get(`${base}/all`, {
        schema: schemas.all,
        preHandler: app.auth([app.verifyJWT, app.isCommercial], { relation: 'and' })
    }, async req => {
        const { getUnit, getProvider } = req.query;
        const components = await db.component.findMany({
            include: {
                provider: getProvider === undefined ? false : getProvider,
                unit: getUnit === undefined ? false : getUnit
            }
        });
        return { statusCode: 200, message: '', data: { components }}
    });

    app.get(`${base}/:id`, {
        schema: schemas.byId,
        preHandler: app.auth([app.verifyJWT, app.isCommercial], { relation: 'and' })
    }, async (req, rep) => {
        const { id } = req.params;
        const { getUnit, getProvider } = req.query;
        const component = await db.component.findFirst({
            where: { id },
            include: {
                unit: getUnit === undefined ? false : getUnit,
                provider: getProvider === undefined ? false : getProvider
            }
        });
        return component === null
            ? rep.notFound('Composant introuvable')
            : { statusCode: 200, message: '', data: { component } }
    });

    app.post(`${base}/create`, {
        schema: schemas.create,
        preHandler: app.auth([app.verifyJWT])
    }, async (req, rep) => {
        const { label, reference, shortDescription, description, price, providerId, unitId } = req.body;
        const { getUnit, getProvider } = req.query;
        const component = await db.component.findFirst({
            where: { reference }
        });

        if (component !== null) {
            return rep.conflict('Il existe déjà un composant avec cette référence');
        }

        const newComponent =  await db.component.create({
            data: {
                label,
                reference,
                shortDescription,
                description,
                price,
                provider: {
                    connect: { id: providerId }
                },
                unit: {
                    connect: { id: unitId }
                }
            },
            include: {
                unit: getUnit === undefined ? false : getUnit,
                provider: getProvider === undefined ? false : getProvider
            }
        });

        return {
            statusCode: 200,
            message: 'Composant créé',
            data: { component: newComponent }
        }
    });
}
