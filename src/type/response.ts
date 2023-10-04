export type IResponse<T> = {
    data?: T;
    _metadata?: Record<string, any>;
};
