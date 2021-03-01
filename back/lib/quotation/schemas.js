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
        required: ['label', 'clientId', 'quotationStatusId', 'modulesId']
    }
}