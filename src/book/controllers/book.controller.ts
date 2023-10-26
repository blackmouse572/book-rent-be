import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
import { CategoryDoc } from 'src/category/repository/category.entity';
import { CategoryService } from 'src/category/services/category.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import {
    PaginationQuery,
    PaginationQueryFilterInEnum,
} from 'src/common/pagination/decorators/pagination.decorator';
import { PaginationListDto } from 'src/common/pagination/dto/pagination.list.dto';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { GenreDoc } from 'src/genre/repository/genre.entity';
import { GenreService } from 'src/genre/services/genre.service';

@Controller('book')
export class BookController {
    constructor(
        private readonly paginationService: PaginationService,
        private readonly bookService: BookService,
        private readonly cloudinarySercive: CloudinaryService,
        private readonly categoryService: CategoryService,
        private readonly genreService: GenreService
    ) {}

    @ApiOperation({
        tags: ['book'],
        description: 'create book',
    })
    // @AuthJwtAdminAccessProtected()
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    async create(
        @Body() dto: BookCreateDto,
        @UploadedFile() file: Express.Multer.File
    ): Promise<BookDoc> {
        //genres
        const genres: GenreDoc[] = [];
        for (const genre of dto.genres) {
            const a = await this.genreService.create(genre);
            genres.push(a);
        }

        // check category
        const categorys: CategoryDoc[] = [];

        for (const id of dto.category) {
            const category = await this.categoryService.findOneById(id);
            if (!category)
                throw new BadRequestException(
                    `can not find category with id: ${id}`
                );
            categorys.push(category);
        }
        const entity = new BookEntity();

        if (file) {
            const infor = await this.cloudinarySercive.uploadFile(file);
            entity.image = infor.secure_url;
        } else {
            throw new BadRequestException('Not found image');
        }

        entity.author = dto.author;
        entity.category = categorys;
        entity.genres = genres;
        entity.deposit = dto.deposit;
        entity.description = dto.description;
        entity.keyword = dto.keyword;
        entity.name = dto.name;
        entity.rental_price = dto.rental_price;
        entity.status = BOOK_STATUS_ENUM.ENABLE;

        const result = await this.bookService.create(entity);
        return result;
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
