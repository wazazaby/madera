'use strict';
import * as schemas from './schemas';
import db from '../../utils/db';

export default async app => {
    const base = '/module';

    app.post(`${base}/create`, {
        schema: schemas.create,
        preHandler: app.auth([app.verifyJWT, app.isCommercial], { relation: 'and' })
    }, async (req, rep) => {
        const { label, reference, shortDescription, description, componentsId } = req.body;
        const { getComponents } = req.query;
        const module = await db.module.findFirst({
            where: { reference }
        });

        if (module !== null) {
            return rep.conflict('Il existe déjà un module avec cette référence');
        }

        const newModule =  await db.module.create({
            data: {
                label,
                reference,
                shortDescription,
                description,
                components: {
                    connect: componentsId.map(id => ({ id }))
                }
            },
            include: {
                components: getComponents === true
            }
        });

        return newModule
    });
}