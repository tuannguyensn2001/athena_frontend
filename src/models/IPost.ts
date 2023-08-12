import type { IComment } from '~/models/IComment';
import type { IUser } from '~/models/IUser';
import type { IWorkshop } from '~/models/IWorkshop';

export declare interface IPost {
    id: number;
    content: string;
    user_id: number;
    workshop_id: number;
    pinned_at: number;
    created_at: number;
    updated_at: number;
    user?: IUser;
    workshop?: IWorkshop;
    comments: IComment[];
}
