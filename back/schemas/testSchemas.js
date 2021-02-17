'use strict';

const testSchema = {
    schema: {
        body: {
            type: 'object',
            required: ['itemName'],
            properties: {
                itemName: { type: 'string' },
                quantity: { type: 'number' }
            }
        }
    }
};

const newAdminSchema = {
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
            }
        }
    }
};

export { testSchema, newAdminSchema };