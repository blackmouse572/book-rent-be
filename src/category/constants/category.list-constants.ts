// src/category/constants/category.constants.ts

import { ENUM_PAGINATION_ORDER_DIRECTION_TYPE } from 'src/common/pagination/constants/pagination.enum.constant';

export enum CATEGORY_STATUS_ENUM {
    ENABLE = 'enable',
    DISABLE = 'disable',
}

export const CATEGORY_PAGINATION_DEFAULT_LIMIT = 20;
export const CATEGORY_PAGINATION_DEFAULT_SORT_FIELD = 'name';
export const CATEGORY_PAGINATION_DEFAULT_SORT_DIRECTION =
    ENUM_PAGINATION_ORDER_DIRECTION_TYPE.ASC;
export const CATEGORY_PAGINATION_ALLOWED_SORT_FIELDS = ['name', 'description'];
export const CATEGORY_DEFAULT_STATUS = Object.values(CATEGORY_STATUS_ENUM);
