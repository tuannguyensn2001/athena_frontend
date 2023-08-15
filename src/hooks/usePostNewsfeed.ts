import { useWorkshop } from '~/hooks/useWorkshop';
import { useQuery, useQueryClient } from 'react-query';
import { ApiError, AppResponse } from '~/types/app';
import { IPost } from '~/models/IPost';
import API from '~/config/network';
import { useCallback, useEffect, useMemo, useState } from 'react';

export function usePostNewsfeed() {
    const { workshop } = useWorkshop();
    const { code } = useWorkshop();
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState<IPost[]>([]);
    const queryClient = useQueryClient();

    const { data, ...response } = useQuery<AppResponse<IPost[]>, ApiError>({
        queryKey: ['newsfeed', code, page],
        queryFn: async () => {
            const response = await API.get(
                `/api/v1/posts/workshop/${workshop?.id}?page=${page}`,
            );
            return response.data;
        },
        enabled: !!workshop?.id,
        onSuccess(response) {
            setPosts((prevState) => [...prevState, ...response.data]);
        },
        staleTime: 30000,
        keepPreviousData: true,
    });

    const totalPage = useMemo(() => {
        if (!data?.meta?.total) return 0;
        return Math.ceil(data?.meta?.total / 3);
    }, [data?.meta?.total]);

    const onAppearLastElement = useCallback(() => {
        if (!totalPage) return;
        if (page === totalPage) return;
        setPage(page + 1);
    }, [totalPage, page]);

    return {
        ...response,
        posts: posts,
        onAppearLastElement,
    };
}
