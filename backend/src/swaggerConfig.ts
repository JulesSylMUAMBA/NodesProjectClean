import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ballon d\'Or API',
            version: '1.0.0',
            description: 'API documentation for the Ballon d\'Or project',
        },
        servers: [
            {
                url: 'http://localhost:3000/api/db',
                description: 'Local server',
            },
        ],
    },
    apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
