import flowRight from 'lodash/flowRight';
import { createBrowserRouter } from 'react-router-dom';
import { withAuth } from '~/components/auth/withAuth';
import { withLayout } from '~/components/layout';
import { Header } from '~/components/layout/header';
import { Login, LoginRole } from '~/pages/login';
import { Register, RegisterRole } from '~/pages/register';
import { Test } from '~/pages/test';

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
        path: '/test',
        element: <Test />,
    },
    {
        path: '/workshops',
        async lazy() {
            const { ListWorkshops } = await import('~/pages/workshop/list');

            return {
                Component: flowRight(withAuth, withLayout)(ListWorkshops),
            };
        },
    },
    {
        path: '/workshops/create',
        async lazy() {
            const { CreateWorkshop } = await import('~/pages/workshop/create');

            return {
                Component: flowRight(withAuth, withLayout)(CreateWorkshop),
            };
        },
    },
    {
        path: '/workshops/:code',
        async lazy() {
            const { WorkshopLayout } = await import(
                '~/components/workshop/Layout'
            );

            return {
                Component: flowRight(withAuth, withLayout)(WorkshopLayout),
            };
        },
        children: [
            {
                path: 'newsfeed',
                id: 'newsfeed',
                async lazy() {
                    const { Newsfeed } = await import('~/pages/newsfeed');

                    return {
                        Component: flowRight(withAuth)(Newsfeed),
                    };
                },
            },
            {
                path: 'schedule',
                id: 'schedule',
                async lazy() {
                    const { Schedule } = await import('~/pages/schedule');

                    return {
                        Component: flowRight(withAuth)(Schedule),
                    };
                },
            },
        ],
    },
];

export default createBrowserRouter(routesConfig);
