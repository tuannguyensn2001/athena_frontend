import { Card, Skeleton, Typography } from 'antd';
import { useEffect, useRef } from 'react';
import { useQueryClient } from 'react-query';
import { Post } from '~/components/newsfeed/Post';
import { PostEditor } from '~/components/newsfeed/PostEditor';
import { pusher } from '~/config/pusher';
import { useWorkshop } from '~/hooks/useWorkshop';
import { usePostNewsfeed } from '~/hooks/usePostNewsfeed';

export function Newsfeed() {
    const { workshop } = useWorkshop();
    const { code } = useWorkshop();

    const queryClient = useQueryClient();

    const { posts, isLoading, onAppearLastElement } = usePostNewsfeed();

    useEffect(() => {
        const channel = pusher.subscribe(`newsfeed-workshop-${code}`);
        channel.bind('new-post', () => {
            void queryClient.invalidateQueries(['newsfeed', code, 1]);
        });

        return () => {
            channel.unsubscribe();
        };
    }, [code]);

    return (
        <div className={'tw-divide-y tw-divide-slate-300'}>
            <div className={'tw-pt-5 tw-pl-4 tw-pb-3 tw-bg-white'}>
                <Typography.Title level={5}>Bảng tin</Typography.Title>
            </div>
            <div>
                <div className="tw-flex tw-justify-center">
                    <div className="tw-w-4/6  tw-mt-5">
                        <PostEditor />

                        <div className={'tw-mt-10'}>
                            {!isLoading &&
                                posts?.map((item, index) => (
                                    <div className={'tw-my-20'} key={item.id}>
                                        <Post
                                            onAppear={onAppearLastElement}
                                            {...item}
                                            isLastPost={
                                                index === posts.length - 1
                                            }
                                        />
                                    </div>
                                ))}
                            {isLoading &&
                                [1, 2].map((item) => (
                                    <Card className={'tw-my-20'} key={item}>
                                        <Skeleton active />
                                    </Card>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
