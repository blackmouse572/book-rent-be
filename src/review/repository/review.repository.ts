import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseMongoObjectIdRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.object-id.repository.abstract';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';
import { ReviewDoc, ReviewEntity } from 'src/review/repository/review.entity';

@Injectable()
export class ReviewRepository extends DatabaseMongoObjectIdRepositoryAbstract<
    ReviewEntity,
    ReviewDoc
> {
    constructor(
        @DatabaseModel(ReviewEntity.name)
        private readonly reviewModel: Model<ReviewEntity>
    ) {
        super(reviewModel);
    }
}
