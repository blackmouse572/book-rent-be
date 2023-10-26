import { Injectable, NotFoundException } from '@nestjs/common';
import { BOOK_STATUS_ENUM } from 'src/book/constants/book.enum.constants';
import { BookUpdateDto } from 'src/book/dtos/update-book.dto';
import { BookDoc, BookEntity } from 'src/book/repository/book.entity';
import { BookRepository } from 'src/book/repository/book.repository';
import { CategoryService } from 'src/category/services/category.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import {
    IDatabaseCreateOptions,
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
    IDatabaseGetTotalOptions,
    IDatabaseManyOptions,
    IDatabaseSaveOptions,
} from 'src/common/database/interfaces/database.interface';
import { GenreService } from 'src/genre/services/genre.service';

@Injectable()
export class BookService {
    constructor(
        private readonly bookRepository: BookRepository,
        private readonly genreService: GenreService,
        private readonly categoryService: CategoryService,
        private readonly cloudinaryService: CloudinaryService
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
        entity: BookEntity,
        options?: IDatabaseCreateOptions<any>
    ): Promise<BookDoc> {
        return await this.bookRepository.create(entity, options);
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
