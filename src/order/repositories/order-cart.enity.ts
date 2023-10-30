import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BookEntity } from 'src/book/repository/book.entity';
import { DatabaseMongoObjectIdEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.object-id.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';

export const OrderCartDatabaseName = 'order_carts';

@DatabaseEntity({ collection: OrderCartDatabaseName })
export class OrderCartEntity extends DatabaseMongoObjectIdEntityAbstract {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: BookEntity.name,
        required: true,
        autopopulate: true,
        alias: 'book_id',
    })
    book: BookEntity;

    @Prop({
        required: true,
        type: Number,
        default: 1,
    })
    quantity: number;
}

export const OrderCartSchema = SchemaFactory.createForClass(OrderCartEntity);

export type OrderCartDocument = HydratedDocument<OrderCartEntity>;
