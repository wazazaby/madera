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
        const { getUnit, getProvider, getStock } = req.query;
        const components = await db.component.findMany({
            include: {
                provider: getProvider === true,
                unit: getUnit === true,
                stock: getStock === true
            }
        });
        return { statusCode: 200, message: '', data: { components }}
    });

    app.get(`${base}/:id`, {
        schema: schemas.byId,
        preHandler: app.auth([app.verifyJWT, app.isCommercial], { relation: 'and' })
    }, async (req, rep) => {
        const { id } = req.params;
        const { getUnit, getProvider, getStock } = req.query;
        const component = await db.component.findFirst({
            where: { id },
            include: {
                unit: getUnit === true,
                provider: getProvider === true,
                stock: getStock === true
            }
        });
        return component === null
            ? rep.notFound('Composant introuvable')
            : { statusCode: 200, message: '', data: { component } }
    });

    app.post(`${base}/create`, {
        schema: schemas.create,
        preHandler: app.auth([app.verifyJWT, app.isCommercial], { relation: 'and' })
    }, async (req, rep) => {
        const { 
            label, reference, 
            shortDescription, description, 
            price, providerId, unitId, stockistId, quantity 
        } = req.body;
        const { getUnit, getProvider } = req.query;
        const component = await db.component.findFirst({
            where: { reference }
        });

        if (component !== null) {
            return rep.conflict('Il existe déjà un composant avec cette référence');
        }

        const moar = stockistId !== null && quantity 
            ? { stock: { create: { quantity, stockist: { connect: { id: stockistId } } } } }
            : {};

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
                },
                ...moar
            },
            include: {
                unit: getUnit === true,
                provider: getProvider === true
            }
        });

        return {
            statusCode: 200,
            message: 'Composant créé',
            data: { component: newComponent }
        }
    });
}
