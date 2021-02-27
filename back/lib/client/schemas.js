'use strict';
export const create = {
    body: {
        type: 'object',
        properties: {
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
            phoneNumber: { type: 'string', minLength: 10, maxLength: 10 },
            city: { type: 'string' },
            postalCode: { type: 'integer' },
            adressLine1: { type: 'string' },
            adressLine2: { type: 'string' }
        },
        required: [
            'firstName', 
            'lastName', 
            'email', 
            'password', 
            'phoneNumber', 
            'city', 
            'postalCode', 
            'adressLine1'
        ]
    },
    querystring: {
        type: 'object',
        properties: {
            getRole: { type: 'boolean' }
        }
    }
}