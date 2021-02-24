'use strict';

import { PrismaClient } from '@prisma/client';

export default async app => {
    const BASE = '/component';
    const db = new PrismaClient();

    app.post(`${BASE}/create`, {
        //preHandler: app.auth([app.verifyJWT, app.isStockist], { relation: 'and' })
        preHandler: app.auth([app.verifyJWT], { relation: 'and' })
    }, async (req, rep) => {
        const { label, reference, shortDescription, description, price, providerId, unitId } = req.body;
        return req.body;
    });
}