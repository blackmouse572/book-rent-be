import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { BookDoc, BookEntity } from 'src/book/repository/book.entity';
import { DatabaseMongoObjectIdRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.object-id.repository.abstract';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';

@Injectable()
export class BookRepository extends DatabaseMongoObjectIdRepositoryAbstract<
    BookEntity,
    BookDoc
> {
    constructor(
        @DatabaseModel(BookEntity.name)
        private readonly bookModel: Model<BookEntity>
    ) {
        super(bookModel);
    }
}
