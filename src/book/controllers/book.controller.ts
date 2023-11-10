import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    ForbiddenException,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation } from '@nestjs/swagger';
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
import { CreateBookDto } from 'src/book/dtos/create-book.dto';
import { UpdateBookDto } from 'src/book/dtos/update-book.dto';
import { BookDoc, BookEntity } from 'src/book/repository/book.entity';
import { BookService } from 'src/book/services/book.service';
import { CategoryDoc } from 'src/category/repository/category.entity';
import { CategoryService } from 'src/category/services/category.service';
import {
    PaginationQuery,
    PaginationQueryFilterEqual,
    PaginationQueryFilterEqualObjectId,
    PaginationQueryFilterInEnum,
} from 'src/common/pagination/decorators/pagination.decorator';
import { PaginationListDto } from 'src/common/pagination/dto/pagination.list.dto';
import { PaginationService } from 'src/common/pagination/services/pagination.service';

@Controller('book')
export class BookController {
    constructor(
        private readonly paginationService: PaginationService,
        private readonly bookService: BookService,
        private readonly categoryService: CategoryService
    ) {}

    @ApiOperation({
        tags: ['book'],
        description: 'create book',
    })
    @AuthJwtAdminAccessProtected()
    @Post()
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('image'))
    async create(
        @Body() dto: CreateBookDto,
        @UploadedFile() file: Express.Multer.File
    ): Promise<BookDoc> {
        const categorys: CategoryDoc[] = [];

        for (const id of dto.category) {
            const category = await this.categoryService.findOneById(id);
            if (!category)
                throw new BadRequestException(
                    `can not find category with id: ${id}`
                );
            categorys.push(category);
        }

        if (!file) {
            throw new BadRequestException('Not found image');
        }

        const result = await this.bookService.create(dto, categorys, file);
        return result.populate('category');
    }

    @ApiOperation({
        tags: ['book'],
        description: 'Get list of books in database',
        summary: 'List book',
    })
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
        status: Record<string, any>,
        @PaginationQueryFilterEqualObjectId('category')
        category: Record<string, any>,
        @PaginationQueryFilterEqual('genres') genres: Record<string, any>
    ) {
        const find: Record<string, any> = {
            ..._search,
            ...status,
            ...category,
            ...genres,
        };

        const books: BookEntity[] = await this.bookService.findAll(find, {
            paging: {
                limit: _limit,
                offset: _offset,
            },
            order: _order,
            join: { path: 'category' },
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
        if (result.status === BOOK_STATUS_ENUM.DISABLE){
            throw new ForbiddenException({message: 'Book is disabled'})
        }
        return result.populate([
            'category',
            {
                path: 'reviews',
                populate: {
                    path: 'author',
                    select: 'id username fullName email avatar',
                },
            },
        ]);
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
        description: 'Change book status by Id',
    })
    @AuthJwtAdminAccessProtected()
    @Put('status/:id')
    async changeStatus(@Param('id') id: string) {
        const bookDoc = await this.bookService.findOneById(id);
        if (!bookDoc) {
            throw new NotFoundException(`Cannot found book with id: ${id}`);
        }

        const result = await this.bookService.changeStatus(bookDoc);
        return result.populate('category');
    }

    @ApiOperation({
        tags: ['book'],
        description: 'update book by Id',
    })
    @AuthJwtAdminAccessProtected()
    @Put('/:id')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('image'))
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateBookDto,
        @UploadedFile() file: Express.Multer.File
    ) {
        const bookDoc = await this.bookService.findOneById(id);
        if (!bookDoc) {
            throw new NotFoundException(`Cannot found book with id: ${id}`);
        }

        const categorys: CategoryDoc[] = [];
        if (dto.category) {
            for (const id of dto.category) {
                const category = await this.categoryService.findOneById(id);
                if (!category)
                    throw new BadRequestException(
                        `can not find category with id: ${id}`
                    );
                categorys.push(category);
            }
        }

        return await this.bookService.update(bookDoc, dto, categorys, file);
    }
}
