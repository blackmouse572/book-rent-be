import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import Joi from 'joi';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { BookModule } from 'src/book/book.module';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constraint';
import { DatabaseOptionsModule } from 'src/common/database/database.options.module';
import { DatabaseOptionsService } from 'src/common/database/service/database.options.service';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import configs from 'src/configs';
import { AppLoggerMiddleware } from 'src/lib/logger.middleware';
import { ENUM_APP_ENVIROMENT } from 'src/lib/swagger.constraint';
import { ReviewModule } from 'src/review/review.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { HelpersModule } from './common/helpers/helpers.module';
import { OrderModule } from './order/order.module';
import { TransactionModule } from './transaction/transaction.module';
import { UserModule } from './user/user.module';
import { VNPayModule } from 'src/common/vnpay/vnpay.module';
import { SendgridModule } from './sendgrid/sendgrid.module';
@Module({
    imports: [
        ConfigModule.forRoot({
            load: configs,
            isGlobal: true,
            cache: true,
            envFilePath: ['.env'],
            expandVariables: true,
            validationSchema: Joi.object({
                APP_NAME: Joi.string().required(),
                APP_ENV: Joi.string()
                    .valid(...Object.values(ENUM_APP_ENVIROMENT))
                    .default('development')
                    .required(),

                DATABASE_HOST: Joi.string()
                    .default('mongodb://localhost:27017')
                    .required(),
                DATABASE_NAME: Joi.string().default('ack').required(),
                DATABASE_USER: Joi.string().allow(null, '').optional(),
                DATABASE_PASSWORD: Joi.string().allow(null, '').optional(),
                DATABASE_DEBUG: Joi.boolean().default(false).required(),
                DATABASE_OPTIONS: Joi.string().allow(null, '').optional(),

                AUTH_JWT_SUBJECT: Joi.string().required(),
                AUTH_JWT_AUDIENCE: Joi.string().required(),
                AUTH_JWT_ISSUER: Joi.string().required(),

                AUTH_JWT_ACCESS_TOKEN_SECRET_KEY: Joi.string()
                    .alphanum()
                    .min(5)
                    .max(50)
                    .required(),
                AUTH_JWT_ACCESS_TOKEN_EXPIRED: Joi.string()
                    .default('15m')
                    .required(),

                AUTH_JWT_REFRESH_TOKEN_SECRET_KEY: Joi.string()
                    .alphanum()
                    .min(5)
                    .max(50)
                    .required(),
                AUTH_JWT_REFRESH_TOKEN_EXPIRED: Joi.string()
                    .default('7d')
                    .required(),
                AUTH_JWT_REFRESH_TOKEN_NOT_BEFORE_EXPIRATION: Joi.string()
                    .default('15m')
                    .required(),

                AUTH_JWT_PAYLOAD_ENCRYPT: Joi.boolean()
                    .default(false)
                    .required(),
                AUTH_JWT_PAYLOAD_ACCESS_TOKEN_ENCRYPT_KEY: Joi.string()
                    .allow(null, '')
                    .min(20)
                    .max(50)
                    .optional(),
                AUTH_JWT_PAYLOAD_ACCESS_TOKEN_ENCRYPT_IV: Joi.string()
                    .allow(null, '')
                    .min(16)
                    .max(50)
                    .optional(),
                AUTH_JWT_PAYLOAD_REFRESH_TOKEN_ENCRYPT_KEY: Joi.string()
                    .allow(null, '')
                    .min(20)
                    .max(50)
                    .optional(),
                AUTH_JWT_PAYLOAD_REFRESH_TOKEN_ENCRYPT_IV: Joi.string()
                    .allow(null, '')
                    .min(16)
                    .max(50)
                    .optional(),
                CLOUDINARY_NAME: Joi.string().required(),
                CLOUDINARY_API_KEY: Joi.string().required(),
                CLOUDINARY_API_SECRET: Joi.string().required(),
                VNPAY_TMNCODE: Joi.string().required(),
                VNPAY_HASHSECRET: Joi.string().required(),
            }),
            validationOptions: {
                allowUnknown: true,
                abortEarly: true,
            },
        }),
        MongooseModule.forRootAsync({
            connectionName: DATABASE_CONNECTION_NAME,
            imports: [DatabaseOptionsModule],
            inject: [DatabaseOptionsService],
            useFactory: (databaseOptionsService: DatabaseOptionsService) =>
                databaseOptionsService.createOptions(),
        }),
        HelpersModule,
        AuthModule.forRoot(),
        PaginationModule,
        UserModule,
        BookModule,
        OrderModule,
        TransactionModule,
        CategoryModule, // Integration of the CategoryModule
        ReviewModule,
        VNPayModule,
        SendgridModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AppLoggerMiddleware).forRoutes('*'); // This middleware applies to all routes
    }
}
