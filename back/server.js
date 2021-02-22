'use strict';

import dotenv from 'dotenv';
import fastify from 'fastify';
import fastifyJWT from 'fastify-jwt';
import fastifyHelmet from 'fastify-helmet';
import fastifyAuth from 'fastify-auth';
import fastifySensible from 'fastify-sensible';

import { 
    clearEnums, 
    generateEnums, 
    verifyJWT 
} from './utils/functions';

// Import des routes
import userRouter from './lib/user/routes';

// Init de la config dotenv
dotenv.config();

const app = fastify({ 
    logger: {
        prettyPrint: true
    } 
});

// Register des middlewares
app.register(fastifyJWT, { secret: process.env.JWT_SECRET });
app.register(fastifyHelmet);
app.register(fastifyAuth);
app.register(fastifySensible);

//
app.decorate('verifyJWT', verifyJWT);

// Register des routes
app.register(userRouter);

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