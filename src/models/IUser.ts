import type { IProfile } from '~/models/IProfile';
import type { Role } from '~/types/role';

export declare interface IUser {
    id: number;
    phone: string;
    password: string;
    email: string;
    role: Role;
    profile?: IProfile;
}
