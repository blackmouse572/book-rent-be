import { Prop, SchemaFactory } from '@nestjs/mongoose';
import {
    CallbackWithoutResultAndOptionalError,
    HydratedDocument,
} from 'mongoose';
import { DatabaseMongoObjectIdEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.object-id.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';

export const GenreDatabaseName = 'genres';

@DatabaseEntity({ collection: GenreDatabaseName })
export class GenreEntity extends DatabaseMongoObjectIdEntityAbstract {
    @Prop({
        required: true,
        sparse: true,
        index: true,
        trim: true,
        type: String,
        maxlength: 100,
    })
    name: string;

    @Prop({
        required: true,
        type: Number,
        min: 0,
    })
    quantity: number;
}

export const GenreSchema = SchemaFactory.createForClass(GenreEntity);

export type GenreDoc = HydratedDocument<GenreEntity>;

GenreSchema.pre('save', function (next: CallbackWithoutResultAndOptionalError) {
    next();
});
