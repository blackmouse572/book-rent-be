import { Prop, SchemaFactory } from '@nestjs/mongoose';
import {
    CallbackWithoutResultAndOptionalError,
    HydratedDocument,
} from 'mongoose';
import { ENUM_CITIZEN_ID_TYPE } from 'src/auth/constants/auth.enum.constant';
import { DatabaseMongoObjectIdEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.object-id.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';
import { ENUM_ROLE_TYPE } from 'src/user/constants/user.enum.constants';

export const UserDatabaseName = 'users';

@DatabaseEntity({ collection: UserDatabaseName })
export class UserEntity extends DatabaseMongoObjectIdEntityAbstract {
    @Prop({
        required: false,
        sparse: true,
        index: true,
        trim: true,
        type: String,
        unique: true,
        lowercase: true,
        maxlength: 100,
    })
    username: string;

    @Prop({
        required: true,
        sparse: true,
        index: true,
        trim: true,
        type: String,
        unique: true,
        lowercase: true,
    })
    citizenId: string;

    @Prop({
        required: true,
        default: ENUM_CITIZEN_ID_TYPE.NEW,
        enum: ENUM_CITIZEN_ID_TYPE,
        type: String,
    })
    citizenIdType: ENUM_CITIZEN_ID_TYPE;

    @Prop({
        required: true,
        type: Date,
    })
    citizenIdIssueDate: Date;

    @Prop({
        required: true,
        type: Date,
    })
    citizenIdDateOfBirth: Date;

    @Prop({
        required: true,
        type: String,
    })
    citizenIdPlaceOfIssue: string;

    @Prop({
        required: false,
        sparse: true,
        index: true,
        trim: true,
        type: String,
        unique: true,
        lowercase: true,
        maxlength: 100,
    })
    email: string;

    @Prop({
        required: true,
        sparse: true,
        index: true,
        trim: true,
        type: String,
        maxlength: 100,
    })
    fullName: string;

    @Prop({
        trim: true,
        type: String,
        maxlength: 255,
        default: '',
    })
    address?: string;

    @Prop({
        required: false,
        sparse: true,
        trim: true,
        unique: true,
        type: String,
        maxlength: 15,
    })
    phone: string;

    @Prop({
        required: true,
        default: ENUM_ROLE_TYPE.USER,
        enum: ENUM_ROLE_TYPE,
        type: String,
    })
    role: ENUM_ROLE_TYPE;

    @Prop({
        trim: true,
        type: String,
        maxlength: 255,
    })
    avatar?: string;

    @Prop({
        type: String,
        maxlength: 255,
    })
    password: string;

    @Prop({
        required: true,
        default: 0,
        type: Number,
    })
    passwordAttempt: number;

    @Prop({
        required: true,
        type: String,
    })
    salt: string;

    @Prop({
        required: true,
        default: false,
        index: true,
        type: Boolean,
    })
    blocked: boolean;

    @Prop({
        required: false,
        type: Date,
    })
    blockedDate?: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);

export type UserDoc = HydratedDocument<UserEntity>;

UserSchema.pre('save', function (next: CallbackWithoutResultAndOptionalError) {
    next();
});
