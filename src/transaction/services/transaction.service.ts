import { Injectable } from '@nestjs/common';
import { CategoryEntity } from 'src/category/repository/category.entity';
import {
    IDatabaseCreateOptions,
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
    IDatabaseGetTotalOptions,
} from 'src/common/database/interfaces/database.interface';
import { OrderDocument } from 'src/order/repositories/order.entity';
import { TransactionRepository } from 'src/transaction/repository/transaction.repository';
import {
    TransactionDoc,
    TransactionEntity,
} from 'src/transaction/repository/transaction.entity';
import { UserDoc } from 'src/user/repository/user.entity';

@Injectable()
export class TransactionService {
    findOne(find: Record<string, any>, option?: IDatabaseFindOneOptions) {
        return this.transactionRepository.findOne(find, option);
    }
    constructor(
        private readonly transactionRepository: TransactionRepository
    ) {}

    async findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<TransactionDoc> {
        return this.transactionRepository.findOneById<TransactionDoc>(
            _id,
            options
        );
    }

    async create(
        entity: TransactionEntity,
        options?: IDatabaseCreateOptions<any>
    ): Promise<TransactionDoc> {
        return this.transactionRepository.create<TransactionEntity>(
            entity,
            options
        );
    }

    async findAll(
        find: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<TransactionEntity[]> {
        return this.transactionRepository.findAll<TransactionEntity>(
            find,
            options
        );
    }

    getTotal(
        find?: Record<string, any>,
        options?: IDatabaseGetTotalOptions
    ): Promise<number> {
        return this.transactionRepository.getTotal(find, {
            ...options,
            join: true,
        });
    }
}
