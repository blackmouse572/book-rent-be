import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestApplication } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ENUM_APP_ENVIROMENT } from 'src/lib/swagger.constraint';

export default async function initSwagger(app: NestApplication) {
  const configService = app.get(ConfigService);
  const env: string = configService.get<string>('app.env');
  const logger = new Logger('Swagger');

  const docTitle: string = configService.get<string>('doc.name');
  const docDescription: string = configService.get<string>('doc.description');
  const docVersion: string = configService.get<string>('doc.version');
  const docPrefix: string = configService.get<string>('doc.prefix');

  if (env !== ENUM_APP_ENVIROMENT.PROD) {
    const documentBuild = new DocumentBuilder()
      .setTitle(docTitle)
      .setDescription(docDescription)
      .setVersion(docVersion)
      .addTag('API')
      .addServer('/')
      .addServer('/staging')
      .addServer('/prod')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        'accessToken',
      )
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        'refreshToken',
      )
      .addApiKey({ type: 'apiKey', in: 'header', name: 'x-api-key' }, 'apiKey')
      .build();

    const document = SwaggerModule.createDocument(app, documentBuild);

    SwaggerModule.setup(docPrefix, app, document, {
      jsonDocumentUrl: `${docPrefix}/json`,
      customSiteTitle: docTitle,
      explorer: false,
      swaggerOptions: {
        docExpansion: 'none',
        filter: true,
        showRequestDuration: true,
      },
    });

    logger.log('************************************');
    logger.log(`Swagger is running on ${docPrefix}`);
    logger.log('************************************');
  }
}
