import type {ITargetType} from "~/models/ITargetType";

export type DataType = 'integer' | 'string' | 'boolean'

export declare interface ICustomAttribute {
    id: number;
    name: string;
    target_type: ITargetType
    data_type: DataType
    description?: string;
    visible: boolean
}
