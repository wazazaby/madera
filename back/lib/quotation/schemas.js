'use strict';
export const create = {
    body: {
        type: 'object',
        properties: {
            label: { type: 'string' },
            shortDescription: { type: 'string' },
            clientId: { type: 'integer' },
            modulesId: {
                type: 'array',
                items: { type: 'integer' }
            }
        },
        required: ['label', 'clientId', 'modulesId']
    },
    querystring: {
        type: 'object',
        properties: {
            getStatus: { type: 'boolean' },
            getModules: { type: 'boolean' }
        }
    }
}