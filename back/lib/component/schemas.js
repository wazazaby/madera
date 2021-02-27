'use strict';
export const all = {
    querystring: {
        type: 'object',
        properties: {
            getUnit: { type: 'boolean' },
            getProvider: { type: 'boolean' }
        }
    }
}

export const create = {
    body: {
        type: 'object',
        properties: {
            label: { type: 'string' },
            reference: { type: 'string' },
            shortDescription: { type: 'string' },
            description: { type: 'string' },
            price: { type: 'number' },
            providerId: { type: 'integer' },
            unitId: { type: 'integer' }
        },
        required: [
            'label',
            'reference',
            'description',
            'price',
            'providerId',
            'unitId'
        ]
    },
    querystring: all.querystring
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