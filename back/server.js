'use strict';

import dotenv from 'dotenv';
import fastify from 'fastify';
import fastifyJWT from 'fastify-jwt';
import fastifyHelmet from 'fastify-helmet';
import fastifyAuth from 'fastify-auth';
import fastifySensible from 'fastify-sensible';
import fastifyCors from 'fastify-cors';

import {
    clearEnums,
    generateEnums,
    verifyJWT,
    isAdmin,
    isCommercial,
    isStockist,
    isClient
} from './utils/functions';

// Import des routes
import userRouter from './lib/user/routes';
import adminRouter from './lib/administrator/routes';
import moduleRouter from './lib/module/routes';
import componentRouter from './lib/component/routes';
import roleRouter from './lib/role/routes';
import providerRouter from './lib/provider/routes';
import usageUnitRouter from './lib/usageUnit/routes';
import quotationStatusRouter from './lib/quotationStatus/routes';
import orderStatusRouter from './lib/orderStatus/routes';
import paymentTypeRouter from './lib/paymentType/routes';
import commercialRouter from './lib/commercial/routes';
import stockistRouter from './lib/stockist/routes';
import clientRouter from './lib/client/routes';

// Init de la config dotenv
dotenv.config();

// Initialisation de l'app
const app = fastify({
    logger: { prettyPrint: true }
});

// Gestion des CORS
app.register(fastifyCors, {
    origin: ['localhost', process.env.FRONT_HOST],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
});

// Register des middlewares
app.register(fastifyJWT, { secret: process.env.JWT_SECRET });
app.register(fastifyHelmet);
app.register(fastifyAuth);
app.register(fastifySensible);

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
app.register(roleRouter);
app.register(providerRouter);
app.register(usageUnitRouter);
app.register(quotationStatusRouter);
app.register(orderStatusRouter);
app.register(paymentTypeRouter);
app.register(commercialRouter);
app.register(stockistRouter);
app.register(clientRouter);

// Route par défaut
app.get('/', async (_, rep) => rep.code(200).send({ message: 'Hello, World!' }));
app.get('/generate-enums', async (_, rep) => {
    await clearEnums();
    await generateEnums();
    return { done: true }
});

// Lancement du serveur
app.listen(process.env.PORT);
