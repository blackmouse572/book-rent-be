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
import { GenreCreateDto } from 'src/genre/dtos/create-genre.dto';
import { UpdateGenreDto } from 'src/genre/dtos/update-genre.dto';
import { GenreDoc, GenreEntity } from 'src/genre/repository/genre.entity';
import { GenreService } from 'src/genre/services/genre.service';
import { PaginationQuery } from 'src/common/pagination/decorators/pagination.decorator';
import { PaginationListDto } from 'src/common/pagination/dto/pagination.list.dto';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import {
    GENRE_PAGINATION_DEFAULT_LIMIT,
    GENRE_PAGINATION_DEFAULT_SORT_FIELD,
    GENRE_PAGINATION_DEFAULT_SORT_DIRECTION,
    GENRE_PAGINATION_ALLOWED_SORT_FIELDS,
} from 'src/genre/constants/genre.list-constants';

@Controller('genre')
export class GenreController {
    constructor(
        private readonly paginationService: PaginationService,
        private readonly genreService: GenreService
    ) {}

    @ApiOperation({
        tags: ['genre'],
        description: 'create genre',
    })
    @AuthJwtAdminAccessProtected()
    @Post()
    async create(@Body() createGenreDto: GenreCreateDto): Promise<GenreDoc> {
        return this.genreService.create(createGenreDto);
    }

    @ApiOperation({
        tags: ['genre'],
        description: 'get genre by id',
    })
    @Get('/:id')
    async getById(@Param('id') _id: string): Promise<GenreDoc> {
        const result = await this.genreService.findOneById(_id);
        if (!result) {
            throw new NotFoundException({ message: 'genre not found' });
        }
        return result;
    }

    @ApiOperation({
        tags: ['genre'],
        description: 'get all genres',
    })
    @Get()
    async findAll(): Promise<GenreEntity[]> {
        return this.genreService.findAllWithBooks();
    }

    @ApiOperation({
        tags: ['genre'],
        description: 'delete genre by Id',
    })
    @AuthJwtAdminAccessProtected()
    @Delete('/:id')
    async delete(@Param('id') _id: string): Promise<GenreDoc> {
        return this.genreService.delete(_id);
    }

    @ApiOperation({
        tags: ['genre'],
        description: 'update genre by Id',
    })
    @AuthJwtAdminAccessProtected()
    @Put('/:id')
    async update(
        @Param('id') id: string,
        @Body() updateGenreDto: UpdateGenreDto
    ): Promise<GenreDoc> {
        return this.genreService.update(id, updateGenreDto);
    }

    @ApiOperation({
        tags: ['admin', 'user'],
        description: 'Get list of genres in database',
        summary: 'List genre',
    })
    @AuthJwtAdminAccessProtected()
    @Get('/list')
    async list(
        @PaginationQuery(
            GENRE_PAGINATION_DEFAULT_LIMIT,
            GENRE_PAGINATION_DEFAULT_SORT_FIELD,
            GENRE_PAGINATION_DEFAULT_SORT_DIRECTION,
            GENRE_PAGINATION_ALLOWED_SORT_FIELDS
        )
        { _search, _limit, _offset, _order }: PaginationListDto
    ) {
        const find: Record<string, any> = {
            ..._search,
        };

        const genres: GenreEntity[] = await this.genreService.findAllWithBooks(find, {
            paging: {
                limit: _limit || GENRE_PAGINATION_DEFAULT_LIMIT,
                offset: _offset,
            },
            order: _order || {
                [GENRE_PAGINATION_DEFAULT_SORT_FIELD]: GENRE_PAGINATION_DEFAULT_SORT_DIRECTION
            },
        });

        const total: number = await this.genreService.getTotal(find);
        const totalPage: number = this.paginationService.totalPage(
            total,
            _limit || GENRE_PAGINATION_DEFAULT_LIMIT
        );

        return {
            _pagination: { total, totalPage },
            data: genres,
        };
    }
}
