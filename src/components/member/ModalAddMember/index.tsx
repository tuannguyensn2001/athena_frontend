import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Input, message, Modal, Typography } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import API from '~/config/network';
import { useWorkshop } from '~/hooks/useWorkshop';
import type { IUser } from '~/models/IUser';
import * as yup from 'yup';
import type { ApiError, AppResponse } from '~/types/app';

interface Prop {
    isOpen: boolean;
    handleClose: () => void;
}

type FormType = Pick<IUser, 'phone'>;

const schema = yup.object().shape({
    phone: yup.string().required('Số điện thoại không được để trống'),
});

export function ModalAddMember({ isOpen, handleClose }: Prop) {
    const { handleSubmit, control } = useForm<FormType>({
        defaultValues: {
            phone: '',
        },
        resolver: yupResolver(schema),
    });

    const { workshop } = useWorkshop();

    const { mutate } = useMutation<AppResponse, ApiError, FormType>({
        mutationKey: 'addMember',
        mutationFn: async (data) => {
            const response = await API.post('/api/v1/members/students', {
                ...data,
                workshop_id: workshop?.id,
            });

            return response.data;
        },
        onSuccess() {
            void message.success('Thêm học sinh thành công');
        },
        onError() {
            void message.error('Thêm học sinh thất bại');
        },
    });

    const submit = (data: FormType) => {
        mutate(data);
    };

    return (
        <Modal
            centered
            open={isOpen}
            onCancel={handleClose}
            onOk={handleSubmit(submit)}
            title={'Thêm học sinh'}
        >
            <div>
                <Typography.Text>
                    Học sinh được giáo viên thêm vào lớp sẽ không cần nhập mã
                    bảo vệ và phê duyệt
                </Typography.Text>

                <Form className={'tw-mt-5'} layout={'vertical'}>
                    <Controller
                        control={control}
                        name={'phone'}
                        render={({ field, fieldState: { invalid, error } }) => (
                            <Form.Item
                                validateStatus={invalid ? 'error' : 'success'}
                                help={error?.message}
                            >
                                <Input
                                    {...field}
                                    placeholder={'Nhập số điện thoại'}
                                />
                            </Form.Item>
                        )}
                    />
                </Form>
            </div>
        </Modal>
    );
}
