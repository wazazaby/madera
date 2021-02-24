'use strict';
export const login = {
    schema: {
        body: {
            type: 'object',
            required: [
                'email',
                'password'
            ],
            properties: {
                email: { type: 'string' },
                password: { type: 'string' }
            },
            required: ['email', 'password']
        }
    }
}