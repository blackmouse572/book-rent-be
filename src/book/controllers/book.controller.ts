import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { BookCreateDto } from 'src/book/dtos/create-book.dto';
import { BookDoc, BookEntity } from 'src/book/repository/book.entity';
import { BookService } from 'src/book/services/book.service';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @ApiOperation({
        tags: ['book'],
        description: 'create book',
    })
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
    @Delete('/:id')
    async delete(@Param('id') _id: string): Promise<BookDoc> {
        const book: BookDoc = await this.bookService.findOneById(_id);
        if (!book) {
            throw new NotFoundException({ message: 'book not found' });
        }
        return this.bookService.delete(book);
    }
}
