import { BOOK_STATUS_ENUM } from 'src/book/constants/book.enum.constants';
import { ENUM_PAGINATION_ORDER_DIRECTION_TYPE } from 'src/common/pagination/constants/pagination.enum.constant';

export const BOOK_DEFAULT_PER_PAGE = 20;
export const BOOK_DEFAULT_ORDER_BY = 'createdAt';
export const BOOK_DEFAULT_ORDER_DIRECTION =
    ENUM_PAGINATION_ORDER_DIRECTION_TYPE.ASC;
export const BOOK_DEFAULT_AVAILABLE_ORDER_BY = [
    'name',
    'rental_price',
    'createdAt',
];
export const BOOK_DEFAULT_AVAILABLE_SEARCH = ['keyword', 'name'];
export const BOOK_DEFAULT_STATUS = BOOK_STATUS_ENUM.ENABLE;
