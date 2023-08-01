import { useMemo } from 'react';
import { useQuery } from 'react-query';
import API from '~/config/network';
import { IUser } from '~/models/IUser';
import { ApiError, ApiResponse, AppResponse } from '~/types/app';

function useAuth() {
    const { data } = useQuery<AppResponse<IUser>, ApiError>({
        queryKey: 'auth',
        queryFn: async () => {
            const response = await API.get('/api/v1/auth/me');
            return response.data;
        },
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
    };
}

export default useAuth;
