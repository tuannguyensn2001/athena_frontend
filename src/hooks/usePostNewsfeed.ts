import { message } from 'antd';
import flatten from 'lodash/flatten';
import { useCallback, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import API from '~/config/network';
import { pusher } from '~/config/pusher';
import { useWorkshop } from '~/hooks/useWorkshop';
import type { IPost } from '~/models/IPost';
import type { ApiError, AppResponse } from '~/types/app';

export function usePostNewsfeed() {
    const { workshop } = useWorkshop();
    const { code } = useWorkshop();
    // const [page, setPage] = useState(1);
    const [cursors, setCursors] = useState<(string | number | null)[]>([null]);
    const [_, contextHolder] = message.useMessage({
        top: 100,
    });

    const { data, ...response } = useQuery<AppResponse<IPost[]>, ApiError>({
        queryKey: ['newsfeed', code, cursors.at(-1)],
        queryFn: async () => {
            const response = await API.get(
                `/api/v1/posts/workshop/${workshop?.id}`,
                {
                    params: {
                        cursor: cursors.at(-1),
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
    });

    const queryClient = useQueryClient();

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
            });
        });

        return () => {
            channel.unsubscribe();
        };
    }, [code]);

    const test = flatten(
        cursors.map((item) => {
            const queryKey = ['newsfeed', code, item];
            const response =
                queryClient.getQueryData<AppResponse<IPost[]>>(queryKey);
            const status = queryClient.getQueryState(queryKey);
            if (status?.status === 'loading') return [];

            return response?.data || [];
        }),
    );

    const onAppearLastElement = useCallback(() => {
        if (!data?.meta?.next_cursor) return;
        setCursors((prevState) => {
            if (prevState.includes(data.meta.next_cursor)) return prevState;
            return [...prevState, data.meta.next_cursor];
        });
    }, [data]);

    return {
        ...response,
        posts: test,
        onAppearLastElement,
        contextHolder,
    };
}
