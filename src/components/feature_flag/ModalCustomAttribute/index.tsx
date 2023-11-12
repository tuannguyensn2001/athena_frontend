import {yupResolver} from '@hookform/resolvers/yup';
import type {ModalProps} from "antd";
import {Form, Input, Modal, notification, Select} from "antd";
import type {AxiosError} from "axios";
import {Controller, useForm} from "react-hook-form";
import {useMutation} from "react-query";
import * as yup from 'yup';
import API from "~/config/network";
import type {DataType, ICustomAttribute} from "~/models/ICustomAttribute";
import type {ITargetType} from "~/models/ITargetType";
import type {AppResponse} from "~/types/app";


type Props = {
    open: boolean;
    onToggle: () => void
}

type FormType = Pick<ICustomAttribute, 'name' | 'target_type' | 'data_type' | 'description'>

const schema = yup.object({
    name: yup.string().required('Name is required'),
    target_type: yup.mixed<ITargetType>().required(),
    data_type: yup.mixed<DataType>().required(),
    description: yup.string()
})

export function ModalCustomAttribute(props: Props) {

    const {control, handleSubmit} = useForm<FormType>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            target_type: 'workshop',
            data_type: 'string'
        }
    })

    const [api, contextHolder] = notification.useNotification();

    const {mutate} = useMutation<AppResponse, AxiosError, FormType>({
        mutationKey: 'createCustomAttribute',
        mutationFn: async (data) => {
            const response = await API.post('/api/v1/feature_flag/custom_attribute', data);
            return response.data
        },
        onSuccess: () => {
            api.success({
                message: 'Success',
                description: 'Create custom attribute successfully'
            })

            props.onToggle()

        },
        onError: () => {

            api.error({
                message: 'Failed',
                description: 'Create custom attribute failed'
            })
        }
    })

    const submit = (data: FormType) => {
        mutate(data)
    }

    return (
        <Modal onOk={handleSubmit(submit)} open={props.open} onCancel={props.onToggle}
               title={'Create new custom attribute'}>
            {contextHolder}
            <Form layout={'vertical'}>
                <Controller
                    control={control}
                    name={'name'}
                    render={({field, fieldState: {error, invalid}}) => (
                        <Form.Item label={'Name'} validateStatus={invalid ? 'error' : 'success'} help={error?.message}>
                            <Input {...field} />
                        </Form.Item>
                    )}
                />

                <Controller
                    control={control}
                    name={'description'}
                    render={({field, fieldState: {error, invalid}}) => (
                        <Form.Item label={'Description'} validateStatus={invalid ? 'error' : 'success'}
                                   help={error?.message}>
                            <Input {...field} />
                        </Form.Item>
                    )}
                />

                <Controller
                    control={control}
                    name={'target_type'}
                    render={({field, fieldState: {error, invalid}}) => (
                        <Form.Item label={'Target type'} validateStatus={invalid ? 'error' : 'success'}
                                   help={error?.message}>
                            <Select {...field} options={[
                                {
                                    label: 'Workshop',
                                    value: 'workshop'
                                },
                                {
                                    label: 'User',
                                    value: 'user'
                                },
                                {
                                    label: 'Member',
                                    value: 'member'
                                }
                            ]}/>
                        </Form.Item>
                    )}
                />

                <Controller
                    control={control}
                    name={'data_type'}
                    render={({field, fieldState: {error, invalid}}) => (
                        <Form.Item label={'Target type'} validateStatus={invalid ? 'error' : 'success'}
                                   help={error?.message}>
                            <Select {...field} options={[
                                {
                                    label: 'String',
                                    value: 'string'
                                },
                                {
                                    label: 'Integer',
                                    value: 'integer'
                                },
                                {
                                    label: 'Boolean',
                                    value: 'boolean'
                                }
                            ]}/>
                        </Form.Item>
                    )}
                />
            </Form>
        </Modal>
    )
}
