'use strict';

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as schemas from './schemas';

export default async app => {
    const BASE = '/user';
    const db = new PrismaClient();

    app.post(`${BASE}/login`, schemas.login, async (req, rep) => {
        const { email, password } = req.body;
        const user = await db.user.findUnique({
            where: { email },
            include: {
                role: true,
                administrator: true,
                commercial: true,
                client: true,
                stockist: true
            }
        });
    
        if (user === null) {
            return rep.notFound();
        }

        if (!await bcrypt.compare(password, user.password)) {
            return rep.unauthorized();
        }
    
        // Si tout ce passe bien on renvoit le JWT
        const token = app.jwt.sign({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role.code
        });
        return { 
            statusCode: 200, 
            message: 'Vous êtes connecté', 
            data: { token } 
        }
    });
}