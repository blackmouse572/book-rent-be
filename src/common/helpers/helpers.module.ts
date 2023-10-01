import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { HelperEncryptionService } from 'src/common/helpers/services/helper.encryption.service';
import { HelperHashService } from 'src/common/helpers/services/helper.hash.service';

@Module({
    providers: [HelperEncryptionService, HelperHashService],
    exports: [HelperEncryptionService, HelperHashService],
    imports: [
        JwtModule.registerAsync({
            inject: [ConfigService],
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>(
                    'helper.jwt.defaultSecretKey'
                ),
                signOptions: {
                    expiresIn: configService.get<string>(
                        'helper.jwt.defaultExpirationTime'
                    ),
                },
            }),
        }),
    ],
})
export class HelpersModule {}
