'use strict';
export default async app => {
    app.addSchema({
        $id: '#responseOk',
        type: 'object',
        properties: {
            statusCode: { type: 'number' },
            message: { type: 'string', nullable: true },
            data: { type: ['string', 'number', 'array', 'object', 'null', 'boolean'] }
        }
    });
    
    app.addSchema({
        $id: '#responseNook',
        type: 'object',
        properties: {
            statusCode: { type: 'number' },
            error: { type: 'string' },
            message: { type: 'string' }
        }
    });
}