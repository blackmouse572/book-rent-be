import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { DatabaseMongoObjectIdEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.object-id.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';
import { BookEntity } from 'src/book/repository/book.entity';

export const GenreDatabaseName = 'genres';

@DatabaseEntity({ collection: GenreDatabaseName })
export class GenreEntity extends DatabaseMongoObjectIdEntityAbstract {
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
    bookQuantity: number;

    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'books' }],
    })
    books: BookEntity[];

    @Prop({
        type: [String],
    })
    bookNames: string[];
}

export const GenreSchema = SchemaFactory.createForClass(GenreEntity);

export type GenreDoc = mongoose.Document<typeof GenreEntity>;
