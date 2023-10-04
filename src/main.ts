import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestApplication, NestFactory } from '@nestjs/core';
import { Validator, useContainer } from 'class-validator';
import { AppModule } from './app.module';
import initSwagger from './lib/swagger';

async function bootstrap() {
    const app: NestApplication = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const env: string = configService.get<string>('app.env');
    const prefix: string = configService.get<string>('app.prefix');
    const docPrefix: string = configService.get<string>('doc.prefix');
    const port: number = configService.get<number>('app.port');

    const logger = new Logger();
    process.env.NODE_ENV = env;

    //Global
    app.setGlobalPrefix(prefix);
    app.useGlobalPipes(new ValidationPipe());
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    //CORS
    app.enableCors({
        allowedHeaders: [
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
        ],
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        origin: '*',
        preflightContinue: false,
    });

    await initSwagger(app);
    await app.listen(port);

    logger.log('************************************');
    logger.log(`Swagger is running on ${await app.getUrl()}${docPrefix}`);
    logger.log('************************************\n');
    logger.log('************************************');
    logger.log(`Server is running on ${await app.getUrl()}/${prefix}`);
    logger.log('************************************\n');
}
bootstrap();
