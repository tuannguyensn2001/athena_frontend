import { Avatar, Button, Form } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import API from '~/config/network';
import useAuth from '~/hooks/useAuth';
import { useWorkshop } from '~/hooks/useWorkshop';
import type { IPost } from '~/models/IPost';
import type { ApiError, AppResponse } from '~/types/app';
import styles from './style.module.scss';

type FormType = Pick<IPost, 'content'>;

export function PostEditor() {
    const { user } = useAuth();
    const { control, handleSubmit, watch, resetField } = useForm<FormType>({});
    const { workshop } = useWorkshop();

    const { mutate } = useMutation<AppResponse, ApiError, FormType>({
        mutationKey: 'createPost',
        mutationFn: async (data) => {
            const response = await API.post('/api/v1/posts', {
                ...data,
                workshop_id: workshop?.id,
            });
            return response.data;
        },
        onSuccess() {
            resetField('content');
        },
    });

    const submit = (data: FormType) => {
        mutate(data);
    };

    return (
        <Form
            onFinish={handleSubmit(submit)}
            className={
                'tw-bg-white tw-rounded-xl tw-divide-y tw-divide-slate-200'
            }
        >
            <div className={'tw-p-5 tw-flex tw-w-full'}>
                <div className={'tw-flex tw-justify-start tw-flex-col'}>
                    <Avatar src={user?.profile?.avatar_url} size={'large'}>
                        {user?.profile?.username?.charAt(0)}
                    </Avatar>
                </div>
                <Controller
                    name={'content'}
                    control={control}
                    render={({ field }) => (
                        <ReactQuill
                            value={field.value}
                            onChange={field.onChange}
                            placeholder={'Nhập nội dung'}
                            className={styles.quill}
                            theme={'snow'}
                            modules={{ toolbar: false }}
                        />
                    )}
                />
            </div>
            <div className={'tw-p-5 tw-flex tw-justify-end'}>
                <Button htmlType={'submit'} disabled={!watch('content')}>
                    Đăng tin
                </Button>
            </div>
        </Form>
    );
}
