'use strict';
import * as bcrypt from 'bcrypt';
import * as schemas from './schemas';
import db from '../../utils/db';

export default async app => {
    const base = '/user';

    app.post(`${base}/login`, {
        schema: schemas.login
    }, async (req, rep) => {
        const { email, password } = req.body;
        const user = await db.user.findUnique({
            where: { email },
            include: {
                role: true,
                administrator: true,
                stockist: true,
                commercial: true,
                client: true
            }
        });

        if (user === null) {
            return rep.notFound('Adresse email invalide ou compte non existant');
        }

        if (!await bcrypt.compare(password, user.password)) {
            return rep.unauthorized('Mot de passe invalide');
        }

        let entityId;
        switch (user.role.code) {
            case 'ADMIN':
                entityId = user.administrator.id;
                break;
            case 'COMMERCIAL':
                entityId = user.commercial.id;
                break;
            case 'STOCKIST':
                entityId = user.stockist.id;
                break;
            case 'CLIENT':
                entityId = user.client.id;
                break;
            default:
                entityId = user.id;
        }

        // Si tout se passe bien on renvoit le JWT
        const token = app.jwt.sign({
            userId: user.id,
            entityId,
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
