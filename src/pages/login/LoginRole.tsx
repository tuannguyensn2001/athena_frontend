import axios from 'axios';
import { useMutation } from 'react-query';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import Header from '~/components/auth/header';
import API from '~/config/network';
import { ApiError, ApiResponse } from '~/types/app';
import { Role } from '~/types/role';
import { Button, Form, Input, message, Select, Typography } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import clsx from 'clsx';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Simulate } from 'react-dom/test-utils';

interface FormType {
    phone: string;
    password: string;
}

const schema = yup.object().shape({
    phone: yup
        .string()
        .required('Số điện thoại không được để trống')
        .matches(
            /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
            'Số điện thoại không hợp lệ',
        ),
    password: yup.string().required('Mật khẩu không được để trống'),
});

export function LoginRole() {
    const { role } = useParams<{
        role: Role;
    }>();

    if (role !== 'teacher' && role !== 'student') {
        return <Navigate to={'/login'} />;
    }

    const { control, reset, handleSubmit } = useForm<FormType>({
        defaultValues: {
            phone: '',
            password: '',
        },
        resolver: yupResolver(schema),
    });

    const navigate = useNavigate();

    const { mutate, isLoading } = useMutation<
        ApiResponse<{
            access_token: string;
        }>,
        ApiError,
        FormType
    >({
        mutationKey: 'login',
        mutationFn: async (data) => {
            return API.post('/api/v1/auth/login', {
                ...data,
                role,
            });
        },
        onSuccess({
            data: {
                data: { access_token },
            },
        }) {
            localStorage.setItem('access_token', access_token);
            navigate('/workshops');
        },
        onError() {
            void message.error('Đăng nhập thất bại');
        },
    });

    useEffect(() => {
        reset({
            phone: '',
            password: '',
        });
    }, [role]);

    const submit = (data: FormType) => {
        mutate(data);
    };

    return (
        <div className={'tw-container tw-mx-auto'}>
            <Header />
            <div>
                <div className="tw-flex tw-w-full tw-gap-10">
                    <div
                        className={
                            'tw-w-1/2 tw-flex tw-flex-col tw-justify-center'
                        }
                    >
                        <Typography.Title>
                            Chào mừng bạn đến với Athena
                        </Typography.Title>

                        <div>
                            <Typography.Text className={'tw-text-blue-700'}>
                                {role === 'teacher' && 'Giáo viên đăng nhập'}
                                {role === 'student' && 'Học sinh đăng nhập'}
                            </Typography.Text>

                            <Form
                                size={'large'}
                                className={'tw-mt-5'}
                                onFinish={handleSubmit(submit)}
                            >
                                <Controller
                                    name="phone"
                                    control={control}
                                    render={({
                                        field,
                                        fieldState: { invalid, error },
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
                                    name="password"
                                    control={control}
                                    render={({
                                        field,
                                        fieldState: { invalid, error },
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

                                <div className={'tw-flex tw-justify-end'}>
                                    <Link to={'/forgot-password'}>
                                        Quên mật khẩu?
                                    </Link>
                                </div>

                                <Button
                                    loading={isLoading}
                                    data-testid="submit-button"
                                    size={'large'}
                                    className={'tw-w-full tw-mt-5'}
                                    type="primary"
                                    htmlType="submit"
                                >
                                    Đăng nhập
                                </Button>
                            </Form>
                        </div>
                    </div>
                    <div className={'tw-w-1/2 tw-flex tw-justify-center'}>
                        <img
                            className={clsx({
                                'tw-hidden': !(role === 'teacher'),
                                'tw-block': role === 'teacher',
                            })}
                            src={
                                'https://shub.edu.vn/images/illustrations/teacher-illustration.svg'
                            }
                            alt=""
                        />

                        <img
                            className={clsx({
                                'tw-hidden': !(role === 'student'),
                                'tw-block': role === 'student',
                            })}
                            src="https://shub.edu.vn/images/illustrations/student-illustration.svg"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
