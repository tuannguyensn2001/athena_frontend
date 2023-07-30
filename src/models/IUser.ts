import { IProfile } from '~/models/IProfile';
import { Role } from '~/types/role';

export declare interface IUser {
    id: number;
    phone: string;
    password: string;
    email: string;
    role: Role;
    profile?: IProfile;
}
