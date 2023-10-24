import { Injectable } from '@nestjs/common';
import {
    IDatabaseCreateOptions,
    IDatabaseFindOneOptions,
    IDatabaseSaveOptions,
} from 'src/common/database/interfaces/database.interface';
import { GenreCreateDto } from 'src/genre/dtos/create-genre.dto';
import { UpdateGenreDto } from 'src/genre/dtos/update-genre.dto'; // Assuming you have created this DTO
import { GenreDoc, GenreEntity } from 'src/genre/repository/genre.entity';
import { GenreRepository } from 'src/genre/repository/genre.repository';

@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc> {
        return this.genreRepository.findOneById(_id, options); // Removed <GenreDoc>
    }

    create(
        genreDto: GenreCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<GenreDoc> {
        const entity: GenreEntity = new GenreEntity();
        entity.name = genreDto.name;
        entity.bookQuantity = genreDto.bookQuantity;
        entity.bookNames = genreDto.bookNames;

        return this.genreRepository.create(entity, options); // Removed <GenreEntity>
    }

    async update(
        _id: string,
        updateGenreDto: UpdateGenreDto,
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc> {
        const genre = await this.findOneById(_id);
        if (updateGenreDto.name) {
            genre.name = updateGenreDto.name;
        }
        if (typeof updateGenreDto.bookQuantity !== 'undefined') {
            genre.bookQuantity = updateGenreDto.bookQuantity;
        }
        if (updateGenreDto.bookNames) {
            genre.bookNames = updateGenreDto.bookNames;
        }

        return this.genreRepository.save(genre, options); // Removed <GenreEntity>
    }
}

@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc> {
        return this.genreRepository.findOneById(_id, options); // Removed <GenreDoc>
    }

    create(
        genreDto: GenreCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<GenreDoc> {
        const entity: GenreEntity = new GenreEntity();
        entity.name = genreDto.name;
        entity.bookQuantity = genreDto.bookQuantity;
        entity.bookNames = genreDto.bookNames;

        return this.genreRepository.create(entity, options); // Removed <GenreEntity>
    }

    async update(
        _id: string,
        updateGenreDto: UpdateGenreDto,
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc> {
        const genre = await this.findOneById(_id);
        if (updateGenreDto.name) {
            genre.name = updateGenreDto.name;
        }
        if (typeof updateGenreDto.bookQuantity !== 'undefined') {
            genre.bookQuantity = updateGenreDto.bookQuantity;
        }
        if (updateGenreDto.bookNames) {
            genre.bookNames = updateGenreDto.bookNames;
        }

        return this.genreRepository.save(genre, options); // Removed <GenreEntity>
    }
}

@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc> {
        return this.genreRepository.findOneById(_id, options); // Removed <GenreDoc>
    }

    create(
        genreDto: GenreCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<GenreDoc> {
        const entity: GenreEntity = new GenreEntity();
        entity.name = genreDto.name;
        entity.bookQuantity = genreDto.bookQuantity;
        entity.bookNames = genreDto.bookNames;

        return this.genreRepository.create(entity, options); // Removed <GenreEntity>
    }

    async update(
        _id: string,
        updateGenreDto: UpdateGenreDto,
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc> {
        const genre = await this.findOneById(_id);
        if (updateGenreDto.name) {
            genre.name = updateGenreDto.name;
        }
        if (typeof updateGenreDto.bookQuantity !== 'undefined') {
            genre.bookQuantity = updateGenreDto.bookQuantity;
        }
        if (updateGenreDto.bookNames) {
            genre.bookNames = updateGenreDto.bookNames;
        }

        return this.genreRepository.save(genre, options); // Removed <GenreEntity>
    }
}

@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc> {
        return this.genreRepository.findOneById(_id, options); // Removed <GenreDoc>
    }

    create(
        genreDto: GenreCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<GenreDoc> {
        const entity: GenreEntity = new GenreEntity();
        entity.name = genreDto.name;
        entity.bookQuantity = genreDto.bookQuantity;
        entity.bookNames = genreDto.bookNames;

        return this.genreRepository.create(entity, options); // Removed <GenreEntity>
    }

    async update(
        _id: string,
        updateGenreDto: UpdateGenreDto,
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc> {
        const genre = await this.findOneById(_id);
        if (updateGenreDto.name) {
            genre.name = updateGenreDto.name;
        }
        if (typeof updateGenreDto.bookQuantity !== 'undefined') {
            genre.bookQuantity = updateGenreDto.bookQuantity;
        }
        if (updateGenreDto.bookNames) {
            genre.bookNames = updateGenreDto.bookNames;
        }

        return this.genreRepository.save(genre, options); // Removed <GenreEntity>
    }
}

@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc> {
        return this.genreRepository.findOneById(_id, options); // Removed <GenreDoc>
    }

    create(
        genreDto: GenreCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<GenreDoc> {
        const entity: GenreEntity = new GenreEntity();
        entity.name = genreDto.name;
        entity.bookQuantity = genreDto.bookQuantity;
        entity.bookNames = genreDto.bookNames;

        return this.genreRepository.create(entity, options); // Removed <GenreEntity>
    }

    async update(
        _id: string,
        updateGenreDto: UpdateGenreDto,
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc> {
        const genre = await this.findOneById(_id);
        if (updateGenreDto.name) {
            genre.name = updateGenreDto.name;
        }
        if (typeof updateGenreDto.bookQuantity !== 'undefined') {
            genre.bookQuantity = updateGenreDto.bookQuantity;
        }
        if (updateGenreDto.bookNames) {
            genre.bookNames = updateGenreDto.bookNames;
        }

        return this.genreRepository.save(genre, options); // Removed <GenreEntity>
    }
}

@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc> {
        return this.genreRepository.findOneById(_id, options); // Removed <GenreDoc>
    }

    create(
        genreDto: GenreCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<GenreDoc> {
        const entity: GenreEntity = new GenreEntity();
        entity.name = genreDto.name;
        entity.bookQuantity = genreDto.bookQuantity;
        entity.bookNames = genreDto.bookNames;

        return this.genreRepository.create(entity, options); // Removed <GenreEntity>
    }

    async update(
        _id: string,
        updateGenreDto: UpdateGenreDto,
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc> {
        const genre = await this.findOneById(_id);
        if (updateGenreDto.name) {
            genre.name = updateGenreDto.name;
        }
        if (typeof updateGenreDto.bookQuantity !== 'undefined') {
            genre.bookQuantity = updateGenreDto.bookQuantity;
        }
        if (updateGenreDto.bookNames) {
            genre.bookNames = updateGenreDto.bookNames;
        }

        return this.genreRepository.save(genre, options); // Removed <GenreEntity>
    }
}

@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc> {
        return this.genreRepository.findOneById(_id, options); // Removed <GenreDoc>
    }

    create(
        genreDto: GenreCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<GenreDoc> {
        const entity: GenreEntity = new GenreEntity();
        entity.name = genreDto.name;
        entity.bookQuantity = genreDto.bookQuantity;
        entity.bookNames = genreDto.bookNames;

        return this.genreRepository.create(entity, options); // Removed <GenreEntity>
    }

    async update(
        _id: string,
        updateGenreDto: UpdateGenreDto,
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc> {
        const genre = await this.findOneById(_id);
        if (updateGenreDto.name) {
            genre.name = updateGenreDto.name;
        }
        if (typeof updateGenreDto.bookQuantity !== 'undefined') {
            genre.bookQuantity = updateGenreDto.bookQuantity;
        }
        if (updateGenreDto.bookNames) {
            genre.bookNames = updateGenreDto.bookNames;
        }

        return this.genreRepository.save(genre, options); // Removed <GenreEntity>
    }
}

@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc> {
        return this.genreRepository.findOneById(_id, options); // Removed <GenreDoc>
    }

    create(
        genreDto: GenreCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<GenreDoc> {
        const entity: GenreEntity = new GenreEntity();
        entity.name = genreDto.name;
        entity.bookQuantity = genreDto.bookQuantity;
        entity.bookNames = genreDto.bookNames;

        return this.genreRepository.create(entity, options); // Removed <GenreEntity>
    }

    async update(
        _id: string,
        updateGenreDto: UpdateGenreDto,
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc> {
        const genre = await this.findOneById(_id);
        if (updateGenreDto.name) {
            genre.name = updateGenreDto.name;
        }
        if (typeof updateGenreDto.bookQuantity !== 'undefined') {
            genre.bookQuantity = updateGenreDto.bookQuantity;
        }
        if (updateGenreDto.bookNames) {
            genre.bookNames = updateGenreDto.bookNames;
        }

        return this.genreRepository.save(genre, options); // Removed <GenreEntity>
    }
}

@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc> {
        return this.genreRepository.findOneById(_id, options); // Removed <GenreDoc>
    }

    create(
        genreDto: GenreCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<GenreDoc> {
        const entity: GenreEntity = new GenreEntity();
        entity.name = genreDto.name;
        entity.bookQuantity = genreDto.bookQuantity;
        entity.bookNames = genreDto.bookNames;

        return this.genreRepository.create(entity, options); // Removed <GenreEntity>
    }

    async update(
        _id: string,
        updateGenreDto: UpdateGenreDto,
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc> {
        const genre = await this.findOneById(_id);
        if (updateGenreDto.name) {
            genre.name = updateGenreDto.name;
        }
        if (typeof updateGenreDto.bookQuantity !== 'undefined') {
            genre.bookQuantity = updateGenreDto.bookQuantity;
        }
        if (updateGenreDto.bookNames) {
            genre.bookNames = updateGenreDto.bookNames;
        }

        return this.genreRepository.save(genre, options); // Removed <GenreEntity>
    }
}

@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc> {
        return this.genreRepository.findOneById(_id, options); // Removed <GenreDoc>
    }

    create(
        genreDto: GenreCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<GenreDoc> {
        const entity: GenreEntity = new GenreEntity();
        entity.name = genreDto.name;
        entity.bookQuantity = genreDto.bookQuantity;
        entity.bookNames = genreDto.bookNames;

        return this.genreRepository.create(entity, options); // Removed <GenreEntity>
    }

    async update(
        _id: string,
        updateGenreDto: UpdateGenreDto,
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc> {
        const genre = await this.findOneById(_id);
        if (updateGenreDto.name) {
            genre.name = updateGenreDto.name;
        }
        if (typeof updateGenreDto.bookQuantity !== 'undefined') {
            genre.bookQuantity = updateGenreDto.bookQuantity;
        }
        if (updateGenreDto.bookNames) {
            genre.bookNames = updateGenreDto.bookNames;
        }

        return this.genreRepository.save(genre, options); // Removed <GenreEntity>
    }
}

@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc> {
        return this.genreRepository.findOneById(_id, options); // Removed <GenreDoc>
    }

    create(
        genreDto: GenreCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<GenreDoc> {
        const entity: GenreEntity = new GenreEntity();
        entity.name = genreDto.name;
        entity.bookQuantity = genreDto.bookQuantity;
        entity.bookNames = genreDto.bookNames;

        return this.genreRepository.create(entity, options); // Removed <GenreEntity>
    }

    async update(
        _id: string,
        updateGenreDto: UpdateGenreDto,
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc> {
        const genre = await this.findOneById(_id);
        if (updateGenreDto.name) {
            genre.name = updateGenreDto.name;
        }
        if (typeof updateGenreDto.bookQuantity !== 'undefined') {
            genre.bookQuantity = updateGenreDto.bookQuantity;
        }
        if (updateGenreDto.bookNames) {
            genre.bookNames = updateGenreDto.bookNames;
        }

        return this.genreRepository.save(genre, options); // Removed <GenreEntity>
    }
}

@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc> {
        return this.genreRepository.findOneById(_id, options); // Removed <GenreDoc>
    }

    create(
        genreDto: GenreCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<GenreDoc> {
        const entity: GenreEntity = new GenreEntity();
        entity.name = genreDto.name;
        entity.bookQuantity = genreDto.bookQuantity;
        entity.bookNames = genreDto.bookNames;

        return this.genreRepository.create(entity, options); // Removed <GenreEntity>
    }

    async update(
        _id: string,
        updateGenreDto: UpdateGenreDto,
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc> {
        const genre = await this.findOneById(_id);
        if (updateGenreDto.name) {
            genre.name = updateGenreDto.name;
        }
        if (typeof updateGenreDto.bookQuantity !== 'undefined') {
            genre.bookQuantity = updateGenreDto.bookQuantity;
        }
        if (updateGenreDto.bookNames) {
            genre.bookNames = updateGenreDto.bookNames;
        }

        return this.genreRepository.save(genre, options); // Removed <GenreEntity>
    }
}

@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc> {
        return this.genreRepository.findOneById(_id, options); // Removed <GenreDoc>
    }

    create(
        genreDto: GenreCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<GenreDoc> {
        const entity: GenreEntity = new GenreEntity();
        entity.name = genreDto.name;
        entity.bookQuantity = genreDto.bookQuantity;
        entity.bookNames = genreDto.bookNames;

        return this.genreRepository.create(entity, options); // Removed <GenreEntity>
    }

    async update(
        _id: string,
        updateGenreDto: UpdateGenreDto,
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc> {
        const genre = await this.findOneById(_id);
        if (updateGenreDto.name) {
            genre.name = updateGenreDto.name;
        }
        if (typeof updateGenreDto.bookQuantity !== 'undefined') {
            genre.bookQuantity = updateGenreDto.bookQuantity;
        }
        if (updateGenreDto.bookNames) {
            genre.bookNames = updateGenreDto.bookNames;
        }

        return this.genreRepository.save(genre, options); // Removed <GenreEntity>
    }
}

@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc> {
        return this.genreRepository.findOneById(_id, options); // Removed <GenreDoc>
    }

    create(
        genreDto: GenreCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<GenreDoc> {
        const entity: GenreEntity = new GenreEntity();
        entity.name = genreDto.name;
        entity.bookQuantity = genreDto.bookQuantity;
        entity.bookNames = genreDto.bookNames;

        return this.genreRepository.create(entity, options); // Removed <GenreEntity>
    }

    async update(
        _id: string,
        updateGenreDto: UpdateGenreDto,
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc> {
        const genre = await this.findOneById(_id);
        if (updateGenreDto.name) {
            genre.name = updateGenreDto.name;
        }
        if (typeof updateGenreDto.bookQuantity !== 'undefined') {
            genre.bookQuantity = updateGenreDto.bookQuantity;
        }
        if (updateGenreDto.bookNames) {
            genre.bookNames = updateGenreDto.bookNames;
        }

        return this.genreRepository.save(genre, options); // Removed <GenreEntity>
    }
}

@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc> {
        return this.genreRepository.findOneById(_id, options); // Removed <GenreDoc>
    }

    create(
        genreDto: GenreCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<GenreDoc> {
        const entity: GenreEntity = new GenreEntity();
        entity.name = genreDto.name;
        entity.bookQuantity = genreDto.bookQuantity;
        entity.bookNames = genreDto.bookNames;

        return this.genreRepository.create(entity, options); // Removed <GenreEntity>
    }

    async update(
        _id: string,
        updateGenreDto: UpdateGenreDto,
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc> {
        const genre = await this.findOneById(_id);
        if (updateGenreDto.name) {
            genre.name = updateGenreDto.name;
        }
        if (typeof updateGenreDto.bookQuantity !== 'undefined') {
            genre.bookQuantity = updateGenreDto.bookQuantity;
        }
        if (updateGenreDto.bookNames) {
            genre.bookNames = updateGenreDto.bookNames;
        }

        return this.genreRepository.save(genre, options); // Removed <GenreEntity>
    }
}

@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc> {
        return this.genreRepository.findOneById(_id, options); // Removed <GenreDoc>
    }

    create(
        genreDto: GenreCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<GenreDoc> {
        const entity: GenreEntity = new GenreEntity();
        entity.name = genreDto.name;
        entity.bookQuantity = genreDto.bookQuantity;
        entity.bookNames = genreDto.bookNames;

        return this.genreRepository.create(entity, options); // Removed <GenreEntity>
    }

    async update(
        _id: string,
        updateGenreDto: UpdateGenreDto,
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc> {
        const genre = await this.findOneById(_id);
        if (updateGenreDto.name) {
            genre.name = updateGenreDto.name;
        }
        if (typeof updateGenreDto.bookQuantity !== 'undefined') {
            genre.bookQuantity = updateGenreDto.bookQuantity;
        }
        if (updateGenreDto.bookNames) {
            genre.bookNames = updateGenreDto.bookNames;
        }

        return this.genreRepository.save(genre, options); // Removed <GenreEntity>
    }
}

@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc> {
        return this.genreRepository.findOneById(_id, options); // Removed <GenreDoc>
    }

    create(
        genreDto: GenreCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<GenreDoc> {
        const entity: GenreEntity = new GenreEntity();
        entity.name = genreDto.name;
        entity.bookQuantity = genreDto.bookQuantity;
        entity.bookNames = genreDto.bookNames;

        return this.genreRepository.create(entity, options); // Removed <GenreEntity>
    }

    async update(
        _id: string,
        updateGenreDto: UpdateGenreDto,
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc> {
        const genre = await this.findOneById(_id);
        if (updateGenreDto.name) {
            genre.name = updateGenreDto.name;
        }
        if (typeof updateGenreDto.bookQuantity !== 'undefined') {
            genre.bookQuantity = updateGenreDto.bookQuantity;
        }
        if (updateGenreDto.bookNames) {
            genre.bookNames = updateGenreDto.bookNames;
        }

        return this.genreRepository.save(genre, options); // Removed <GenreEntity>
    }
}
 DTO@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc> {
        return this.genreRepository.findOneById(_id, options); // Removed <GenreDoc>
    }

    create(
        genreDto: GenreCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<GenreDoc> {
        const entity: GenreEntity = new GenreEntity();
        entity.name = genreDto.name;
        entity.bookQuantity = genreDto.bookQuantity;
        entity.bookNames = genreDto.bookNames;

        return this.genreRepository.create(entity, options); // Removed <GenreEntity>
    }

    async update(
        _id: string,
        updateGenreDto: UpdateGenreDto,
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc> {
        const genre = await this.findOneById(_id);
        if (updateGenreDto.name) {
            genre.name = updateGenreDto.name;
        }
        if (typeof updateGenreDto.bookQuantity !== 'undefined') {
            genre.bookQuantity = updateGenreDto.bookQuantity;
        }
        if (updateGenreDto.bookNames) {
            genre.bookNames = updateGenreDto.bookNames;
        }

        return this.genreRepository.save(genre, options); // Removed <GenreEntity>
    }
}

@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc> {
        return this.genreRepository.findOneById(_id, options); // Removed <GenreDoc>
    }

    create(
        genreDto: GenreCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<GenreDoc> {
        const entity: GenreEntity = new GenreEntity();
        entity.name = genreDto.name;
        entity.bookQuantity = genreDto.bookQuantity;
        entity.bookNames = genreDto.bookNames;

        return this.genreRepository.create(entity, options); // Removed <GenreEntity>
    }

    async update(
        _id: string,
        updateGenreDto: UpdateGenreDto,
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc> {
        const genre = await this.findOneById(_id);
        if (updateGenreDto.name) {
            genre.name = updateGenreDto.name;
        }
        if (typeof updateGenreDto.bookQuantity !== 'undefined') {
            genre.bookQuantity = updateGenreDto.bookQuantity;
        }
        if (updateGenreDto.bookNames) {
            genre.bookNames = updateGenreDto.bookNames;
        }

        return this.genreRepository.save(genre, options); // Removed <GenreEntity>
    }
}

@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc> {
        return this.genreRepository.findOneById(_id, options); // Removed <GenreDoc>
    }

    create(
        genreDto: GenreCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<GenreDoc> {
        const entity: GenreEntity = new GenreEntity();
        entity.name = genreDto.name;
        entity.bookQuantity = genreDto.bookQuantity;
        entity.bookNames = genreDto.bookNames;

        return this.genreRepository.create(entity, options); // Removed <GenreEntity>
    }

    async update(
        _id: string,
        updateGenreDto: UpdateGenreDto,
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc> {
        const genre = await this.findOneById(_id);
        if (updateGenreDto.name) {
            genre.name = updateGenreDto.name;
        }
        if (typeof updateGenreDto.bookQuantity !== 'undefined') {
            genre.bookQuantity = updateGenreDto.bookQuantity;
        }
        if (updateGenreDto.bookNames) {
            genre.bookNames = updateGenreDto.bookNames;
        }

        return this.genreRepository.save(genre, options); // Removed <GenreEntity>
    }
}

@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc> {
        return this.genreRepository.findOneById(_id, options); // Removed <GenreDoc>
    }

    create(
        genreDto: GenreCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<GenreDoc> {
        const entity: GenreEntity = new GenreEntity();
        entity.name = genreDto.name;
        entity.bookQuantity = genreDto.bookQuantity;
        entity.bookNames = genreDto.bookNames;

        return this.genreRepository.create(entity, options); // Removed <GenreEntity>
    }

    async update(
        _id: string,
        updateGenreDto: UpdateGenreDto,
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc> {
        const genre = await this.findOneById(_id);
        if (updateGenreDto.name) {
            genre.name = updateGenreDto.name;
        }
        if (typeof updateGenreDto.bookQuantity !== 'undefined') {
            genre.bookQuantity = updateGenreDto.bookQuantity;
        }
        if (updateGenreDto.bookNames) {
            genre.bookNames = updateGenreDto.bookNames;
        }

        return this.genreRepository.save(genre, options); // Removed <GenreEntity>
    }
}

@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc> {
        return this.genreRepository.findOneById(_id, options); // Removed <GenreDoc>
    }

    create(
        genreDto: GenreCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<GenreDoc> {
        const entity: GenreEntity = new GenreEntity();
        entity.name = genreDto.name;
        entity.bookQuantity = genreDto.bookQuantity;
        entity.bookNames = genreDto.bookNames;

        return this.genreRepository.create(entity, options); // Removed <GenreEntity>
    }

    async update(
        _id: string,
        updateGenreDto: UpdateGenreDto,
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc> {
        const genre = await this.findOneById(_id);
        if (updateGenreDto.name) {
            genre.name = updateGenreDto.name;
        }
        if (typeof updateGenreDto.bookQuantity !== 'undefined') {
            genre.bookQuantity = updateGenreDto.bookQuantity;
        }
        if (updateGenreDto.bookNames) {
            genre.bookNames = updateGenreDto.bookNames;
        }

        return this.genreRepository.save(genre, options); // Removed <GenreEntity>
    }
}

@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc> {
        return this.genreRepository.findOneById(_id, options); // Removed <GenreDoc>
    }

    create(
        genreDto: GenreCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<GenreDoc> {
        const entity: GenreEntity = new GenreEntity();
        entity.name = genreDto.name;
        entity.bookQuantity = genreDto.bookQuantity;
        entity.bookNames = genreDto.bookNames;

        return this.genreRepository.create(entity, options); // Removed <GenreEntity>
    }

    async update(
        _id: string,
        updateGenreDto: UpdateGenreDto,
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc> {
        const genre = await this.findOneById(_id);
        if (updateGenreDto.name) {
            genre.name = updateGenreDto.name;
        }
        if (typeof updateGenreDto.bookQuantity !== 'undefined') {
            genre.bookQuantity = updateGenreDto.bookQuantity;
        }
        if (updateGenreDto.bookNames) {
            genre.bookNames = updateGenreDto.bookNames;
        }

        return this.genreRepository.save(genre, options); // Removed <GenreEntity>
    }
}

@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc> {
        return this.genreRepository.findOneById(_id, options); // Removed <GenreDoc>
    }

    create(
        genreDto: GenreCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<GenreDoc> {
        const entity: GenreEntity = new GenreEntity();
        entity.name = genreDto.name;
        entity.bookQuantity = genreDto.bookQuantity;
        entity.bookNames = genreDto.bookNames;

        return this.genreRepository.create(entity, options); // Removed <GenreEntity>
    }

    async update(
        _id: string,
        updateGenreDto: UpdateGenreDto,
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc> {
        const genre = await this.findOneById(_id);
        if (updateGenreDto.name) {
            genre.name = updateGenreDto.name;
        }
        if (typeof updateGenreDto.bookQuantity !== 'undefined') {
            genre.bookQuantity = updateGenreDto.bookQuantity;
        }
        if (updateGenreDto.bookNames) {
            genre.bookNames = updateGenreDto.bookNames;
        }

        return this.genreRepository.save(genre, options); // Removed <GenreEntity>
    }
}

@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc> {
        return this.genreRepository.findOneById(_id, options); // Removed <GenreDoc>
    }

    create(
        genreDto: GenreCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<GenreDoc> {
        const entity: GenreEntity = new GenreEntity();
        entity.name = genreDto.name;
        entity.bookQuantity = genreDto.bookQuantity;
        entity.bookNames = genreDto.bookNames;

        return this.genreRepository.create(entity, options); // Removed <GenreEntity>
    }

    async update(
        _id: string,
        updateGenreDto: UpdateGenreDto,
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc> {
        const genre = await this.findOneById(_id);
        if (updateGenreDto.name) {
            genre.name = updateGenreDto.name;
        }
        if (typeof updateGenreDto.bookQuantity !== 'undefined') {
            genre.bookQuantity = updateGenreDto.bookQuantity;
        }
        if (updateGenreDto.bookNames) {
            genre.bookNames = updateGenreDto.bookNames;
        }

        return this.genreRepository.save(genre, options); // Removed <GenreEntity>
    }
}

@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc> {
        return this.genreRepository.findOneById(_id, options); // Removed <GenreDoc>
    }

    create(
        genreDto: GenreCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<GenreDoc> {
        const entity: GenreEntity = new GenreEntity();
        entity.name = genreDto.name;
        entity.bookQuantity = genreDto.bookQuantity;
        entity.bookNames = genreDto.bookNames;

        return this.genreRepository.create(entity, options); // Removed <GenreEntity>
    }

    async update(
        _id: string,
        updateGenreDto: UpdateGenreDto,
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc> {
        const genre = await this.findOneById(_id);
        if (updateGenreDto.name) {
            genre.name = updateGenreDto.name;
        }
        if (typeof updateGenreDto.bookQuantity !== 'undefined') {
            genre.bookQuantity = updateGenreDto.bookQuantity;
        }
        if (updateGenreDto.bookNames) {
            genre.bookNames = updateGenreDto.bookNames;
        }

        return this.genreRepository.save(genre, options); // Removed <GenreEntity>
    }
}

@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc> {
        return this.genreRepository.findOneById(_id, options); // Removed <GenreDoc>
    }

    create(
        genreDto: GenreCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<GenreDoc> {
        const entity: GenreEntity = new GenreEntity();
        entity.name = genreDto.name;
        entity.bookQuantity = genreDto.bookQuantity;
        entity.bookNames = genreDto.bookNames;

        return this.genreRepository.create(entity, options); // Removed <GenreEntity>
    }

    async update(
        _id: string,
        updateGenreDto: UpdateGenreDto,
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc> {
        const genre = await this.findOneById(_id);
        if (updateGenreDto.name) {
            genre.name = updateGenreDto.name;
        }
        if (typeof updateGenreDto.bookQuantity !== 'undefined') {
            genre.bookQuantity = updateGenreDto.bookQuantity;
        }
        if (updateGenreDto.bookNames) {
            genre.bookNames = updateGenreDto.bookNames;
        }

        return this.genreRepository.save(genre, options); // Removed <GenreEntity>
    }
}

@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc> {
        return this.genreRepository.findOneById(_id, options); // Removed <GenreDoc>
    }

    create(
        genreDto: GenreCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<GenreDoc> {
        const entity: GenreEntity = new GenreEntity();
        entity.name = genreDto.name;
        entity.bookQuantity = genreDto.bookQuantity;
        entity.bookNames = genreDto.bookNames;

        return this.genreRepository.create(entity, options); // Removed <GenreEntity>
    }

    async update(
        _id: string,
        updateGenreDto: UpdateGenreDto,
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc> {
        const genre = await this.findOneById(_id);
        if (updateGenreDto.name) {
            genre.name = updateGenreDto.name;
        }
        if (typeof updateGenreDto.bookQuantity !== 'undefined') {
            genre.bookQuantity = updateGenreDto.bookQuantity;
        }
        if (updateGenreDto.bookNames) {
            genre.bookNames = updateGenreDto.bookNames;
        }

        return this.genreRepository.save(genre, options); // Removed <GenreEntity>
    }
}

@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc> {
        return this.genreRepository.findOneById(_id, options); // Removed <GenreDoc>
    }

    create(
        genreDto: GenreCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<GenreDoc> {
        const entity: GenreEntity = new GenreEntity();
        entity.name = genreDto.name;
        entity.bookQuantity = genreDto.bookQuantity;
        entity.bookNames = genreDto.bookNames;

        return this.genreRepository.create(entity, options); // Removed <GenreEntity>
    }

    async update(
        _id: string,
        updateGenreDto: UpdateGenreDto,
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc> {
        const genre = await this.findOneById(_id);
        if (updateGenreDto.name) {
            genre.name = updateGenreDto.name;
        }
        if (typeof updateGenreDto.bookQuantity !== 'undefined') {
            genre.bookQuantity = updateGenreDto.bookQuantity;
        }
        if (updateGenreDto.bookNames) {
            genre.bookNames = updateGenreDto.bookNames;
        }

        return this.genreRepository.save(genre, options); // Removed <GenreEntity>
    }
}

@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc> {
        return this.genreRepository.findOneById(_id, options); // Removed <GenreDoc>
    }

    create(
        genreDto: GenreCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<GenreDoc> {
        const entity: GenreEntity = new GenreEntity();
        entity.name = genreDto.name;
        entity.bookQuantity = genreDto.bookQuantity;
        entity.bookNames = genreDto.bookNames;

        return this.genreRepository.create(entity, options); // Removed <GenreEntity>
    }

    async update(
        _id: string,
        updateGenreDto: UpdateGenreDto,
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc> {
        const genre = await this.findOneById(_id);
        if (updateGenreDto.name) {
            genre.name = updateGenreDto.name;
        }
        if (typeof updateGenreDto.bookQuantity !== 'undefined') {
            genre.bookQuantity = updateGenreDto.bookQuantity;
        }
        if (updateGenreDto.bookNames) {
            genre.bookNames = updateGenreDto.bookNames;
        }

        return this.genreRepository.save(genre, options); // Removed <GenreEntity>
    }
}

@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc> {
        return this.genreRepository.findOneById(_id, options); // Removed <GenreDoc>
    }

    create(
        genreDto: GenreCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<GenreDoc> {
        const entity: GenreEntity = new GenreEntity();
        entity.name = genreDto.name;
        entity.bookQuantity = genreDto.bookQuantity;
        entity.bookNames = genreDto.bookNames;

        return this.genreRepository.create(entity, options); // Removed <GenreEntity>
    }

    async update(
        _id: string,
        updateGenreDto: UpdateGenreDto,
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc> {
        const genre = await this.findOneById(_id);
        if (updateGenreDto.name) {
            genre.name = updateGenreDto.name;
        }
        if (typeof updateGenreDto.bookQuantity !== 'undefined') {
            genre.bookQuantity = updateGenreDto.bookQuantity;
        }
        if (updateGenreDto.bookNames) {
            genre.bookNames = updateGenreDto.bookNames;
        }

        return this.genreRepository.save(genre, options); // Removed <GenreEntity>
    }
}

@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc> {
        return this.genreRepository.findOneById(_id, options); // Removed <GenreDoc>
    }

    create(
        genreDto: GenreCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<GenreDoc> {
        const entity: GenreEntity = new GenreEntity();
        entity.name = genreDto.name;
        entity.bookQuantity = genreDto.bookQuantity;
        entity.bookNames = genreDto.bookNames;

        return this.genreRepository.create(entity, options); // Removed <GenreEntity>
    }

    async update(
        _id: string,
        updateGenreDto: UpdateGenreDto,
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc> {
        const genre = await this.findOneById(_id);
        if (updateGenreDto.name) {
            genre.name = updateGenreDto.name;
        }
        if (typeof updateGenreDto.bookQuantity !== 'undefined') {
            genre.bookQuantity = updateGenreDto.bookQuantity;
        }
        if (updateGenreDto.bookNames) {
            genre.bookNames = updateGenreDto.bookNames;
        }

        return this.genreRepository.save(genre, options); // Removed <GenreEntity>
    }
}

@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc> {
        return this.genreRepository.findOneById(_id, options); // Removed <GenreDoc>
    }

    create(
        genreDto: GenreCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<GenreDoc> {
        const entity: GenreEntity = new GenreEntity();
        entity.name = genreDto.name;
        entity.bookQuantity = genreDto.bookQuantity;
        entity.bookNames = genreDto.bookNames;

        return this.genreRepository.create(entity, options); // Removed <GenreEntity>
    }

    async update(
        _id: string,
        updateGenreDto: UpdateGenreDto,
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc> {
        const genre = await this.findOneById(_id);
        if (updateGenreDto.name) {
            genre.name = updateGenreDto.name;
        }
        if (typeof updateGenreDto.bookQuantity !== 'undefined') {
            genre.bookQuantity = updateGenreDto.bookQuantity;
        }
        if (updateGenreDto.bookNames) {
            genre.bookNames = updateGenreDto.bookNames;
        }

        return this.genreRepository.save(genre, options); // Removed <GenreEntity>
    }
}

@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc> {
        return this.genreRepository.findOneById(_id, options); // Removed <GenreDoc>
    }

    create(
        genreDto: GenreCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<GenreDoc> {
        const entity: GenreEntity = new GenreEntity();
        entity.name = genreDto.name;
        entity.bookQuantity = genreDto.bookQuantity;
        entity.bookNames = genreDto.bookNames;

        return this.genreRepository.create(entity, options); // Removed <GenreEntity>
    }

    async update(
        _id: string,
        updateGenreDto: UpdateGenreDto,
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc> {
        const genre = await this.findOneById(_id);
        if (updateGenreDto.name) {
            genre.name = updateGenreDto.name;
        }
        if (typeof updateGenreDto.bookQuantity !== 'undefined') {
            genre.bookQuantity = updateGenreDto.bookQuantity;
        }
        if (updateGenreDto.bookNames) {
            genre.bookNames = updateGenreDto.bookNames;
        }

        return this.genreRepository.save(genre, options); // Removed <GenreEntity>
    }
}

@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc> {
        return this.genreRepository.findOneById(_id, options); // Removed <GenreDoc>
    }

    create(
        genreDto: GenreCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<GenreDoc> {
        const entity: GenreEntity = new GenreEntity();
        entity.name = genreDto.name;
        entity.bookQuantity = genreDto.bookQuantity;
        entity.bookNames = genreDto.bookNames;

        return this.genreRepository.create(entity, options); // Removed <GenreEntity>
    }

    async update(
        _id: string,
        updateGenreDto: UpdateGenreDto,
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc> {
        const genre = await this.findOneById(_id);
        if (updateGenreDto.name) {
            genre.name = updateGenreDto.name;
        }
        if (typeof updateGenreDto.bookQuantity !== 'undefined') {
            genre.bookQuantity = updateGenreDto.bookQuantity;
        }
        if (updateGenreDto.bookNames) {
            genre.bookNames = updateGenreDto.bookNames;
        }

        return this.genreRepository.save(genre, options); // Removed <GenreEntity>
    }
}

@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc> {
        return this.genreRepository.findOneById(_id, options); // Removed <GenreDoc>
    }

    create(
        genreDto: GenreCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<GenreDoc> {
        const entity: GenreEntity = new GenreEntity();
        entity.name = genreDto.name;
        entity.bookQuantity = genreDto.bookQuantity;
        entity.bookNames = genreDto.bookNames;

        return this.genreRepository.create(entity, options); // Removed <GenreEntity>
    }

    async update(
        _id: string,
        updateGenreDto: UpdateGenreDto,
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc> {
        const genre = await this.findOneById(_id);
        if (updateGenreDto.name) {
            genre.name = updateGenreDto.name;
        }
        if (typeof updateGenreDto.bookQuantity !== 'undefined') {
            genre.bookQuantity = updateGenreDto.bookQuantity;
        }
        if (updateGenreDto.bookNames) {
            genre.bookNames = updateGenreDto.bookNames;
        }

        return this.genreRepository.save(genre, options); // Removed <GenreEntity>
    }
}

@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc> {
        return this.genreRepository.findOneById(_id, options); // Removed <GenreDoc>
    }

    create(
        genreDto: GenreCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<GenreDoc> {
        const entity: GenreEntity = new GenreEntity();
        entity.name = genreDto.name;
        entity.bookQuantity = genreDto.bookQuantity;
        entity.bookNames = genreDto.bookNames;

        return this.genreRepository.create(entity, options); // Removed <GenreEntity>
    }

    async update(
        _id: string,
        updateGenreDto: UpdateGenreDto,
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc> {
        const genre = await this.findOneById(_id);
        if (updateGenreDto.name) {
            genre.name = updateGenreDto.name;
        }
        if (typeof updateGenreDto.bookQuantity !== 'undefined') {
            genre.bookQuantity = updateGenreDto.bookQuantity;
        }
        if (updateGenreDto.bookNames) {
            genre.bookNames = updateGenreDto.bookNames;
        }

        return this.genreRepository.save(genre, options); // Removed <GenreEntity>
    }
}

@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc> {
        return this.genreRepository.findOneById(_id, options); // Removed <GenreDoc>
    }

    create(
        genreDto: GenreCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<GenreDoc> {
        const entity: GenreEntity = new GenreEntity();
        entity.name = genreDto.name;
        entity.bookQuantity = genreDto.bookQuantity;
        entity.bookNames = genreDto.bookNames;

        return this.genreRepository.create(entity, options); // Removed <GenreEntity>
    }

    async update(
        _id: string,
        updateGenreDto: UpdateGenreDto,
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc> {
        const genre = await this.findOneById(_id);
        if (updateGenreDto.name) {
            genre.name = updateGenreDto.name;
        }
        if (typeof updateGenreDto.bookQuantity !== 'undefined') {
            genre.bookQuantity = updateGenreDto.bookQuantity;
        }
        if (updateGenreDto.bookNames) {
            genre.bookNames = updateGenreDto.bookNames;
        }

        return this.genreRepository.save(genre, options); // Removed <GenreEntity>
    }
}

@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<GenreDoc> {
        return this.genreRepository.findOneById(_id, options); // Removed <GenreDoc>
    }

    create(
        genreDto: GenreCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<GenreDoc> {
        const entity: GenreEntity = new GenreEntity();
        entity.name = genreDto.name;
        entity.bookQuantity = genreDto.bookQuantity;
        entity.bookNames = genreDto.bookNames;

        return this.genreRepository.create(entity, options); // Removed <GenreEntity>
    }

    async update(
        _id: string,
        updateGenreDto: UpdateGenreDto,
        options?: IDatabaseSaveOptions
    ): Promise<GenreDoc> {
        const genre = await this.findOneById(_id);
        if (updateGenreDto.name) {
            genre.name = updateGenreDto.name;
        }
        if (typeof updateGenreDto.bookQuantity !== 'undefined') {
            genre.bookQuantity = updateGenreDto.bookQuantity;
        }
        if (updateGenreDto.bookNames) {
            genre.bookNames = updateGenreDto.bookNames;
        }

        return this.genreRepository.save(genre, options); // Removed <GenreEntity>
    }
}
