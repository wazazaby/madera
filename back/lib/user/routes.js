'use strict';
import { PrismaClient } from '@prisma/client';

export default async fastify => {
    const BASE = '/user';
    const db = new PrismaClient();

    fastify.route({
        method: 'POST',
        url: `${BASE}/login`,
        handler: async (req, rep) => {
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
                throw rep.notFound();
            }

            // TODO: gestion des password hashé here
            if (password !== user.password) {
                throw rep.unauthorized();
            }
        
            // Si tout ce passe bien on renvoit le JWT
            const token = fastify.jwt.sign({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role.code
            });
            rep.code(200).send({ token });
        }
    });
}