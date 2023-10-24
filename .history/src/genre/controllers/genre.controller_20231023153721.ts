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
import { GenreCreateDto } from 'src/genre/dto/create-genre.dto';
import { UpdateGenreDto } from 'src/genre/dto/update-genre.dto';
import { GenreDoc, GenreEntity } from 'src/genre/repository/genre.entity';
import { GenreService } from 'src/genre/services/genre.service';

@Controller('genre')
export class GenreController {
    constructor(private readonly genreService: GenreService) {}

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
    findAll(): Promise<GenreEntity[]> {
        return this.genreService.findAll();
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
}
