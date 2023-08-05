import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, Input, Radio, Typography } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { InputSwitch } from '~/components/workshop/InputSwitch';
import type { IWorkshop, Subject } from '~/models/IWorkshop';
import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup.string().default('').required('Vui lòng nhập tên lớp học'),
    subject: yup.mixed<Subject>().required('Vui lòng chọn môn học'),
    approve_student: yup.boolean().default(false),
    prevent_student_leave: yup.boolean().default(false),
    approve_show_score: yup.boolean().default(false),
    disable_newsfeed: yup.boolean().default(false),
});

type FormType = Pick<
    IWorkshop,
    | 'name'
    | 'subject'
    | 'approve_show_score'
    | 'approve_student'
    | 'prevent_student_leave'
    | 'disable_newsfeed'
>;

export function CreateWorkshop() {
    const { control, handleSubmit } = useForm<FormType>({
        defaultValues: schema.getDefault(),
        resolver: yupResolver(schema),
    });

    const submit = (data: FormType) => {
        console.log(data);
    };

    return (
        <div className={'tw-container tw-mx-auto'}>
            <Form
                layout={'vertical'}
                size={'large'}
                onFinish={handleSubmit(submit)}
            >
                <div className="tw-grid tw-grid-cols-2 tw-gap-5">
                    <div>
                        <Controller
                            control={control}
                            name={'name'}
                            render={({
                                field,
                                fieldState: { error, invalid },
                            }) => (
                                <Form.Item
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
                    </div>
                    <div>
                        <Button htmlType={'submit'}>Tao moi</Button>
                    </div>
                </div>
            </Form>
        </div>
    );
}
