import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { USER_BLOCKED_META_KEY } from 'src/user/constants/user.constants';
import { UserBlockedGuard } from 'src/user/guards/user.blocked.guard';
import { UserCanNotOurSelfGuard } from 'src/user/guards/user.can-not-ourselft.guard';
import { UserNotFoundGuard } from 'src/user/guards/user.notfound.guard';
import { UserPutToRequestGuard } from 'src/user/guards/user.put-to-request.guard';

export function UserAdminGetGuard(): MethodDecorator {
    return applyDecorators(UseGuards(UserPutToRequestGuard, UserNotFoundGuard));
}

export function UserAdminDeleteGuard(): MethodDecorator {
    return applyDecorators(
        UseGuards(
            UserPutToRequestGuard,
            UserNotFoundGuard,
            UserCanNotOurSelfGuard
        )
    );
}

export function UserAdminUpdateGuard(): MethodDecorator {
    return applyDecorators(
        UseGuards(
            UserPutToRequestGuard,
            UserNotFoundGuard,
            UserCanNotOurSelfGuard
        )
    );
}

export function UserAdminUpdateBlockedGuard(): MethodDecorator {
    return applyDecorators(
        UseGuards(
            UserPutToRequestGuard,
            UserNotFoundGuard,
            UserCanNotOurSelfGuard,
            UserBlockedGuard
        ),
        SetMetadata(USER_BLOCKED_META_KEY, [false])
    );
}
