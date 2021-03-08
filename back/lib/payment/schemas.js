'use strict';
export const add = {
    body: {
        type: 'object',
        properties: {
            paymentId: { type: 'integer' },
            value: { type: 'number' }
        },
        required: ['paymentId', 'value']
    }
}