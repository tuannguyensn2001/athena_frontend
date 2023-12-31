import type { AxiosError, AxiosResponse } from 'axios';

export type AppResponse<T = unknown> = {
    message: string;
    data: T;
    meta: {
        total: number;
        page: number;
        next_cursor: number | string;
    };
};

export type ApiResponse<T = unknown> = AxiosResponse<AppResponse<T>>;
export type ApiError = AxiosError<AppResponse>;
