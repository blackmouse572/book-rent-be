import { CategoryCreateDto } from 'src/category/dtos/create-category.dto';
import { CategoryUpdateDto } from 'src/category/dtos/update-category.dto';
import { CategoryDoc } from 'src/category/repository/category.entity';
import {
    IDatabaseCreateOptions,
    IDatabaseFindOneOptions,
    IDatabaseSaveOptions,
} from 'src/common/database/interfaces/database.interface';

export interface ICategoryService {
    findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<CategoryDoc>;

    create(
        categoryCreateDto: CategoryCreateDto,
        options?: IDatabaseCreateOptions
    ): Promise<CategoryDoc>;

    update(
        _id: string,
        categoryUpdateDto: CategoryUpdateDto,
        options?: IDatabaseSaveOptions
    ): Promise<CategoryDoc>;
}
