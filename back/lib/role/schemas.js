'use strict';
export const getById = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'integer' },
        },
        required: ['id']
    }
}