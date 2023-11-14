import { yupResolver } from '@hookform/resolvers/yup';
import type { ModalProps } from 'antd';
import { Form, Input, Modal, notification, Select } from 'antd';
import type { AxiosError } from 'axios';
import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import * as yup from 'yup';
import API from '~/config/network';
import type { DataType, ICustomAttribute } from '~/models/ICustomAttribute';
import type { ITargetType } from '~/models/ITargetType';
import type { AppResponse } from '~/types/app';

type Props = {
    open: boolean;
    onToggle: () => void;
    selectedAttribute: number | null;
};

type FormType = Pick<
    ICustomAttribute,
    'name' | 'target_type' | 'data_type' | 'description'
>;

const schema = yup.object({
    name: yup.string().required('Name is required'),
    target_type: yup.mixed<ITargetType>().required(),
    data_type: yup.mixed<DataType>().required(),
    description: yup.string(),
});

export function ModalCustomAttribute(props: Props) {
    const { control, handleSubmit, reset } = useForm<FormType>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            target_type: 'workshop',
            data_type: 'string',
            description: '',
        },
    });

    useEffect(() => {
        reset({
            name: '',
            target_type: 'workshop',
            data_type: 'string',
            description: '',
        });
    }, [props.open]);

    const canEdit = useMemo(
        () => !!props.selectedAttribute,
        [props.selectedAttribute],
    );

    const [api, contextHolder] = notification.useNotification();

    const { mutate, isLoading: isLoadingCreate } = useMutation<
        AppResponse,
        AxiosError,
        FormType
    >({
        mutationKey: 'createCustomAttribute',
        mutationFn: async (data) => {
            const response = await API.post(
                '/api/v1/feature_flag/custom_attribute',
                data,
            );
            return response.data;
        },
        onSuccess: () => {
            api.success({
                message: 'Success',
                description: 'Create custom attribute successfully',
            });

            props.onToggle();
        },
        onError: () => {
            api.error({
                message: 'Failed',
                description: 'Create custom attribute failed',
            });
        },
    });

    const { mutate: mutateUpdate, isLoading: isLoadingUpdate } = useMutation<
        AppResponse,
        AxiosError,
        FormType
    >({
        mutationKey: 'updateCustomAttribute',
        mutationFn: async (data) => {
            const response = await API.put(
                `/api/v1/feature_flag/custom_attribute/${props.selectedAttribute}`,
                data,
            );
            return response.data;
        },
        onSuccess: () => {
            api.success({
                message: 'Success',
                description: 'Update custom attribute successfully',
            });

            props.onToggle();
        },
        onError: () => {
            api.error({
                message: 'Failed',
                description: 'Update custom attribute failed',
            });
        },
    });

    useQuery<AppResponse<ICustomAttribute>, AxiosError>({
        queryKey: ['attribute', props.selectedAttribute],
        queryFn: async () => {
            const response = await API.get(
                `/api/v1/feature_flag/custom_attribute/${props.selectedAttribute}`,
            );
            return response.data;
        },
        enabled: !!props.selectedAttribute,
        onSuccess(data) {
            reset({
                name: data.data.name,
                target_type: data.data.target_type,
                data_type: data.data.data_type,
                description: data.data.description,
            });
        },
    });

    const submit = (data: FormType) => {
        if (canEdit) mutateUpdate(data);
        else mutate(data);
    };

    return (
        <Modal
            confirmLoading={isLoadingCreate || isLoadingUpdate}
            onOk={handleSubmit(submit)}
            open={props.open}
            onCancel={props.onToggle}
            title={'Create new custom attribute'}
        >
            {contextHolder}
            <Form layout={'vertical'}>
                <Controller
                    disabled={canEdit}
                    control={control}
                    name={'name'}
                    render={({ field, fieldState: { error, invalid } }) => (
                        <Form.Item
                            label={'Name'}
                            validateStatus={invalid ? 'error' : 'success'}
                            help={error?.message}
                        >
                            <Input {...field} />
                        </Form.Item>
                    )}
                />

                <Controller
                    control={control}
                    name={'description'}
                    render={({ field, fieldState: { error, invalid } }) => (
                        <Form.Item
                            label={'Description'}
                            validateStatus={invalid ? 'error' : 'success'}
                            help={error?.message}
                        >
                            <Input {...field} />
                        </Form.Item>
                    )}
                />

                <Controller
                    disabled={canEdit}
                    control={control}
                    name={'target_type'}
                    render={({ field, fieldState: { error, invalid } }) => (
                        <Form.Item
                            label={'Target type'}
                            validateStatus={invalid ? 'error' : 'success'}
                            help={error?.message}
                        >
                            <Select
                                {...field}
                                options={[
                                    {
                                        label: 'Workshop',
                                        value: 'workshop',
                                    },
                                    {
                                        label: 'User',
                                        value: 'user',
                                    },
                                    {
                                        label: 'Member',
                                        value: 'member',
                                    },
                                ]}
                            />
                        </Form.Item>
                    )}
                />

                <Controller
                    disabled={canEdit}
                    control={control}
                    name={'data_type'}
                    render={({ field, fieldState: { error, invalid } }) => (
                        <Form.Item
                            label={'Data type'}
                            validateStatus={invalid ? 'error' : 'success'}
                            help={error?.message}
                        >
                            <Select
                                {...field}
                                options={[
                                    {
                                        label: 'String',
                                        value: 'string',
                                    },
                                    {
                                        label: 'Integer',
                                        value: 'integer',
                                    },
                                    {
                                        label: 'Boolean',
                                        value: 'boolean',
                                    },
                                ]}
                            />
                        </Form.Item>
                    )}
                />
            </Form>
        </Modal>
    );
}
