'use strict';

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as schemas from './schemas';

export default async app => {
    const base = '/user';
    const db = new PrismaClient();

    app.post(`${base}/login`, { 
        schema: schemas.login 
    }, async (req, rep) => {
        const { email, password } = req.body;
        const user = await db.user.findUnique({
            where: { email },
            include: {
                role: true
            }
        });

        if (user === null) {
            return rep.notFound('Adresse email invalide ou compte non existant');
        }

        if (!await bcrypt.compare(password, user.password)) {
            return rep.unauthorized('Mot de passe invalide');
        }

        // Si tout se passe bien on renvoit le JWT
        const token = app.jwt.sign({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role.code
        });

        return {
            statusCode: 200,
            message: 'Connexion réussie',
            data: { token }
        }
    });

    app.post(`${base}/logout`, {
        preHandler: app.auth([app.verifyJWT])
    }, async () => {
        return {
            statusCode: 200,
            message: 'Vous êtes déconnecté',
            data: {}
        }
    });

    // Affiches tout les users
    app.post(`${base}s`, {
        //schemas: schemas.all,
        preHandler: app.auth([app.verifyJWT])
    }, async (_, rep) => {
        const users = await db.user.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phoneNumber: true,
                createdAt: true,
                updatedAt: true,
                roleId: true,
            }
        });

        // Check si un users est ici
        if (users === null) {
            return rep.notFound();
        }

        return {
            statusCode: 200,
            message: 'Liste des utilisateurs',
            data: { users }
        }
    });
}