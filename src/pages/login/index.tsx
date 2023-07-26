import { Button, Form, Select, Typography } from 'antd';
import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Header from '~/components/auth/header';
import { Role } from '~/types/role';

type FormType = {
    role: Role;
};

function Login() {
    const { control, handleSubmit, watch } = useForm<FormType>({
        defaultValues: {
            role: 'student',
        },
    });

    const navigate = useNavigate();

    const submit = (data: FormType) => {
        navigate(`/login/${data.role}`);
    };

    return (
        <div>
            <div className="tw-container tw-mx-auto">
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
                                    Chọn vai trò của bạn
                                </Typography.Text>

                                <Form onFinish={handleSubmit(submit)}>
                                    <Form.Item>
                                        <Controller
                                            control={control}
                                            name={'role'}
                                            render={({ field }) => (
                                                <Select
                                                    size={'large'}
                                                    {...field}
                                                    options={[
                                                        {
                                                            value: 'teacher',
                                                            label: 'Tôi là giáo viên',
                                                        },
                                                        {
                                                            value: 'student',
                                                            label: 'Tôi là học sinh',
                                                        },
                                                    ]}
                                                />
                                            )}
                                        />
                                    </Form.Item>

                                    <Button
                                        size={'large'}
                                        className={'tw-w-full'}
                                        type="primary"
                                        htmlType="submit"
                                    >
                                        Tiếp tục
                                    </Button>
                                </Form>
                            </div>
                        </div>
                        <div className={'tw-w-1/2 tw-flex tw-justify-center'}>
                            {watch('role') === 'teacher' && (
                                <img
                                    src={
                                        'https://shub.edu.vn/images/illustrations/teacher-illustration.svg'
                                    }
                                    alt=""
                                />
                            )}
                            {watch('role') === 'student' && (
                                <img
                                    src="https://shub.edu.vn/images/illustrations/student-illustration.svg"
                                    alt=""
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
