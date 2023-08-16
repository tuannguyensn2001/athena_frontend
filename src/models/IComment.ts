import type { IUser } from '~/models/IUser';

export declare interface IComment {
    id: number;
    content: number;
    user_id: number;
    post_id: number;
    created_at: number;
    updated_at: number;
    user?: IUser;
}
