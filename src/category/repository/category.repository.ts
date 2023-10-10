import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
    CategoryDoc,
    CategoryEntity,
} from 'src/category/repository/category.entity';
import { DatabaseMongoObjectIdRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.object-id.repository.abstract';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';

@Injectable()
export class CategoryRepository extends DatabaseMongoObjectIdRepositoryAbstract<
    CategoryEntity,
    CategoryDoc
> {
    constructor(
        @DatabaseModel(CategoryEntity.name)
        private readonly categoryModel: Model<CategoryEntity>
    ) {
        super(categoryModel);
    }
}
