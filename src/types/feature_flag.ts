export interface TargetGroupForm {
    name: string;
    target_object_id: number;
    description?: string;
    conditions: {
        condition_id: number;
        operator_id: number;
        value?: string | undefined;
        name: string
    }[] | undefined;
}

export type TargetGroupFormAction = 'create' | 'edit'