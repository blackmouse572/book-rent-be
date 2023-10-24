import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';

@DatabaseEntity({ collection: 'genres' })
export class GenreEntity {
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

    // If you want to store book names associated with the genre
    @Prop({
        type: [String],
    })
    bookNames: string[];
}
    @Prop({
    required: true,
    type: Number,
    default: 0,
})
quantity: number;


export const GenreSchema = SchemaFactory.createForClass(GenreEntity);
export type GenreDoc = Document & GenreEntity;
