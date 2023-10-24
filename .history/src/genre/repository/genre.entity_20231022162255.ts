// genre.entity.ts
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
        unique: true,
        index: true,
        trim: true,
        type: String,
        maxlength: 100,
    })
    name: string;

    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'books' }],
    })
    books: BookEntity[];

    @Prop({
        required: true,
        type: Number,
        default: 0,
    })
    quantity: number;  // Represents the number of books associated with this genre
}

export const GenreSchema = SchemaFactory.createForClass(GenreEntity);
export type GenreDoc = mongoose.HydratedDocument<GenreEntity>;

GenreSchema.pre('save', function (next: mongoose.CallbackWithoutResultAndOptionalError) {
    next();
});
// genre.entity.ts
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
        unique: true,
        index: true,
        trim: true,
        type: String,
        maxlength: 100,
    })
    name: string;

    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'books' }],
    })
    books: BookEntity[];

    @Prop({
        required: true,
        type: Number,
        default: 0,
    })
    quantity: number;  // Represents the number of books associated with this genre
}

export const GenreSchema = SchemaFactory.createForClass(GenreEntity);
export type GenreDoc = mongoose.HydratedDocument<GenreEntity>;

GenreSchema.pre('save', function (next: mongoose.CallbackWithoutResultAndOptionalError) {
    next();
});
