import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, {
    CallbackWithoutResultAndOptionalError,
    HydratedDocument,
} from 'mongoose';
import { DatabaseMongoObjectIdEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.object-id.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';
import { OrderEntity } from 'src/order/repositories/order.entity';
import { TRANSACTION_TYPE_ENUM } from 'src/transaction/constants/transaction.enum';
import { UserEntity } from 'src/user/repository/user.entity';

export const TransactionDatabaseName = 'Transactions';

@DatabaseEntity({ collection: TransactionDatabaseName })
export class TransactionEntity extends DatabaseMongoObjectIdEntityAbstract {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: UserEntity.name,
        required: true,
    })
    user: UserEntity;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: OrderEntity.name,
        required: true,
    })
    order: OrderEntity;

    @Prop({
        type: Number,
        required: true,
    })
    amount: number;

    @Prop({
        type: String,
        required: true,
    })
    payDateStamp: string;

    @Prop({
        type: String,
        enum: TRANSACTION_TYPE_ENUM,
        required: true,
    })
    type: TRANSACTION_TYPE_ENUM;
}

export const TransactionSchema =
    SchemaFactory.createForClass(TransactionEntity);

export type TransactionDoc = HydratedDocument<TransactionEntity>;

TransactionSchema.pre(
    'save',
    function (next: CallbackWithoutResultAndOptionalError) {
        next();
    }
);
