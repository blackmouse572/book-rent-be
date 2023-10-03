import { DynamicModule, Module, Provider } from '@nestjs/common';
import { HelpersModule } from 'src/common/helpers/helpers.module';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { UserModule } from 'src/user/user.module';

@Module({
    controllers: [AuthController],
    providers: [
        AuthService],
    exports: [AuthService],
    imports: [HelpersModule, UserModule]
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
