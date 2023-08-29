import {Form, Input, Modal, Select} from "antd";
import type {TargetGroupForm, TargetGroupFormAction} from "~/types/feature_flag";
import {Controller, useFormContext, useWatch} from "react-hook-form";
import {useQuery} from "react-query";
import type {ApiError, AppResponse} from "~/types/app";
import type {ITargetObject} from "~/models/ITargetObject";
import {ApiFeatureFlag} from "~/config/network";
import {FieldArrayCondition} from "~/components/feature_flag/FieldArrayCondition";
import {useEffect} from "react";

interface Prop {
    isOpen: boolean;
    onClose: () => void;
    action: TargetGroupFormAction
    onOk: (data: TargetGroupForm) => void;
}

export function ModalTargetGroup({isOpen, onClose, action, onOk}: Prop) {

    const {control, handleSubmit, reset} = useFormContext<TargetGroupForm>();

    const {data} = useQuery<AppResponse<ITargetObject[]>, ApiError>({
        queryKey: 'target_object',
        queryFn: async () => {
            const response = await ApiFeatureFlag.get("/api/v1/target_object");
            return response.data;
        },
        staleTime: Infinity,
        cacheTime: Infinity,
    })


    return (
        <Modal
            width={750}
            onOk={handleSubmit(onOk)}
            destroyOnClose
            title={action === 'create' ? 'Create Target Group' : 'Edit Target Group'}
            open={isOpen}
            onCancel={onClose}
        >
            <Form layout={'vertical'}>
                <Controller
                    control={control}
                    name={'name'}
                    render={({field, fieldState: {error, invalid}}) => (
                        <Form.Item name={'name'} label={'Name'} validateStatus={invalid ? 'error' : 'success'}
                                   help={error?.message}>
                            <Input id={'name'}  {...field}/>
                        </Form.Item>
                    )}
                />

                <Controller
                    control={control}
                    name={'target_object_id'}
                    render={({field, fieldState: {error, invalid}}) => (
                        <Form.Item name={'target_object'} label={'Target Object'}
                                   validateStatus={invalid ? 'error' : 'success'}
                                   help={error?.message}>
                            <Select placeholder={'Select Target Object'} id={'target_object'} {...field}
                                    options={data?.data?.map(item => ({
                                        label: item.name,
                                        value: item.id
                                    }))}/>
                        </Form.Item>
                    )}
                />

                <Controller
                    control={control}
                    name={'description'}
                    render={({field, fieldState: {error, invalid}}) => (
                        <Form.Item name={'description'} label={'Description'}
                                   validateStatus={invalid ? 'error' : 'success'}
                                   help={error?.message}>
                            <Input id={'description'}  {...field}/>
                        </Form.Item>
                    )}
                />

                <FieldArrayCondition/>
            </Form>


        </Modal>
    )
}