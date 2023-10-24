import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { BOOK_STATUS_ENUM } from 'src/book/constants/book.enum.constants';
import { BookCreateDto } from 'src/book/dtos/create-book.dto';
import { BookUpdateDto } from 'src/book/dtos/update-book.dto';
import { IBookService } from 'src/book/interfaces/book.service.interfaces';
import { BookDoc, BookEntity } from 'src/book/repository/book.entity';
import { BookRepository } from 'src/book/repository/book.repository';
import { CategoryDoc } from 'src/category/repository/category.entity';
import { CategoryService } from 'src/category/services/category.service';
import {
    IDatabaseCreateOptions,
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
    IDatabaseGetTotalOptions,
    IDatabaseManyOptions,
    IDatabaseSaveOptions,
} from 'src/common/database/interfaces/database.interface';
import { GenreDoc } from 'src/genre/repository/genre.entity';
import { GenreService } from 'src/genre/services/genre.service';

@Injectable()
export class BookService implements IBookService {
    constructor(
        private readonly bookRepository: BookRepository,
        private readonly genreService: GenreService,
        private readonly categoryService: CategoryService
    ) {}
    async update(
        id: string,
        bookDto: BookUpdateDto,
        options?: IDatabaseManyOptions<any>
    ): Promise<BookDoc> {
        const post = await this.findOneById(id);
        if (!post) {
            throw new NotFoundException();
        }
        await this.bookRepository.updateMany(post, bookDto, options);

        return await this.findOneById(id);
    }

    async findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<BookEntity[]> {
        return this.bookRepository.findAll<BookEntity>(find, {
            ...options,
            join: true,
        });
    }

    async findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<BookDoc> {
        return this.bookRepository.findOneById<BookDoc>(_id, options);
    }

    async findOne(
        find: Record<string, any>,
        options?: IDatabaseFindOneOptions
    ): Promise<BookDoc> {
        return this.bookRepository.findOne<BookDoc>(find, options);
    }
    findOneByKeyword(
        keyword: string,
        options?: IDatabaseFindOneOptions<any>
    ): Promise<BookDoc> {
        return this.bookRepository.findOne({ keyword }, options);
    }
    getTotal(
        find?: Record<string, any>,
        options?: IDatabaseGetTotalOptions
    ): Promise<number> {
        return this.bookRepository.getTotal(find, { ...options, join: true });
    }
    async create(
        dto: BookCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<BookDoc> {
        //check genres
        const genres: GenreDoc[] = [];

        dto.genres.map(async (g) => {
            const a = await this.genreService.findOneById(g);
            if (!a)
                throw new ConflictException({
                    message: 'can not find genre with id: ' + g,
                });
            genres.push(a);
        });
        //check category
        const categorys: CategoryDoc[] = [];
        dto.category.map(async (c) => {
            const category = await this.categoryService.findOneById(c);
            if (!category)
                throw new ConflictException({
                    message: 'can not find category with id: ' + c,
                });
            categorys.push(category);
        });

        const entity = new BookEntity();
        entity.author = dto.author;
        entity.category = categorys;
        entity.genres = genres;
        entity.deposit = dto.deposit;
        entity.description = dto.description;
        entity.image = dto.image;
        entity.keyword = dto.keyword;
        entity.name = dto.name;
        entity.rental_price = dto.rental_price;
        entity.status = BOOK_STATUS_ENUM.ENABLE;

        return this.bookRepository.create(entity, options);
    }

    async delete(id: string, options?: IDatabaseSaveOptions): Promise<BookDoc> {
        const book: BookDoc = await this.findOneById(id);
        if (!book) {
            throw new NotFoundException({ message: 'book not found' });
        }
        return this.bookRepository.softDelete(book, options);
    }
    active(
        repository: BookDoc,
        options?: IDatabaseSaveOptions
    ): Promise<BookDoc> {
        repository.status = BOOK_STATUS_ENUM.ENABLE;
        return this.bookRepository.save(repository, options);
    }
    inactive(
        repository: BookDoc,
        options?: IDatabaseSaveOptions
    ): Promise<BookDoc> {
        repository.status = BOOK_STATUS_ENUM.DISABLE;
        return this.bookRepository.save(repository, options);
    }

    deleteMany(
        find: Record<string, any>,
        options?: IDatabaseManyOptions
    ): Promise<boolean> {
        return this.bookRepository.deleteMany(find, options);
    }
}
