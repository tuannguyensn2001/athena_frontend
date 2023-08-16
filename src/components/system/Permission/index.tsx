import type { ReactNode } from 'react';
import useAuth from '~/hooks/useAuth';
import type { Role } from '~/types/role';

type Props = {
    role: Role;
    children: ReactNode;
};

export function Permission({ role, children }: Props) {
    const { user } = useAuth();

    if (user?.role === role) {
        return <>{children}</>;
    }

    return <></>;
}
