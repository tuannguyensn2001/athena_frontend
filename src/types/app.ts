import { AxiosError, AxiosResponse } from 'axios';

export type AppResponse<T = unknown> = {
    message: string;
    data: T;
};

export type ApiResponse<T = unknown> = AxiosResponse<AppResponse<T>>;
export type ApiError = AxiosError<AppResponse>;
