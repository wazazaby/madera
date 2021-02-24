'use strict';

import { PrismaClient } from '@prisma/client';

export default async app => {
    const BASE = '/module';
    const db = new PrismaClient();

    

    app.post(`${BASE}/create`, {
        preHandler: app.auth([app.verifyJWT, app.isAdmin, app.isCommercial])
    }, async (req, rep) => {
        const { label, reference, shortDescription, description } = req.body;
        
    });
}