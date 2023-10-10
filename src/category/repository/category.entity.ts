import { Prop, SchemaFactory } from '@nestjs/mongoose';
import {
    CallbackWithoutResultAndOptionalError,
    HydratedDocument,
} from 'mongoose';
import { CATEGORY_STATUS_ENUM } from 'src/category/constants/category.enum.constants';
import { DatabaseMongoObjectIdEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.object-id.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';

export const CategoryDatabaseName = 'categories';

@DatabaseEntity({ collection: CategoryDatabaseName })
export class CategoryEntity extends DatabaseMongoObjectIdEntityAbstract {
    @Prop({
        required: true,
        index: true,
        trim: true,
        type: String,
        maxlength: 100,
    })
    name: string;

    @Prop({
        required: true,
        default: CATEGORY_STATUS_ENUM.ENABLE,
        enum: CATEGORY_STATUS_ENUM,
        type: String,
    })
    status: CATEGORY_STATUS_ENUM;

    @Prop({
        required: true,
        trim: true,
        type: String,
        maxlength: 1000,
    })
    description: string;
}

export const CategorySchema = SchemaFactory.createForClass(CategoryEntity);

export type CategoryDoc = HydratedDocument<CategoryEntity>;

CategorySchema.pre(
    'save',
    function (next: CallbackWithoutResultAndOptionalError) {
        next();
    }
);
