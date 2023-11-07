import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, {
    CallbackWithoutResultAndOptionalError,
    HydratedDocument,
} from 'mongoose';
import { DatabaseMongoObjectIdEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.object-id.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';
import { UserEntity } from 'src/user/repository/user.entity';

export const ReviewDatabaseName = 'reviews';

@DatabaseEntity({ collection: ReviewDatabaseName })
export class ReviewEntity extends DatabaseMongoObjectIdEntityAbstract {
    @Prop({
        required: false,
        trim: true,
        type: String,
        maxlength: 225,
    })
    comment?: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserEntity',
    })
    author: UserEntity;

    @Prop({
        required: true,
        type: Number,
        min: 0,
        max: 5,
    })
    rating: number;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewEntity);

export type ReviewDoc = HydratedDocument<ReviewEntity>;

ReviewSchema.pre(
    'save',
    function (next: CallbackWithoutResultAndOptionalError) {
        next();
    }
);
