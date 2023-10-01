import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestApplication, NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import initSwagger from './lib/swagger';
async function bootstrap() {
  const app: NestApplication = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const env: string = configService.get<string>('app.env');
  const prefix: string = configService.get<string>('app.prefix');
  const databaseUrl: string = configService.get<string>('database.url');
  const port: number = configService.get<number>('app.port');

  const logger = new Logger('Bootstrap');
  process.env.NODE_ENV = env;
  app.setGlobalPrefix(prefix);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await initSwagger(app);
  logger.log('\n************************************');
  logger.log(`Server is running on ${prefix}:${port}`);
  await app.listen(port);
  logger.log('\n************************************');
  logger.log(`Database is running on ${databaseUrl}`);
  logger.log('************************************');
}
bootstrap();
