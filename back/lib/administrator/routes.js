'use strict';
import * as administratorSchemas from './schemas';

export default (fastify, _, done) => {
    const BASE = '/administrator';
    fastify.route({
        method: 'POST',
        url: `${BASE}/login`,
        schema: administratorSchemas.login,
        handler: async (req, rep) => {
            const token = fastify.jwt.sign({ email: req.body.email });
            rep
                .code(200)
                .send({ token });
        }
    });

    fastify.route({
        method: 'POST',
        url: `${BASE}/test`,
        preHandler: fastify.auth([
            fastify.verifyJWT
        ]),
        handler: async (req, rep) => {
            rep.send(req.user);
        }
    });
    done();
}