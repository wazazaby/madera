'use strict';
export const create = {
    body: {
        type: 'object',
        properties: {
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
            phoneNumber: { type: 'string', minLength: 10, maxLength: 10 }
        },
        required: ['firstName', 'lastName', 'email', 'password', 'phoneNumber']
    },
    querystring: {
        type: 'object',
        properties: {
            getRole: { type: 'boolean' }
        }
    }
}