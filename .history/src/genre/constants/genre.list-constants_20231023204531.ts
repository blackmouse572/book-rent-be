import { ENUM_PAGINATION_ORDER_DIRECTION_TYPE } from 'src/common/pagination/constants/pagination.enum.constant';

export const GENRE_DEFAULT_PER_PAGE = 20;
export const GENRE_DEFAULT_ORDER_BY = 'createdAt';
export const GENRE_DEFAULT_ORDER_DIRECTION = ENUM_PAGINATION_ORDER_DIRECTION_TYPE.ASC;
export const GENRE_DEFAULT_AVAILABLE_ORDER_BY = [
    'name',
    'createdAt',
    'bookQuantity'
];
export const GENRE_DEFAULT_AVAILABLE_SEARCH = ['name', 'bookNames'];
