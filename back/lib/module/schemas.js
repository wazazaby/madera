'use strict';
export const create = {
    body: {
        type: 'object',
        properties: {
            label: { type: 'string' },
            reference: { type: 'string' },
            shortDescription: { type: 'string' },
            description: { type: 'string' },
            componentsId: {
                type: 'array',
                items: { type: 'integer' }
            }
        },
        required: ['label', 'reference', 'description', 'componentsId']
    },
    querystring: {
        type: 'object',
        properties: {
            getComponents: { type: 'boolean' }
        }
    }
}

export const all = {
    querystring: create.querystring
}

export const byId = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'integer' },
        },
        required: ['id']
    },
    querystring: all.querystring
}