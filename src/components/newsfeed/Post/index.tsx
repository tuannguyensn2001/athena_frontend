import {
    CommentOutlined,
    DeleteOutlined,
    EditOutlined,
    LinkOutlined,
    MoreOutlined,
} from '@ant-design/icons';
import {
    Avatar,
    Dropdown,
    Form,
    Input,
    message,
    Modal,
    Skeleton,
    Typography,
} from 'antd';
import dayjs from 'dayjs';
import { memo, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { Comment } from '~/components/newsfeed/Comment';
import API from '~/config/network';
import { pusher } from '~/config/pusher';
import useAuth from '~/hooks/useAuth';
import type { IComment } from '~/models/IComment';
import type { IPost } from '~/models/IPost';
import type { ApiError, AppResponse } from '~/types/app';

type Props = IPost & {
    isLastPost?: boolean;
    isFirstPost?: boolean;
    onAppear?: () => void;
    onAddComment?: (id: number) => void;
    onDeleteComment?: (id: number) => void;
    onDeletePost?: (id: number) => void;
};
type FormType = Pick<IComment, 'content'>;

export const Post = memo(function Post({
    user,
    created_at,
    content,
    id,
    isLastPost,
    onAppear,
    number_of_comments,
    onAddComment,
    onDeleteComment,
}: Props) {
    const { user: currentUser } = useAuth();
    const [container, setContainer] = useState<HTMLDivElement | null>(null);

    const { handleSubmit, control, resetField } = useForm<FormType>();

    const [showComment, setShowComment] = useState(false);
    const [isHideComment, setIsHideComment] = useState(false);

    const { data, isLoading } = useQuery<AppResponse<IComment[]>, ApiError>({
        queryKey: ['comments', id],
        queryFn: async () => {
            const response = await API.get(
                `/api/v1/newsfeeds/comments/post/${id}`,
            );
            return response.data;
        },
        enabled: showComment,
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

    const { mutate: mutateDeletePost } = useMutation<
        AppResponse,
        ApiError,
        number
    >({
        mutationKey: 'delete-post',
        mutationFn: async (id) => {
            const response = await API.delete(`/api/v1/newsfeeds/posts/${id}`);
            return response.data;
        },
        onSuccess() {
            message.success('Xóa bài viết thành công');
        },
    });

    const { mutate: mutateDelete } = useMutation<
        AppResponse<IComment>,
        ApiError,
        number
    >({
        mutationKey: 'delete-comment',
        mutationFn: async (id) => {
            const response = await API.delete(
                `/api/v1/newsfeeds/comments/${id}`,
            );
            return response.data;
        },
        onSuccess() {},
    });

    useEffect(() => {
        const channel = pusher.subscribe(`newsfeed-post-${id}`);

        channel.bind('new-comment', () => {
            onAddComment?.(id);
        });
        channel.bind('delete-comment', () => {
            onDeleteComment?.(id);
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

    const [modal, contextHolder] = Modal.useModal();

    const handleDelete = (id: number) => {
        modal.confirm({
            title: 'Xóa bình luận',
            content: 'Bạn có chắc chắn muốn xóa bình luận này?',
            okText: 'Xóa',
            cancelText: 'Hủy',
            type: 'error',
            centered: true,
            onOk() {
                mutateDelete(id);
            },
        });
    };
    const submit = (data: FormType) => {
        mutate(data);
    };

    const handleDeletePost = () => {
        modal.confirm({
            title: 'Xóa bài viết',
            content: 'Bạn có chắc chắn muốn xóa bài viết này?',
            okText: 'Xóa',
            cancelText: 'Hủy',
            type: 'error',
            centered: true,
            onOk() {
                mutateDeletePost(id);
            },
        });
    };

    return (
        <div ref={setContainer} className={'tw-bg-white tw-p-5 tw-rounded-xl'}>
            {contextHolder}
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
                                {
                                    key: 'delete',
                                    label: 'Xóa bài viết',
                                    icon: <DeleteOutlined />,
                                    onClick: handleDeletePost,
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
                        {number_of_comments} bình luận
                    </Typography.Text>
                </div>
                <div>
                    <Typography.Text
                        className={'tw-cursor-pointer'}
                        onClick={() =>
                            setIsHideComment((prevState) => !prevState)
                        }
                    >
                        {isHideComment ? 'Hiện' : 'Ẩn'} bình luận
                    </Typography.Text>
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

            {!isHideComment && (
                <>
                    {!showComment && number_of_comments > 0 && (
                        <div className={'tw-mt-2 '}>
                            <Typography.Text
                                onClick={() => setShowComment(true)}
                                className={
                                    'tw-text-blue-800 tw-font-semibold tw-cursor-pointer'
                                }
                            >
                                Tải thêm bình luận
                            </Typography.Text>
                        </div>
                    )}

                    {showComment && (
                        <div className={'tw-mt-5'}>
                            {!isLoading &&
                                data?.data.map((comment) => (
                                    <Comment
                                        onDelete={handleDelete}
                                        {...comment}
                                        key={comment.id}
                                    />
                                ))}
                            {isLoading &&
                                [1, 2, 3].map((item) => (
                                    <div
                                        className={'tw-flex tw-mt-3 tw-gap-3'}
                                        key={item}
                                    >
                                        <Skeleton.Avatar />
                                        <Skeleton.Input />
                                    </div>
                                ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
});
