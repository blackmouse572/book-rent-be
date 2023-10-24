import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthJwtAdminAccessProtected } from 'src/auth/decorators/auth.jwt.decorator';
import { BOOK_STATUS_ENUM } from 'src/book/constants/book.enum.constants';
import {
    BOOK_DEFAULT_AVAILABLE_ORDER_BY,
    BOOK_DEFAULT_AVAILABLE_SEARCH,
    BOOK_DEFAULT_ORDER_BY,
    BOOK_DEFAULT_ORDER_DIRECTION,
    BOOK_DEFAULT_PER_PAGE,
    BOOK_DEFAULT_STATUS,
} from 'src/book/constants/book.list-constants';
import { BookCreateDto } from 'src/book/dtos/create-book.dto';
import { BookUpdateDto } from 'src/book/dtos/update-book.dto';
import { BookDoc, BookEntity } from 'src/book/repository/book.entity';
import { BookService } from 'src/book/services/book.service';
import {
    PaginationQuery,
    PaginationQueryFilterInEnum,
} from 'src/common/pagination/decorators/pagination.decorator';
import { PaginationListDto } from 'src/common/pagination/dto/pagination.list.dto';
import { PaginationService } from 'src/common/pagination/dervices/pagination.service';

@Controller('book')
export class BookController {
    constructor(
        private readonly paginationService: PaginationService,
        private readonly bookService: BookService
    ) {}

    @ApiOperation({
        tags: ['book'],
        description: 'create book',
    })
    @AuthJwtAdminAccessProtected()
    @Post()
    async create(@Body() createBookDto: BookCreateDto): Promise<BookDoc> {
        return this.bookService.create(createBookDto);
    }
    @ApiOperation({
        tags: ['book'],
        description: 'get book by id',
    })
    @Get('/:id')
    async getById(@Param('id') _id: string): Promise<BookDoc> {
        const result = await this.bookService.findOneById(_id);
        if (!result) {
            throw new NotFoundException({ message: 'book not found' });
        }
        return result;
    }

    @ApiOperation({
        tags: ['book'],
        description: 'get all book',
    })
    @Get()
    findAll(): Promise<BookEntity[]> {
        return this.bookService.findAll();
    }

    @ApiOperation({
        tags: ['book'],
        description: 'delete book by Id',
    })
    @AuthJwtAdminAccessProtected()
    @Delete('/:id')
    async delete(@Param('id') _id: string): Promise<BookDoc> {
        return this.bookService.delete(_id);
    }
    @ApiOperation({
        tags: ['book'],
        description: 'update book by Id',
    })
    @AuthJwtAdminAccessProtected()
    @Put('/:id')
    async update(
        @Param('id') id: string,
        @Body() bookUpdateDto: BookUpdateDto
    ) {
        return this.bookService.update(id, bookUpdateDto);
    }

    @ApiOperation({
        tags: ['admin', 'user'],
        description: 'Get list of users in database',
        summary: 'List user',
    })
    @AuthJwtAdminAccessProtected()
    @Get('/list')
    async list(
        @PaginationQuery(
            BOOK_DEFAULT_PER_PAGE,
            BOOK_DEFAULT_ORDER_BY,
            BOOK_DEFAULT_ORDER_DIRECTION,
            BOOK_DEFAULT_AVAILABLE_SEARCH,
            BOOK_DEFAULT_AVAILABLE_ORDER_BY
        )
        { _search, _limit, _offset, _order }: PaginationListDto,
        @PaginationQueryFilterInEnum(
            'status',
            BOOK_DEFAULT_STATUS,
            BOOK_STATUS_ENUM
        )
        status: Record<string, any>
    ) {
        const find: Record<string, any> = {
            ..._search,
            ...status,
        };

        const books: BookEntity[] = await this.bookService.findAll(find, {
            paging: {
                limit: _limit,
                offset: _offset,
            },
            order: _order,
        });

        const total: number = await this.bookService.getTotal(find);
        const totalPage: number = this.paginationService.totalPage(
            total,
            _limit
        );

        return {
            _pagination: { total, totalPage },
            data: books,
        };
    }
}
