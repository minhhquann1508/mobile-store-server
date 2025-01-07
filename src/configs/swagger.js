import swaggerJsDoc from 'swagger-jsdoc'

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API tài liệu cho dự án của bạn',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Local server',
            },
        ],
    },
    apis: ['server/src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);


export default swaggerDocs;
