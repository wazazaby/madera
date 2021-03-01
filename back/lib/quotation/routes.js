'use strict';
import { PrismaClient } from '@prisma/client';
import * as schemas from './schemas';

export default async app => {
    const base = '/quotation';
    const db = new PrismaClient();
    
    app.post(`${base}/create`, {
        schema: schemas.create,
        preHandler: app.auth([app.verifyJWT, app.isCommercial], { relation: 'and' })
    }, async (req, rep) => {
        const { label, shortDescription, clientId, modulesId } = req.body;
        return req.body;
    });
}