import { DynamicModule, Module, Provider } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {
    static forRoot(): DynamicModule {
        const providers: Provider<any>[] = [];
        return {
            module: AuthModule,
            providers: providers,
            exports: [],
            controllers: [],
            imports: [],
        };
    }
}
