export declare interface IOperator {
    id: number;
    name: string;
    has_value: boolean;
    target: 'target_group' | 'feature_flag';
    key: string;

}