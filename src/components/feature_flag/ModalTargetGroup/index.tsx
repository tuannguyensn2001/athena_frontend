import { DeleteOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    Button,
    Divider,
    Form,
    Input,
    Modal,
    notification,
    Select,
} from 'antd';
import type { AxiosError } from 'axios';
import clsx from 'clsx';
import get from 'lodash/get';
import { useEffect, useMemo } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { ref } from 'yup';
import * as yup from 'yup';
import API from '~/config/network';
import { Operator } from '~/define/operator';
import useGetCustomAttribute from '~/hooks/useGetCustomAttribute';
import type { ITargetGroup } from '~/models/ITargetGroup';
import type { ITargetType } from '~/models/ITargetType';
import type { AppResponse } from '~/types/app';
import type { ModalFeatureFlag } from '~/types/feature_flag';

type Props = ModalFeatureFlag & {
    selectedTargetGroup: number | null;
};

type FormType = Pick<ITargetGroup, 'name' | 'target_type' | 'conditions'>;

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    target_type: yup.mixed<ITargetType>().required(),
    conditions: yup.object().shape({
        operator: yup.mixed<'and' | 'or'>().required(),
        list: yup
            .array()
            .required()
            .of(
                yup.object().shape({
                    field: yup.string().nullable(),
                    operator: yup.string().nullable(),
                    value: yup.string().nullable(),
                }),
            ),
    }),
});

export function ModalTargetGroup({
    open,
    onToggle,
    selectedTargetGroup,
}: Props) {
    const { control, handleSubmit, watch, reset, setValue } = useForm<FormType>(
        {
            defaultValues: {
                name: '',
                target_type: 'workshop',
                conditions: {
                    operator: 'and',
                    list: [],
                },
            },
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            resolver: yupResolver(schema),
        },
    );
    const { fields, append, remove } = useFieldArray({
        control: control,
        name: 'conditions.list',
    });
    const { data: attributesResponse } = useGetCustomAttribute({
        target_type: watch('target_type'),
    });
    const attributes = useMemo(
        () =>
            get(attributesResponse, 'data', []).map((item) => ({
                label: item.name,
                value: item.name,
            })),
        [attributesResponse],
    );
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        fields.forEach((_, index) => {
            setValue(`conditions.list.${index}.field`, null);
            setValue(`conditions.list.${index}.operator`, null);
        });
    }, [watch('target_type')]);

    const { mutate } = useMutation<AppResponse, AxiosError, FormType>({
        mutationKey: 'createTargetGroup',
        mutationFn: async (data) => {
            const response = await API.post(
                '/api/v1/feature_flag/target_groups',
                data,
            );
            return response.data;
        },
        onSuccess() {
            api.success({
                message: 'Success',
                description: 'Create target group successfully',
            });
            onToggle();
        },
        onError() {
            api.error({
                message: 'Failed',
                description: 'Create target group failed',
            });
        },
    });

    const canEdit = useMemo(() => !!selectedTargetGroup, [selectedTargetGroup]);

    const { mutate: mutateEdit } = useMutation<
        AppResponse,
        AxiosError,
        FormType
    >({
        mutationKey: 'updateTargetGroup',
        mutationFn: async (data) => {
            const response = await API.put(
                `/api/v1/feature_flag/target_groups/${selectedTargetGroup}`,
                data,
            );
            return response.data;
        },
        onSuccess() {
            api.success({
                message: 'Success',
                description: 'Update target group successfully',
            });
            onToggle();
        },
        onError() {
            api.error({
                message: 'Failed',
                description: 'Update target group failed',
            });
        },
    });

    const { refetch } = useQuery<AppResponse<ITargetGroup>, AxiosError>({
        queryKey: ['target_group', selectedTargetGroup],
        queryFn: async () => {
            const response = await API.get(
                `/api/v1/feature_flag/target_groups/${selectedTargetGroup}`,
            );
            return response.data;
        },
        enabled: selectedTargetGroup !== null,
        onSuccess(data) {
            reset({
                name: data.data.name,
                target_type: data.data.target_type,
                conditions: data.data.conditions,
            });
        },
    });

    useEffect(() => {
        if (!!selectedTargetGroup && open) {
            refetch();
        }
        reset({
            name: '',
            target_type: 'workshop',
            conditions: {
                operator: 'and',
                list: [],
            },
        });
    }, [open]);

    const getOperator = (index: number) => {
        const field = watch(`conditions.list.${index}.field`);
        if (!field) return { operators: [], hasValue: false };
        const attribute = get(attributesResponse, 'data', []).find(
            (item) => item.name === field,
        );
        if (!attribute) return { operators: [], hasValue: false };
        return Operator[attribute.data_type];
    };

    const submit = (data: FormType) =>
        canEdit ? mutateEdit(data) : mutate(data);

    const handleAddField = () => {
        append({
            field: null,
            operator: null,
            value: '',
        });
    };

    const handleRemoveField = (index: number) => remove(index);

    return (
        <div>
            {contextHolder}
            <Modal
                centered
                width={1000}
                onOk={handleSubmit(submit)}
                title={'Target Group'}
                open={open}
                onCancel={onToggle}
            >
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
                        control={control}
                        name={'conditions.operator'}
                        render={({ field, fieldState: { error, invalid } }) => (
                            <Form.Item
                                label={'Operator'}
                                validateStatus={invalid ? 'error' : 'success'}
                                help={error?.message}
                            >
                                <Select
                                    {...field}
                                    options={[
                                        {
                                            label: 'All conditions match',
                                            value: 'and',
                                        },
                                        {
                                            label: 'Any conditions match',
                                            value: 'or',
                                        },
                                    ]}
                                />
                            </Form.Item>
                        )}
                    />

                    <Button onClick={handleAddField}>Add field</Button>

                    <div>
                        {fields.map((item, index) => (
                            <div className={'tw-w-full'} key={item.id}>
                                <Divider />
                                <div className="tw-flex tw-justify-end">
                                    <Button
                                        onClick={() => handleRemoveField(index)}
                                        icon={<DeleteOutlined />}
                                    ></Button>
                                </div>
                                <div
                                    className={clsx({
                                        'tw-grid tw-gap-6': true,
                                        ' tw-grid-cols-2':
                                            !getOperator(index).hasValue,
                                        'tw-grid-cols-3':
                                            getOperator(index).hasValue,
                                    })}
                                >
                                    <Controller
                                        control={control}
                                        name={`conditions.list.${index}.field`}
                                        render={({ field }) => (
                                            <Form.Item label={'Field'}>
                                                <Select
                                                    placeholder={'Select field'}
                                                    options={attributes}
                                                    {...field}
                                                />
                                            </Form.Item>
                                        )}
                                    />
                                    <Controller
                                        control={control}
                                        name={`conditions.list.${index}.operator`}
                                        render={({ field }) => (
                                            <Form.Item label={'Operator'}>
                                                <Select
                                                    placeholder={'Select field'}
                                                    options={
                                                        getOperator(index)
                                                            .operators
                                                    }
                                                    {...field}
                                                />
                                            </Form.Item>
                                        )}
                                    />

                                    {getOperator(index).hasValue && (
                                        <Controller
                                            control={control}
                                            name={`conditions.list.${index}.value`}
                                            render={({ field }) => (
                                                <Form.Item label={'Value'}>
                                                    <Input
                                                        placeholder={'Value'}
                                                        {...field}
                                                        value={
                                                            field.value || ''
                                                        }
                                                    />
                                                </Form.Item>
                                            )}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </Form>
            </Modal>
        </div>
    );
}
