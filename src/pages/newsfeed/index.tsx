import { Card, Skeleton, Typography } from 'antd';
import { Post } from '~/components/newsfeed/Post';
import { PostEditor } from '~/components/newsfeed/PostEditor';
import { usePostNewsfeed } from '~/hooks/usePostNewsfeed';

export function Newsfeed() {
    const { posts, isLoading, onAppearLastElement, contextHolder } =
        usePostNewsfeed();

    return (
        <div className={'tw-divide-y tw-divide-slate-300'}>
            {contextHolder}
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
                                            isFirstPost={index === 0}
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
