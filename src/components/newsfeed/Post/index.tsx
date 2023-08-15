import {
    CommentOutlined,
    EditOutlined,
    LinkOutlined,
    MoreOutlined,
} from '@ant-design/icons';
import {
    Avatar,
    Card,
    Dropdown,
    Form,
    Input,
    Skeleton,
    Typography,
} from 'antd';
import dayjs from 'dayjs';
import { memo, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import API from '~/config/network';
import { pusher } from '~/config/pusher';
import useAuth from '~/hooks/useAuth';
import type { IComment } from '~/models/IComment';
import type { IPost } from '~/models/IPost';
import { useNewsfeedStore } from '~/store/newsfeed';
import type { ApiError, AppResponse } from '~/types/app';

type Props = IPost & {
    isLastPost?: boolean;
    isFirstPost?: boolean;
    onAppear?: () => void;
};
type FormType = Pick<IComment, 'content'>;

export const Post = memo(function Post({
    user,
    created_at,
    content,
    id,
    isLastPost,
    onAppear,
    isFirstPost,
}: Props) {
    const { user: currentUser } = useAuth();
    const [container, setContainer] = useState<HTMLDivElement | null>(null);

    const { handleSubmit, control, resetField } = useForm<FormType>();

    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery<AppResponse<IComment[]>, ApiError>({
        queryKey: ['comments', id],
        queryFn: async () => {
            const response = await API.get(
                `/api/v1/newsfeeds/comments/post/${id}`,
            );
            return response.data;
        },
    });

    const { mutate } = useMutation<AppResponse, ApiError, FormType>({
        mutationKey: 'comments',
        mutationFn: async (data) => {
            const response = await API.post('/api/v1/newsfeeds/comments', {
                ...data,
                post_id: id,
            });
            return response.data;
        },
        onSuccess() {
            resetField('content');
        },
    });

    const { setFirstPostAppear } = useNewsfeedStore();

    useEffect(() => {
        const channel = pusher.subscribe(`newsfeed-post-${id}`);

        channel.bind('new-comment', () => {
            void queryClient.invalidateQueries(['comments', id]);
        });

        return () => {
            channel.unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (!container) return;
        if (!isLastPost) return;
        const observer = new IntersectionObserver(
            ([container]) => {
                if (container.isIntersecting) {
                    if (onAppear) {
                        onAppear();
                    }
                }
            },
            {
                threshold: 0.1,
            },
        );
        observer.observe(container);

        return () => {
            observer.unobserve(container);
        };
    }, [isLastPost, container]);

    useEffect(() => {
        if (!container || !isFirstPost) return;
        const observer = new IntersectionObserver(([container]) => {
            setFirstPostAppear(container.isIntersecting);
        });
        observer.observe(container);
        return () => {
            observer.unobserve(container);
        };
    }, [isFirstPost, container]);

    const submit = (data: FormType) => {
        mutate(data);
    };

    if (isLoading) {
        return (
            <Card>
                <Skeleton />
            </Card>
        );
    }

    return (
        <div ref={setContainer} className={'tw-bg-white tw-p-5 tw-rounded-xl'}>
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
                        {data?.data?.length} bình luận
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
});
