'use strict';
export const create = {
    schema: {
        body: {
            type: 'object',
            required: [
                'firstName',
                'lastName',
                'email',
                'password'
            ],
            properties: {
                firstName: { type: 'string' },
                lastName: { type: 'string' },
                email: { type: 'string' },
                password: { type: 'string' }
            },
            required: ['firstName', 'lastName', 'email', 'password']
        }
    }
};

export const login = {
    body: {
        type: 'object',
        properties: {
            email: { type: 'string' },
            password: { type: 'string' }
        },
        required: ['email', 'password']
    }
};