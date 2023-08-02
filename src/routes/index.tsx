import { createBrowserRouter } from 'react-router-dom';
import { withAuth } from '~/components/auth/withAuth';
import { CardClass } from '~/components/class/CardClass';
import { withLayout } from '~/components/layout';
import { Header } from '~/components/layout/header';
import { Login, LoginRole } from '~/pages/login';
import { Register, RegisterRole } from '~/pages/register';

export const routesConfig = [
    {
        path: '/',
        element: <Header />,
    },
    {
        path: '/login',
        element: <Login />,
        id: 'login',
    },
    {
        path: '/login/:role',
        element: <LoginRole />,
        id: 'login-role',
    },
    {
        path: '/card-class',
        element: <CardClass />,
    },
    {
        path: '/register',
        element: <Register />,
        id: 'register',
    },
    {
        path: '/register/:role',
        element: <RegisterRole />,
        id: 'register-role',
    },
    {
        path: '/workshops',
        async lazy() {
            const { ListWorkshops } = await import('~/pages/workshop/list');

            return {
                Component: withAuth(withLayout(ListWorkshops)),
            };
        },
    },
];

export default createBrowserRouter(routesConfig);
