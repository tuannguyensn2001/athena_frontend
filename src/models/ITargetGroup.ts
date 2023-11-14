import type { ITargetType } from '~/models/ITargetType';

export declare interface ITargetGroup {
    id: number;
    name: string;
    target_type: ITargetType;
    description: string;
    conditions: {
        operator: 'and' | 'or';
        list: {
            field: string | null;
            operator: string | null;
            value: string | null;
        }[];
    };
    created_at: unknown;
    updated_at: unknown;
}
