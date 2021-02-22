'use strict';

import fastify from 'fastify';
import fastifyJWT from 'fastify-jwt';
import dotenv from 'dotenv';

import { clearEnums, generateEnums } from './utils/functions';

// Import des routes
import * as adminRoutes from './lib/administrator/routes';

// Init de la config dotenv
dotenv.config();

const app = fastify({ logger: true });

// Register des middlewares
app.register(fastifyJWT, { secret: process.env.JWT_SECRET });

// Register des routes
app.register(adminRoutes);

// Route par défaut
app.get('/', async (_, rep) => rep.code(200).send({ message: 'Hello, World!' }));
app.get('/generate-enums', async (_, rep) => {
    await clearEnums()
    await generateEnums();
    rep.code(200).send({ done: true });
});
// Lancement du serveur
(async () => {
    await app
        .listen(process.env.PORT)
        .catch(e => app.log.error(e));
})();