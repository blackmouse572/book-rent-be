import { Injectable } from '@nestjs/common';
import { CATEGORY_STATUS_ENUM } from 'src/category/constants/category.enum.constants';
import { CategoryCreateDto } from 'src/category/dtos/create-category.dto';
import {
    CategoryDoc,
    CategoryEntity,
} from 'src/category/repository/category.entity';
import { CategoryRepository } from 'src/category/repository/category.repository';
import {
    IDatabaseCreateOptions,
    IDatabaseFindOneOptions,
} from 'src/common/database/interfaces/database.interface';

@Injectable()
export class CategoryService {
    constructor(private readonly categoryRepository: CategoryRepository) {}

    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<CategoryDoc> {
        return this.categoryRepository.findOneById<CategoryDoc>(_id, options);
    }
    create(
        categoryCreateDto: CategoryCreateDto,
        options?: IDatabaseCreateOptions<any>
    ): Promise<CategoryDoc> {
        const entity: CategoryEntity = new CategoryEntity();
        entity.name = categoryCreateDto.name;
        entity.description = categoryCreateDto.description;
        entity.status = CATEGORY_STATUS_ENUM.ENABLE;

        return this.categoryRepository.create<CategoryEntity>(entity, options);
    }
}
