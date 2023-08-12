import {
    CommentOutlined,
    EditOutlined,
    LinkOutlined,
    MoreOutlined,
} from '@ant-design/icons';
import { Avatar, Dropdown, Form, Input, Typography } from 'antd';
import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import useAuth from '~/hooks/useAuth';
import type { IComment } from '~/models/IComment';
import type { IPost } from '~/models/IPost';

type Props = IPost;
type FormType = Pick<IComment, 'content'>;

export function Post({ user, created_at, content, comments }: Props) {
    const { user: currentUser } = useAuth();

    const { handleSubmit, control } = useForm<FormType>();

    const submit = (data: FormType) => {
        console.log(data);
    };
    return (
        <div className={'tw-bg-white tw-p-5 tw-rounded-xl'}>
            <div className={'tw-flex tw-justify-between'}>
                <div className={'tw-flex tw-gap-4'}>
                    <div className={'tw-flex tw-flex-col tw-justify-center'}>
                        <Avatar src={user?.profile?.avatar_url} size={'large'}>
                            {user?.profile?.username.charAt(0)}
                        </Avatar>
                    </div>
                    <div>
                        <div>
                            <Typography.Title style={{ margin: 0 }} level={5}>
                                {user?.profile?.username}
                            </Typography.Title>
                        </div>
                        <Typography.Text className={'tw-text-xs'}>
                            {dayjs.unix(created_at).format('HH:mm DD/MM/YYYY')}
                        </Typography.Text>
                    </div>
                </div>
                <div className={'tw-flex tw-justify-center tw-flex-col'}>
                    <Dropdown
                        arrow
                        placement={'bottom'}
                        menu={{
                            items: [
                                {
                                    key: 'edit',
                                    label: 'Chỉnh sửa bài viết',
                                    icon: <EditOutlined />,
                                },
                                {
                                    key: 'link',
                                    label: 'Sao chép liên kết',
                                    icon: <LinkOutlined />,
                                },
                            ],
                        }}
                    >
                        <MoreOutlined
                            className={'tw-text-md tw-cursor-pointer'}
                        />
                    </Dropdown>
                </div>
            </div>

            <div className={'tw-mt-3'}>
                <div
                    className={'tw-font-default'}
                    dangerouslySetInnerHTML={{ __html: content }}
                ></div>
            </div>

            <div className={'tw-flex tw-justify-between tw-mt-5'}>
                <div className={'tw-flex tw-gap-3'}>
                    <CommentOutlined />
                    <Typography.Text>
                        {comments.length} bình luận
                    </Typography.Text>
                </div>
                <div>
                    <Typography.Text>Ẩn bình luận</Typography.Text>
                </div>
            </div>

            <Form
                onFinish={handleSubmit(submit)}
                className={'tw-mt-3 tw-flex tw-gap-2'}
            >
                <div className={'tw-flex tw-justify-center tw-flex-col'}>
                    <Avatar src={currentUser?.profile?.avatar_url}>
                        {currentUser?.profile?.username?.charAt(0)}
                    </Avatar>
                </div>
                <div className={'tw-w-full'}>
                    <Controller
                        control={control}
                        name={'content'}
                        render={({ field }) => (
                            <Input
                                {...field}
                                size={'large'}
                                placeholder={'Viết bình luận'}
                            />
                        )}
                    />
                </div>
            </Form>
        </div>
    );
}
