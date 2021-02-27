'use strict';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as schemas from './schemas';

export default async app => {
    const base = '/commercial';
    const db = new PrismaClient();

    app.post(`${base}/create`, {
        schema: schemas.create,
        preHandler: app.auth([app.verifyJWT, app.isAdmin], { relation: 'and' })
    }, async (req, rep) => {
        const { firstName, lastName, email, password, phoneNumber } = req.body;
        const { getRole } = req.query;
        const user = await db.user.findFirst({
            where: {
                OR: [{ email }, { phoneNumber }]
            }
        });

        if (user !== null) {
            return rep.conflict('Il existe déjà un commercial avec ce mail/numéro de téléphone');
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
                    connect: { code: 'COMMERCIAL' }
                },
                commercial: { 
                    create: {
                        administrator: { connect: { id: req.user.id } }
                    } 
                }
            },
            include: {
                commercial: true,
                role: getRole === undefined ? false : getRole
            }
        });

        return {
            statusCode: 200,
            message: 'Commercial créé',
            data: {
                commercial: newUser
            }
        }
    });
}