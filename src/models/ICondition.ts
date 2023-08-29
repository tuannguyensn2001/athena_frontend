import type {IOperator} from "~/models/IOperator";

export declare interface ICondition {
    id: number;
    name: string;
    target_object_id: number;
    key: string;
    description: string;
    operators: IOperator[]
}

