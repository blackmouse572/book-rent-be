import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseMongoObjectIdRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.object-id.repository.abstract';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';
import {
    TransactionDoc,
    TransactionEntity,
} from 'src/transaction/repository/transaction.entity';

@Injectable()
export class TransactionRepository extends DatabaseMongoObjectIdRepositoryAbstract<
    TransactionEntity,
    TransactionDoc
> {
    constructor(
        @DatabaseModel(TransactionEntity.name)
        private readonly transactionModel: Model<TransactionEntity>
    ) {
        super(transactionModel);
    }
}
