'use strict';
export const create = {
    body: {
        type: 'object',
        required: ['name', 'reference', 'logoUrl'],
        properties: {
            name: { type: 'string' },
            reference: { type: 'string' },
            logoUrl: { type: 'string' },
            stockistsId: {
                type: 'array',
                items: { type: 'integer' }
            },
            componentsId: {
                type: 'array',
                items: { type: 'integer' }
            }
        }
    }
}