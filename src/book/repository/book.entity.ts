import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, {
    CallbackWithoutResultAndOptionalError,
    HydratedDocument,
} from 'mongoose';
import { BOOK_STATUS_ENUM } from 'src/book/constants/book.enum.constants';
import { CategoryEntity } from 'src/category/repository/category.entity';
import { DatabaseMongoObjectIdEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.object-id.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';
import { ReviewEntity } from 'src/review/repository/review.entity';

export const BookDatabaseName = 'books';

@DatabaseEntity({ collection: BookDatabaseName })
export class BookEntity extends DatabaseMongoObjectIdEntityAbstract {
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
        type: Number,
        default: 0,
    })
    rental_price: number;

    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'categories' }],
    })
    category: CategoryEntity[];

    @Prop({
        required: true,
        trim: true,
        type: String,
        maxlength: 1000,
        default: '',
    })
    description: string;

    @Prop({
        trim: true,
        type: String,
        maxlength: 255,
    })
    image: string;
    @Prop({
        required: true,
        trim: true,
        default: BOOK_STATUS_ENUM.ENABLE,
        enum: BOOK_STATUS_ENUM,
        type: String,
        maxlength: 15,
    })
    status: BOOK_STATUS_ENUM;

    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'reviews' }],
    })
    reviews: ReviewEntity[];

    @Prop({
        required: true,
        trim: true,
        sparse: true,
        index: true,
        type: String,
        maxLenght: 100,
    })
    keyword: string;

    @Prop([String])
    genres: string[];

    @Prop({
        required: true,
        type: String,
        trim: true,
        maxLenght: 100,
    })
    author: string;
}

export const BookSchema = SchemaFactory.createForClass(BookEntity);

export type BookDoc = HydratedDocument<BookEntity>;

BookSchema.pre('save', function (next: CallbackWithoutResultAndOptionalError) {
    next();
});
