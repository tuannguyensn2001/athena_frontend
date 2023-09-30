import { message } from 'antd';
import cloneDeep from 'lodash/cloneDeep';
import flatten from 'lodash/flatten';
import { useEffect, useReducer, useRef } from 'react';
import { useQueries, useQuery, useQueryClient } from 'react-query';
import App from '~/App';
import API from '~/config/network';
import { pusher } from '~/config/pusher';
import { useWorkshop } from '~/hooks/useWorkshop';
import type { IPost } from '~/models/IPost';
import type { ApiError, AppResponse } from '~/types/app';

export function usePostNewsfeed() {
    const { workshop } = useWorkshop();
    const { code } = useWorkshop();
    const [_, contextHolder] = message.useMessage({
        top: 100,
    });
    const cursors = useRef<(string | number | null)[]>([null]);
    const [_state, forceUpdate] = useReducer((x) => x + 1, 0);

    const { data, isLoading } = useQuery<AppResponse<IPost[]>, ApiError>({
        queryKey: ['newsfeed', code, cursors.current.at(-1)],
        queryFn: async () => {
            const response = await API.get(
                `/api/v1/newsfeed/posts/workshops/${workshop?.id}`,
                {
                    params: {
                        cursor: cursors.current.at(-1),
                    },
                },
            );
            return response.data;
        },
        enabled: !!workshop?.id,
        onSuccess() {},
        staleTime: Infinity,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        cacheTime: Infinity,
    });

    const queryClient = useQueryClient();

    const postsFlattenEager = () =>
        flatten(
            cursors.current.map((item) => {
                // const queryKey = ['newsfeed', code, item];
                const queryKey = ['newsfeed', code, item];
                const response =
                    queryClient.getQueryData<AppResponse<IPost[]>>(queryKey);
                const status = queryClient.getQueryState(queryKey);
                if (status?.status === 'loading') return [];

                return (
                    response?.data?.map((item) => ({
                        ...item,
                        cache_key: queryKey,
                    })) || []
                );
            }),
        );

    useEffect(() => {
        const channel = pusher.subscribe(`newsfeed-workshop-${code}`);
        channel.bind('new-post', (post: IPost) => {
            queryClient.setQueryData(['newsfeed', code, null], (prev) => {
                const previous = prev as AppResponse<IPost[]>;
                if (!prev) return previous;
                if (Array.isArray(previous.data)) {
                    if (
                        previous.data.length > 0 &&
                        previous.data[0].id === post.id
                    )
                        return previous;
                    return {
                        ...prev,
                        data: [post, ...previous.data],
                    };
                }
                forceUpdate();
            });
        });

        channel.bind('delete-post', (postId: number) => {
            const post = postsFlattenEager().find((item) => item.id === postId);
            if (!post) return;
            queryClient.setQueryData<AppResponse<IPost[]> | undefined>(
                post.cache_key,
                (prev) => {
                    if (!prev) return prev;
                    const clone = cloneDeep(prev);
                    clone.data = clone.data?.filter(
                        (item) => item.id !== postId,
                    );
                    return clone;
                },
            );
            forceUpdate();
        });

        return () => {
            channel.unsubscribe();
            channel.unbind_all();
        };
    }, [code]);

    const updateNumberOfComments = (
        postId: number,
        callback: (total: number) => number,
    ) => {
        const post = postsFlattenEager().find((item) => item.id === postId);
        if (!post) return;

        queryClient.setQueryData(post.cache_key, (prev) => {
            const index = (prev as AppResponse<IPost[]>).data?.findIndex(
                (item) => item.id === postId,
            );

            const clone = cloneDeep(prev as AppResponse<IPost[]>);
            clone.data[index!] = {
                ...clone.data[index!],
                number_of_comments: callback(
                    clone.data[index!].number_of_comments,
                ),
            };
            return clone;
        });
        forceUpdate();
    };

    const onAppearLastElement = () => {
        if (!data?.meta?.next_cursor) return;
        cursors.current = [...cursors.current, data.meta.next_cursor];
        forceUpdate();
    };

    return {
        isLoading,
        posts: postsFlattenEager,
        onAppearLastElement,
        contextHolder,
        updateNumberOfComments,
    };
}
