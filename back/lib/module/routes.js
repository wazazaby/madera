'use strict';

import { PrismaClient } from '@prisma/client';

export default async app => {
    const base = '/module';
    const db = new PrismaClient();

    app.post(`${base}/create`, {
        preHandler: app.auth([app.verifyJWT, app.isCommercial], { relation: 'and' })
    }, async (req, rep) => {
        const { label, reference, shortDescription, description, componentsId } = req.body;
        
    });
}