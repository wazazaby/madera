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
    verifyJWT,
    isAdmin,
    isCommercial,
    isStockist,
    isClient
} from './utils/functions';

import globalSchemas from './utils/globalSchemas';

// Import des routes
import userRouter from './lib/user/routes';
import adminRouter from './lib/administrator/routes';
import moduleRouter from './lib/module/routes';
import componentRouter from './lib/component/routes';

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

// Ajout des schemas de validations globaux
app.register(globalSchemas);

// Gestion de l'authentification
app.decorate('verifyJWT', verifyJWT);
app.decorate('isAdmin', isAdmin);
app.decorate('isCommercial', isCommercial);
app.decorate('isStockist', isStockist);
app.decorate('isClient', isClient);

// Register des routes
app.register(userRouter);
app.register(adminRouter);
app.register(moduleRouter);
app.register(componentRouter);

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