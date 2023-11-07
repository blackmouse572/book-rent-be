import { Injectable } from '@nestjs/common';
import {
    IDatabaseCreateOptions,
    IDatabaseFindOneOptions,
    IDatabaseSaveOptions,
} from 'src/common/database/interfaces/database.interface';
import { ReviewCreateDto } from 'src/review/dtos/create-review.dto';
import { ReviewDoc, ReviewEntity } from 'src/review/repository/review.entity';
import { ReviewRepository } from 'src/review/repository/review.repository';
import { UserDoc } from 'src/user/repository/user.entity';

@Injectable()
export class ReviewService {
    constructor(private readonly reviewRepository: ReviewRepository) {}

    async findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<ReviewDoc> {
        return this.reviewRepository.findOneById<ReviewDoc>(_id, options);
    }

    async create(
        dto: ReviewCreateDto,
        user: UserDoc,
        options?: IDatabaseCreateOptions<any>
    ): Promise<ReviewDoc> {
        const review = new ReviewEntity();
        review.comment = dto.comment;
        review.rating = dto.rating;
        review.author = user;

        return this.reviewRepository.create(review, options);
    }

    async delete(
        reviewDoc: ReviewDoc,
        options?: IDatabaseSaveOptions
    ): Promise<ReviewDoc> {
        return this.reviewRepository.softDelete(reviewDoc, options);
    }
}
