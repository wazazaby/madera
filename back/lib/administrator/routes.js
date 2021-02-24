'use strict';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as schemas from './schemas';

export default async app => {
    const BASE = '/administrator';
    const db = new PrismaClient();

    app.post(`${BASE}/create`, schemas.create, async (req, rep) => {
        app.log.info(app.getSchemas())
        const { firstName, lastName, email, password, phoneNumber } = req.body;
        const user = await db.user.findFirst({
            where: {
                OR: [{ email }, { phoneNumber }]
            }
        });

        if (user !== null) {
            return rep.conflict('Il existe déjà un administrateur avec ce mail/numéro de téléphone');
        }

        const cryptedPass = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
        await db.user.create({
            data: {
                firstName,
                lastName,
                email,
                phoneNumber,
                password: cryptedPass,
                role: {
                    connect: {
                        code: 'ADMIN'
                    }
                },
                administrator: {
                    create: {}
                }
            }
        });

        return {
            statusCode: 200,
            message: '',
            data: {
                email, firstName
            }
        }
    });
}