import { useMemo } from 'react';
import { useQuery } from 'react-query';
import API from '~/config/network';
import { IUser } from '~/models/IUser';
import { ApiError, ApiResponse, AppResponse } from '~/types/app';

function useAuth() {
    const { data, isFetched, isLoading } = useQuery<
        AppResponse<IUser>,
        ApiError
    >({
        queryKey: 'auth',
        queryFn: async () => {
            const response = await API.get('/api/v1/auth/me');
            return response.data;
        },
        retry: 1,
    });
    const user = useMemo(() => {
        return data?.data;
    }, [data]);

    const isLoggedIn = useMemo(() => {
        return !!user;
    }, [user]);

    return {
        user,
        isLoggedIn,
        isFetched,
        isLoading,
    };
}

export default useAuth;
