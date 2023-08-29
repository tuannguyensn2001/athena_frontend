import {Controller, useFieldArray, useFormContext, useWatch} from "react-hook-form";
import {Button, Form, Input, Select} from "antd";
import type {TargetGroupForm} from "~/types/feature_flag";
import {useQuery} from "react-query";
import type {ApiError, AppResponse} from "~/types/app";
import type {ICondition} from "~/models/ICondition";
import {ApiFeatureFlag} from "~/config/network";
import type {IOperator} from "~/models/IOperator";

interface Prop {
    index: number;
    id: string;
    onRemove: (index: number) => void;
}

export function FieldArrayConditionItem({index, onRemove, id: _id}: Prop) {

    const {control, watch} = useFormContext<TargetGroupForm>();

    const targetObjectId = useWatch({
        control,
        name: 'target_object_id'
    })
    const conditionId = watch(`conditions.${index}.condition_id`);

    const {data} = useQuery<AppResponse<ICondition[]>, ApiError>({
        queryKey: ['conditions', targetObjectId],
        queryFn: async () => {
            const response = await ApiFeatureFlag.get(`/api/v1/conditions/target_object/${targetObjectId}`);
            return response.data;
        },
        staleTime: Infinity,
        enabled: !!targetObjectId
    });

    const {data: dataOperators} = useQuery<AppResponse<IOperator[]>, ApiError>({
        queryKey: ['operators', conditionId],
        queryFn: async () => {
            const response = await ApiFeatureFlag.get(`/api/v1/operators/condition/${conditionId}`);
            return response.data;
        },
        staleTime: Infinity,
        enabled: !!conditionId
    })

    const handleRemove = () => {
        onRemove(index)
    }


    return (
        <div className={'tw-grid tw-grid-cols-2 tw-gap-4 '}>
            <Button onClick={handleRemove}>Delete</Button>
            <Controller
                control={control}
                name={`conditions.${index}.name`}
                render={({field, fieldState: {error, invalid}}) => (
                    <Form.Item label={'Name'}
                               validateStatus={invalid ? 'error' : 'success'}
                               help={error?.message}>
                        <Input {...field} />
                    </Form.Item>
                )}
            />
            <Controller
                control={control}
                name={`conditions.${index}.condition_id`}
                render={({field, fieldState: {error, invalid}}) => (
                    <Form.Item label={'Condition'} validateStatus={invalid ? 'error' : 'success'}
                               help={error?.message}>
                        <Select placeholder={'Select condition'} {...field}
                                value={field.value === 0 ? undefined : field.value}
                                options={data?.data?.map(item => ({
                                    label: item.name,
                                    value: item.id
                                }))}/>
                    </Form.Item>
                )}
            />
            <Controller
                control={control}
                name={`conditions.${index}.operator_id`}
                render={({field, fieldState: {error, invalid}}) => (
                    <Form.Item label={'Operator'} validateStatus={invalid ? 'error' : 'success'}
                               help={error?.message}>
                        <Select {...field}
                                placeholder={'Select operator'}
                                value={field.value === 0 ? undefined : field.value}
                                options={dataOperators?.data?.map(item => ({
                                    label: item.name,
                                    value: item.id
                                }))}/>
                    </Form.Item>
                )}
            />
        </div>
    )
}