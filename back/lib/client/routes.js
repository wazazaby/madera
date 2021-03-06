'use strict';
import * as bcrypt from 'bcrypt';
import * as schemas from './schemas';
import db from '../../utils/db';

export default async app => {
    const base = '/client';
    
    app.get(`${base}/all`, {
        schema: schemas.all,
        preHandler: app.auth([app.verifyJWT, app.isCommercial], { relation: 'and' })
    }, async req => {
        const { getRole, getQuotations } = req.query;
        const clients = await db.user.findMany({
            where: {
                client: { commercialId: req.user.entityId }
            },
            include: {
                client: {
                    include: {
                        quotations: getQuotations === true
                    }
                },
                role: getRole === true
            }
        });

        return { statusCode: 200, message: '', data: { clients } }
    });

    app.post(`${base}/create`, {
        schema: schemas.create,
        preHandler: app.auth([app.verifyJWT, app.isCommercial], { relation: 'and' })
    }, async (req, rep) => {
        const { 
            firstName, lastName, 
            email, phoneNumber,
            password, 
            city, postalCode,
            adressLine1, adressLine2
        } = req.body;
        const { getRole } = req.query;
        const user = await db.user.findFirst({
            where: {
                OR: [{ email }, { phoneNumber }]
            }
        });

        if (user !== null) {
            return rep.conflict('Il existe déjà un client avec ce mail/numéro de téléphone');
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
                    connect: { code: 'CLIENT' }
                },
                client: { 
                    create: {
                        city,
                        adressLine1,
                        postalCode,
                        adressLine2,
                        commercial: { connect: { id: req.user.entityId } }
                    } 
                }
            },
            include: {
                client: true,
                role: getRole === true
            }
        });

        return {
            statusCode: 200,
            message: 'Client créé',
            data: {
                stockist: newUser
            }
        }
    });
}