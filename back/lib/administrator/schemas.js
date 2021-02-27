'use strict';
export const create = {
    schema: {
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
        }
    }
}