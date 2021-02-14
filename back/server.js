'use strict';

import fastify from 'fastify';
import dotenv from 'dotenv';
import fastifyMySQL from 'fastify-mysql';

// Import des schemas de validation
import { testSchema, newAdminSchema } from './schemas/testSchemas';

dotenv.config();

const app = fastify({
  logger: true
});

// app.register(fastifyMySQL, {
//     promise: true,
//     name: 'madera-dev',
//     connectionString: 'mysql://root@localhost:3306'
// })

// Route par défaut
app.get('/', async (_, rep) => {
    rep
        .code(200)
        .header('Content-Type', 'application/json')
        .send({ message: 'Hello, World!' });
});

app.post('/test', testSchema, async (req, rep) => {
    rep
        .code(200)
        .header('Content-Type', 'application/json')
        .send(req.body);
});

app.post('/test/db', newAdminSchema, async (req, rep) => {
    rep
        .code(300)
        .header('Content-Type', 'application/json')
        .send({ wot: 'Shit hit the fan' });
});

// Lancement du serveur
(async () => {
    try {
        await app.listen(process.env.PORT)
    } catch (e) {
        app.log.error(e)
        process.exit(1)
    }
})();