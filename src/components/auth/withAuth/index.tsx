import { Spin } from 'antd';
import { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';
import { Loading } from '~/components/loading';
import useAuth from '~/hooks/useAuth';

export function withAuth<T extends Record<string, never>>(
    Component: ComponentType<T>,
) {
    return function WithAuth(props: T) {
        const { isLoggedIn, isFetched, isLoading } = useAuth();

        if (isLoading) return <Loading />;

        if (!isLoggedIn) {
            return <Navigate to="/login" />;
        }

        return <Component {...props} />;
    };
}
