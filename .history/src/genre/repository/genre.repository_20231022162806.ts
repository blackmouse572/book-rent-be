import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { GenreDoc, GenreEntity } from 'src/genre/repository/genre.entity';
import { DatabaseMongoObjectIdRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.object-id.repository.abstract';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';

@Injectable()
export class GenreRepository extends DatabaseMongoObjectIdRepositoryAbstract<
    GenreEntity,
    GenreDoc
> {
    constructor(
        @DatabaseModel(GenreEntity.name)
        private readonly genreModel: Model<GenreEntity>
    ) {
        super(genreModel);
    }
}
