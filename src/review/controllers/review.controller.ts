import {
    Body,
    Controller,
    Delete,
    ForbiddenException,
    NotFoundException,
    Param,
    Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthJwtAccessProtected } from 'src/auth/decorators/auth.jwt.decorator';
import { BookService } from 'src/book/services/book.service';
import { ReviewCreateDto } from 'src/review/dtos/create-review.dto';
import { ReviewDoc } from 'src/review/repository/review.entity';
import { ReviewService } from 'src/review/services/review.service';
import { ENUM_ROLE_TYPE } from 'src/user/constants/user.enum.constants';
import { GetUser, UserProtected } from 'src/user/decorators/user.decorator';
import { UserDoc } from 'src/user/repository/user.entity';

@ApiBearerAuth('accessToken')
@Controller('review')
export class ReviewController {
    constructor(
        private readonly bookService: BookService,
        private readonly reviewService: ReviewService
    ) {}

    @ApiOperation({
        tags: ['review'],
        description: 'create review',
    })
    @UserProtected()
    @AuthJwtAccessProtected()
    @Post('/:bookId')
    async create(
        @GetUser() user: UserDoc,
        @Param('bookId') bookId: string,
        @Body() dto: ReviewCreateDto
    ): Promise<ReviewDoc> {
        const bookDoc = await this.bookService.findOneById(bookId);
        const reviewDoc = await this.reviewService.create(dto, user);

        bookDoc.reviews.push(reviewDoc);
        await bookDoc.save();

        return reviewDoc;
    }

    @ApiOperation({
        tags: ['review'],
        description: 'delete review',
    })
    @UserProtected()
    @AuthJwtAccessProtected()
    @Delete('/:bookId/:reviewId')
    async delete(
        @GetUser() user: UserDoc,
        @Param('reviewId') reviewId: string,
        @Param('bookId') bookId: string
    ): Promise<ReviewDoc> {
        const book = await this.bookService.findOneById(bookId);
        const reviewDoc = await this.reviewService.findOneById(reviewId);
        if (!reviewDoc) {
            throw new NotFoundException(
                `Can not find review with id: ${reviewId}`
            );
        } else if (
            user._id.equals(reviewDoc.author._id) ||
            user.role === ENUM_ROLE_TYPE.ADMIN
        ) {
            book.reviews = book.reviews.filter((r) => !r._id.equals(reviewId));
            book.save();
            return this.reviewService.delete(reviewDoc);
        } else {
            throw new ForbiddenException('User do not have permission');
        }
    }
}
