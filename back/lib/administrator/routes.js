'use strict';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as schemas from './schemas';

export default async app => {
    const base = '/administrator';
    const db = new PrismaClient();

    app.post(`${base}/create`, {
        schema: schemas.create,
        preHandler: app.auth([app.verifyJWT, app.isAdmin], { relation: 'and' })
    }, async (req, rep) => {
        const { firstName, lastName, email, password, phoneNumber } = req.body;
        const { getRole } = req.query;
        app.log.info(getRole);
        const user = await db.user.findFirst({
            where: {
                OR: [{ email }, { phoneNumber }]
            }
        });

        if (user !== null) {
            return rep.conflict('Il existe déjà un administrateur avec ce mail/numéro de téléphone');
        }

        const cryptedPass = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
        const newUser = await db.user.create({
            data: {
                firstName,
                lastName,
                email,
                phoneNumber,
                password: cryptedPass,
                role: {
                    connect: { code: 'ADMIN' }
                },
                administrator: { create: {} }
            },
            include: {
                administrator: true,
                role: getRole === true
            }
        });

        return {
            statusCode: 200,
            message: 'Administrateur créé',
            data: {
                administrator: newUser
            }
        }
    });
}
