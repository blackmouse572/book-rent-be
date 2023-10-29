import {
    applyDecorators,
    createParamDecorator,
    ExecutionContext,
    SetMetadata,
    UseGuards,
} from '@nestjs/common';
import { AuthJwtAccessGuard } from 'src/auth/guards/jwt-access-token/auth.access-token.guard';
import { AuthJwtRefreshGuard } from 'src/auth/guards/jwt-refresh-token/auth.refresh-token.guard';
import { RolePayloadTypeGuard } from 'src/auth/guards/role.payload.type.guard';
import { ROLE_TYPE_META_KEY } from 'src/user/constants/user.constants';
import { ENUM_ROLE_TYPE } from 'src/user/constants/user.enum.constants';
export const AuthUserId = createParamDecorator(
    (data: string, ctx: ExecutionContext): string => {
        const { user } = ctx.switchToHttp().getRequest();
        return user._id;
    }
);

export const AuthJwtPayload = createParamDecorator(
    (data: string, ctx: ExecutionContext): Record<string, any> => {
        const { user } = ctx.switchToHttp().getRequest();
        return data ? user[data] : user;
    }
);

export const AuthJwtToken = createParamDecorator(
    (data: string, ctx: ExecutionContext): string => {
        const { cookies } = ctx.switchToHttp().getRequest();
        const token = cookies['x-refresh-token'];

        return token;
    }
);

export function AuthJwtAccessProtected(): MethodDecorator {
    return applyDecorators(UseGuards(AuthJwtAccessGuard));
}

export function AuthJwtRefreshProtected(): MethodDecorator {
    return applyDecorators(UseGuards(AuthJwtRefreshGuard));
}

export function AuthJwtAdminAccessProtected(): MethodDecorator {
    return applyDecorators(
        UseGuards(AuthJwtAccessGuard, RolePayloadTypeGuard),
        SetMetadata(ROLE_TYPE_META_KEY, [
            ENUM_ROLE_TYPE.ADMIN,
            ENUM_ROLE_TYPE.SUPER_ADMIN,
        ])
    );
}

export function AuthJwtSuperAdminAccessProtected(): MethodDecorator {
    return applyDecorators(
        UseGuards(AuthJwtAccessGuard, RolePayloadTypeGuard),
        SetMetadata(ROLE_TYPE_META_KEY, [ENUM_ROLE_TYPE.SUPER_ADMIN])
    );
}
