import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BookEntity } from 'src/book/repository/book.entity';
import { DatabaseMongoObjectIdEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.object-id.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';
import {
    ENUM_DEPOSIT_TYPE,
    ENUM_ORDER_STATUS,
} from 'src/order/constants/order.enum';
import { UserEntity } from 'src/user/repository/user.entity';

export const OrderDatabaseName = 'orders';

@DatabaseEntity({ collection: OrderDatabaseName })
export class OrderEntity extends DatabaseMongoObjectIdEntityAbstract {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: BookEntity.name,
        required: true,
        autopopulate: true,
        alias: 'book_id',
    })
    bookId: BookEntity[];

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: UserEntity.name,
        required: true,
        autopopulate: false,
        alias: 'user_id',
    })
    userId: UserEntity;

    @Prop({
        type: Date,
        default: Date.now,
        alias: 'rental_date',
    })
    rentalDate: Date;

    @Prop({
        type: Date,
        default: Date.now,
        alias: 'return_date',
    })
    returnDate: Date;

    @Prop({
        type: String,
        required: true,
        trim: true,
        sparse: true,
        alias: 'pickup_location',
    })
    pickupLocation: string;

    @Prop({
        type: String,
        sparse: true,
        trim: true,
        required: true,
        alias: 'return_location',
    })
    returnLocation: string;

    @Prop({
        type: Number,
        required: true,
        alias: 'total_price',
    })
    totalPrice: number;

    @Prop({
        type: String,
        enum: ENUM_ORDER_STATUS,
        default: ENUM_ORDER_STATUS.PENDING,
    })
    status: ENUM_ORDER_STATUS;

    @Prop({
        type: Number,
        required: true,
    })
    quantity: number;

    @Prop({
        type: String,
        enum: ENUM_DEPOSIT_TYPE,
        required: true,
    })
    depositType: ENUM_DEPOSIT_TYPE;
}

export const OrderSchema = SchemaFactory.createForClass(OrderEntity);

export type OrderDocument = HydratedDocument<OrderEntity>;
