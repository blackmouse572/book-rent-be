import { DynamicModule, Module, Provider } from '@nestjs/common';
import { AuthController } from 'src/auth/controllers/auth.controller';
import { AuthService } from 'src/auth/services/auth.service';
import { HelpersModule } from 'src/common/helpers/helpers.module';
import { UserModule } from 'src/user/user.module';

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
    imports: [HelpersModule, UserModule],
})
export class AuthModule {
    static forRoot(): DynamicModule {
        const providers: Provider<any>[] = [];
        return {
            module: AuthModule,
            providers: providers,
            exports: [],
            controllers: [],
            imports: [HelpersModule, UserModule],
        };
    }
}
