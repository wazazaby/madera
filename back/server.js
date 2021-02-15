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

app.register(fastifyMySQL, {
    promise: true,
    connectionString: 'mysql://root@localhost:3306/madera-dev'
})

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
    const { firstName, lastName, email, password } = req.body;
    const connection = await app.mysql.getConnection();

    const res = await connection.query(
        'INSERT INTO administrator VALUES (NULL, ?, ?, ?, ?, NOW(), NOW())', 
        [firstName, lastName, email, password],
    )

    connection.release()
    
    rep
        .code(200)
        .header('Content-Type', 'application/json')
        .send(res[0]);
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