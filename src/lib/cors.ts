import { NestApplication } from '@nestjs/core';

export default function useCors(app: NestApplication) {
    const allowedHeaders = [
        'Access-Control-Allow-Origin',
        'Access-Control-Origin',
        'Access-Control-Allow-Methods',
        'Content-Type',
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Credentials',
        'Access-Control-Expose-Headers',
        'Access-Control-Max-Age',
        'Access-Control-Request-Headers',
        'X-Api-Key',
        'x-api-key',
        'x-refresh-token',
        'Authorization',
    ];
    const allowedMethods = 'GET,HEAD,PUT,PATCH,POST,DELETE';
    // const origins = ['http://localhost:5173', 'http://localhost:3000'];

    app.enableCors({
        allowedHeaders,
        maxAge: 3600,
        methods: allowedMethods,
        origin: true,
        credentials: true,
    });

    return;
}