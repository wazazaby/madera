'use strict';
import fastify from 'fastify';
import dotenv from 'dotenv';

import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = fastify({ logger: true });

// Route par défaut
app.get('/', async (_, rep) => {
    rep.code(200).send({ message: 'Hello, World!' });
});

// Lancement du serveur
(async () => {
    await app
        .listen(process.env.PORT)
        .catch(e => app.log.error(e));
})();