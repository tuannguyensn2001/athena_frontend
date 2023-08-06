import { CheckOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Form, Input, message, Radio, Typography } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { InputSwitch } from '~/components/workshop/InputSwitch';
import API from '~/config/network';
import type { IWorkshop, Subject, Grade } from '~/models/IWorkshop';
import * as yup from 'yup';
import type { ApiError, AppResponse } from '~/types/app';

const schema = yup.object().shape({
    name: yup.string().default('').required('Vui lòng nhập tên lớp học'),
    subject: yup.mixed<Subject>().required('Vui lòng chọn môn học'),
    approve_student: yup.boolean().default(false),
    prevent_student_leave: yup.boolean().default(false),
    approve_show_score: yup.boolean().default(false),
    disable_newsfeed: yup.boolean().default(false),
    grade: yup.mixed<Grade>().required('Vui lòng chọn khối học'),
});

type FormType = Pick<
    IWorkshop,
    | 'name'
    | 'subject'
    | 'approve_show_score'
    | 'approve_student'
    | 'prevent_student_leave'
    | 'disable_newsfeed'
    | 'grade'
>;

export function CreateWorkshop() {
    const {
        control,
        handleSubmit,
        formState: { isValid },
        watch,
    } = useForm<FormType>({
        mode: 'onBlur',
        defaultValues: schema.getDefault(),
        resolver: yupResolver(schema),
    });
    const navigate = useNavigate();

    const { mutate, isLoading } = useMutation<AppResponse, ApiError, FormType>({
        mutationKey: 'createWorkshop',
        mutationFn: async (data) => {
            const response = await API.post('/api/v1/workshops', data);
            return response.data;
        },
        onSuccess: async () => {
            navigate('/workshops');
            message.success('Tạo lớp học thành công');
        },
        onError: () => void message.error('Tạo lớp học thất bại'),
    });

    const submit = (data: FormType) => {
        mutate(data);
    };

    return (
        <div className={'tw-container tw-mx-auto'}>
            <Form
                layout={'vertical'}
                size={'large'}
                onFinish={handleSubmit(submit)}
            >
                <div className="tw-grid tw-grid-cols-12 tw-gap-20">
                    <div className={'tw-col-span-8'}>
                        <Controller
                            control={control}
                            name={'name'}
                            render={({
                                field,
                                fieldState: { error, invalid },
                            }) => (
                                <Form.Item
                                    required
                                    validateStatus={
                                        invalid ? 'error' : 'success'
                                    }
                                    help={error?.message}
                                    label={
                                        <Typography.Text strong>
                                            Tên lớp
                                        </Typography.Text>
                                    }
                                    name={'name'}
                                >
                                    <Input {...field} />
                                </Form.Item>
                            )}
                        />

                        <Controller
                            control={control}
                            name={'approve_student'}
                            render={({ field }) => (
                                <Form.Item>
                                    <InputSwitch
                                        value={field.value}
                                        onChange={field.onChange}
                                        label={'Phê duyệt học sinh'}
                                        description={
                                            'Phê duyệt học sinh tránh tình trạng người lạ vào lớp học mà không có sự cho phép của bạn'
                                        }
                                    />
                                </Form.Item>
                            )}
                        />
                        <Controller
                            control={control}
                            name={'prevent_student_leave'}
                            render={({ field }) => (
                                <Form.Item>
                                    <InputSwitch
                                        value={field.value}
                                        onChange={field.onChange}
                                        label={
                                            'Chặn học sinh tự ý rời khỏi lớp học'
                                        }
                                        description={
                                            'Tính năng này giúp giáo viên quản lý số lượng thành viên trong lớp tốt hơn tránh tình trạng học sinh tự ý thoát khỏi lớp'
                                        }
                                    />
                                </Form.Item>
                            )}
                        />

                        <Controller
                            control={control}
                            name={'approve_show_score'}
                            render={({ field }) => (
                                <Form.Item>
                                    <InputSwitch
                                        value={field.value}
                                        onChange={field.onChange}
                                        label={
                                            'Cho phép học sinh xem bảng điểm'
                                        }
                                        description={
                                            'Học sinh sẽ được xem bảng điểm của các thành viên trong lớp'
                                        }
                                    />
                                </Form.Item>
                            )}
                        />

                        <Controller
                            control={control}
                            name={'disable_newsfeed'}
                            render={({ field }) => (
                                <Form.Item>
                                    <InputSwitch
                                        value={field.value}
                                        onChange={field.onChange}
                                        label={'Tắt hoạt động bảng tin'}
                                        description={
                                            'Học sinh không thể đăng bài, bình luận'
                                        }
                                    />
                                </Form.Item>
                            )}
                        />

                        <Controller
                            control={control}
                            name={'subject'}
                            render={({
                                field,
                                fieldState: { error, invalid },
                            }) => (
                                <Form.Item
                                    required
                                    validateStatus={
                                        invalid ? 'error' : 'success'
                                    }
                                    help={error?.message}
                                    label={
                                        <Typography.Text strong>
                                            Môn học
                                        </Typography.Text>
                                    }
                                >
                                    <Radio.Group
                                        {...field}
                                        options={[
                                            {
                                                label: 'Toán',
                                                value: 'math',
                                            },
                                            {
                                                label: 'Lý',
                                                value: 'physics',
                                            },
                                        ]}
                                        optionType={'button'}
                                        buttonStyle={'solid'}
                                    />
                                </Form.Item>
                            )}
                        />

                        <Controller
                            control={control}
                            name={'grade'}
                            render={({
                                field,
                                fieldState: { error, invalid },
                            }) => (
                                <Form.Item
                                    required
                                    validateStatus={
                                        invalid ? 'error' : 'success'
                                    }
                                    help={error?.message}
                                    label={
                                        <Typography.Text strong>
                                            Khối học
                                        </Typography.Text>
                                    }
                                >
                                    <Radio.Group
                                        {...field}
                                        options={[6, 7, 8, 9, 10, 11, 12].map(
                                            (item) => ({
                                                label: `Lớp ${item}`,
                                                value: `${item}`,
                                            }),
                                        )}
                                        optionType={'button'}
                                        buttonStyle={'solid'}
                                    />
                                </Form.Item>
                            )}
                        />
                    </div>
                    <div className={'tw-col-span-4'}>
                        <div className={'tw-mt-11'}>
                            <Button
                                loading={isLoading}
                                disabled={!isValid}
                                size={'large'}
                                type={'primary'}
                                className={'tw-w-full'}
                                htmlType={'submit'}
                            >
                                Tạo lớp
                            </Button>
                            <Typography.Text>
                                Bạn phải nhập đầy đủ các trường bắt buộc để tạo
                                lớp{' '}
                                <span
                                    className={'tw-text-red-600 tw-font-bold'}
                                >
                                    (*)
                                </span>
                            </Typography.Text>
                            <Card>
                                <Typography.Title level={5}>
                                    Các bước đã thực hiện
                                </Typography.Title>

                                <div className={'tw-flex tw-justify-between'}>
                                    <Typography.Text>
                                        Đặt tên lớp học
                                    </Typography.Text>
                                    {watch('name') && (
                                        <CheckOutlined
                                            className={'tw-text-green-700 '}
                                        />
                                    )}
                                </div>
                                <div className={'tw-flex tw-justify-between'}>
                                    <Typography.Text>
                                        Chọn môn học
                                    </Typography.Text>
                                    {watch('subject') && (
                                        <CheckOutlined
                                            className={'tw-text-green-700 '}
                                        />
                                    )}
                                </div>
                                <div className={'tw-flex tw-justify-between'}>
                                    <Typography.Text>
                                        Chọn khối học
                                    </Typography.Text>
                                    {watch('grade') && (
                                        <CheckOutlined
                                            className={'tw-text-green-700 '}
                                        />
                                    )}
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    );
}
