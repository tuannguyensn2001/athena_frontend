import { ComponentType } from 'react';
import { Loading } from '~/components/loading';
import useAuth from '~/hooks/useAuth';
import type { Role } from '~/types/role';

// export function withRole<T extends Record<string, never>>(
//     Component: ComponentType<T>,
//     role: Role,
// ) {
//     return function WithRole(props: T) {
//         const { user, isLoading } = useAuth();
//
//         if (!isLoading) return <Loading />;
//
//         if (user?.role !== role) {
//             return <div>Unauthorized</div>;
//         }
//
//         return <Component {...props} />;
//     };
// }

export function withRole(role: Role) {
    return function <T extends Record<string, never>>(
        Component: ComponentType<T>,
    ) {
        return function WithRole(props: T) {
            const { user, isLoading } = useAuth();

            if (isLoading) return <Loading />;

            if (user?.role !== role) {
                return <div>Unauthorized</div>;
            }

            return <Component {...props} />;
        };
    };
}
