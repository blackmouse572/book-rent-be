import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestApplication, NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import cookieParser from 'cookie-parser';
import useCors from 'src/lib/cors';
import { AppModule } from './app.module';
import initSwagger from 'src/lib/swagger';

async function bootstrap() {
    const app: NestApplication = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const env: string = configService.get<string>('app.env');
    const prefix: string = configService.get<string>('app.prefix');
    const port: number = configService.get<number>('app.port');

    const logger = new Logger();
    process.env.NODE_ENV = env;

    await initSwagger(app);

    //Global
    app.setGlobalPrefix(prefix);
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    useCors(app);
    await app.listen(port);

    logger.log('************************************');
    logger.log(`Server is running on ${await app.getUrl()}/${prefix}`);
    logger.log('************************************\n');
}
bootstrap();
