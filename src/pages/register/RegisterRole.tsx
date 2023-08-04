import { ArrowLeftOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import type { Role } from '~/types/role';

import { Button, DatePicker, Form, Input, message, Typography } from 'antd';
import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import Header from '~/components/auth/header';
import API from '~/config/network';
import type { IProfile } from '~/models/IProfile';
import type { IUser } from '~/models/IUser';

type FormType = Pick<IUser, 'email' | 'password' | 'phone'> & {
    confirm_password: string;
} & Pick<IProfile, 'username' | 'school' | 'birthday'>;

const schema = yup.object({
    username: yup.string().required('Họ tên không được để trống'),
    email: yup
        .string()
        .email('Email không hợp lệ')
        .required('Email không được để trống'),
    password: yup
        .string()
        .required('Mật khẩu không được để trống')
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    phone: yup
        .string()
        .required('Số điện thoại không được để trống')
        .matches(
            /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
            'Số điện thoại không hợp lệ',
        ),
    school: yup.string().nullable(),
    birthday: yup.number().nullable(),
    confirm_password: yup
        .string()
        .required('Nhập lại mật khẩu không được để trống')
        .oneOf([yup.ref('password')], 'Mật khẩu không khớp'),
});

export function RegisterRole() {
    const { role } = useParams<{
        role: Role;
    }>();

    const navigate = useNavigate();

    const { mutate, isLoading } = useMutation({
        mutationKey: 'register',
        mutationFn: async (data: FormType) =>
            API.post('/api/v1/auth/register', {
                ...data,
                role: role,
            }),
        async onSuccess() {
            await message.success('Đăng ký thành công');
            navigate('/login');
        },
        onError() {
            return void message.error('Đăng ký thất bại');
        },
    });

    const { control, handleSubmit } = useForm<FormType>({
        defaultValues: {
            email: '',
            password: '',
            confirm_password: '',
            phone: '',
            username: '',
            school: '',
            // birthday: 0,
        },
        resolver: yupResolver(schema),
    });

    if (role !== 'teacher' && role !== 'student') {
        return <Navigate to={'/register'} />;
    }

    const submit = (data: FormType) => {
        mutate(data);
    };

    return (
        <div className={'tw-container tw-mx-auto'}>
            <Header />
            <div className={'tw-flex tw-justify-center'}>
                <div>
                    <Link
                        to={'/register'}
                        className={'tw-no-underline tw-text-blue-600'}
                    >
                        <ArrowLeftOutlined />
                        <Typography.Text
                            className={'tw-text-blue-600 tw-font-bold tw-ml-2 '}
                        >
                            Thay đổi vai trò
                        </Typography.Text>
                    </Link>

                    <div>
                        <Typography.Title>
                            Bạn đang đăng ký với vai trò{' '}
                            {role === 'teacher' ? 'Giáo viên' : 'Học sinh'}
                        </Typography.Title>
                    </div>
                    <div>
                        <Typography.Title level={5}>
                            Thông tin cá nhân
                        </Typography.Title>
                    </div>
                    <div>
                        <Form size={'large'} onFinish={handleSubmit(submit)}>
                            <Controller
                                control={control}
                                name={'username'}
                                render={({
                                    field,
                                    fieldState: { error, invalid },
                                }) => (
                                    <Form.Item
                                        validateStatus={
                                            invalid ? 'error' : 'success'
                                        }
                                        help={error?.message}
                                    >
                                        <Input
                                            placeholder={'Họ tên'}
                                            {...field}
                                        />
                                    </Form.Item>
                                )}
                            />
                            <Controller
                                control={control}
                                name={'school'}
                                render={({
                                    field,
                                    fieldState: { error, invalid },
                                }) => (
                                    <Form.Item
                                        validateStatus={
                                            invalid ? 'error' : 'success'
                                        }
                                        help={error?.message}
                                    >
                                        <Input
                                            placeholder={'Trường'}
                                            {...field}
                                            value={field.value || undefined}
                                        />
                                    </Form.Item>
                                )}
                            />
                            <Controller
                                control={control}
                                name={'birthday'}
                                render={({
                                    field,
                                    fieldState: { error, invalid },
                                }) => (
                                    <Form.Item
                                        validateStatus={
                                            invalid ? 'error' : 'success'
                                        }
                                        help={error?.message}
                                    >
                                        <DatePicker
                                            placeholder={'Ngày sinh'}
                                            value={
                                                field.value
                                                    ? dayjs.unix(field.value)
                                                    : undefined
                                            }
                                            format={'DD/MM/YYYY'}
                                            className={'tw-w-full'}
                                            onChange={(date) => {
                                                if (!date) return;
                                                field.onChange(date.unix());
                                            }}
                                        />
                                    </Form.Item>
                                )}
                            />

                            <Typography.Title level={5}>
                                Thông tin đăng nhập
                            </Typography.Title>

                            <Controller
                                control={control}
                                name={'phone'}
                                render={({
                                    field,
                                    fieldState: { error, invalid },
                                }) => (
                                    <Form.Item
                                        validateStatus={
                                            invalid ? 'error' : 'success'
                                        }
                                        help={error?.message}
                                    >
                                        <Input
                                            placeholder={'Số điện thoại'}
                                            {...field}
                                        />
                                    </Form.Item>
                                )}
                            />

                            <Controller
                                control={control}
                                name={'email'}
                                render={({
                                    field,
                                    fieldState: { error, invalid },
                                }) => (
                                    <Form.Item
                                        validateStatus={
                                            invalid ? 'error' : 'success'
                                        }
                                        help={error?.message}
                                    >
                                        <Input
                                            placeholder={'Email'}
                                            {...field}
                                        />
                                    </Form.Item>
                                )}
                            />

                            <Controller
                                control={control}
                                name={'password'}
                                render={({
                                    field,
                                    fieldState: { error, invalid },
                                }) => (
                                    <Form.Item
                                        validateStatus={
                                            invalid ? 'error' : 'success'
                                        }
                                        help={error?.message}
                                    >
                                        <Input
                                            type={'password'}
                                            placeholder={'Mật khẩu'}
                                            {...field}
                                        />
                                    </Form.Item>
                                )}
                            />

                            <Controller
                                control={control}
                                name={'confirm_password'}
                                render={({
                                    field,
                                    fieldState: { error, invalid },
                                }) => (
                                    <Form.Item
                                        validateStatus={
                                            invalid ? 'error' : 'success'
                                        }
                                        help={error?.message}
                                    >
                                        <Input
                                            type={'password'}
                                            placeholder={'Nhập lại mật khẩu'}
                                            {...field}
                                        />
                                    </Form.Item>
                                )}
                            />

                            <Button
                                loading={isLoading}
                                type={'primary'}
                                htmlType={'submit'}
                                className={'tw-w-full'}
                            >
                                Đăng ký
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}
