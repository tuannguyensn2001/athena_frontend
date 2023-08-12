import { Typography } from 'antd';
import { useQuery } from 'react-query';
import { Post } from '~/components/newsfeed/Post';
import { PostEditor } from '~/components/newsfeed/PostEditor';
import API from '~/config/network';
import { useWorkshop } from '~/hooks/useWorkshop';
import type { IPost } from '~/models/IPost';
import type { ApiError, AppResponse } from '~/types/app';

export function Newsfeed() {
    const { workshop } = useWorkshop();

    const { data } = useQuery<AppResponse<IPost[]>, ApiError>({
        queryKey: ['newsfeed', workshop?.id],
        queryFn: async () => {
            const response = await API.get(
                `/api/v1/posts/workshop/${workshop?.id}`,
            );
            return response.data;
        },
        enabled: !!workshop?.id,
    });

    return (
        <div className={'tw-divide-y tw-divide-slate-300 '}>
            <div className={'tw-pt-5 tw-pl-4 tw-pb-3 tw-bg-white'}>
                <Typography.Title level={5}>Bảng tin</Typography.Title>
            </div>
            <div className={'tw-overflow-scroll '}>
                <div className="tw-flex tw-justify-center">
                    <div className="tw-w-4/6  tw-mt-5">
                        <PostEditor />

                        <div className={'tw-mt-10'}>
                            {data?.data?.map((item) => (
                                <div className={'tw-mt-20'} key={item.id}>
                                    <Post {...item} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
