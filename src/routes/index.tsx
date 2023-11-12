import flowRight from 'lodash/flowRight';
import {createBrowserRouter} from 'react-router-dom';
import {withAuth} from '~/components/auth/withAuth';
import {withLayout} from '~/components/layout';
import {Header} from '~/components/layout/header';
import {withRole} from '~/components/system/withRole';
import {Login, LoginRole} from '~/pages/login';
import {Register, RegisterRole} from '~/pages/register';
import {Test} from '~/pages/test';

export const routesConfig = [
    {
        path: '/',
        element: <Header/>,
    },
    {
        path: '/login',
        element: <Login/>,
        id: 'login',
    },
    {
        path: '/login/:role',
        element: <LoginRole/>,
        id: 'login-role',
    },
    {
        path: '/register',
        element: <Register/>,
        id: 'register',
    },
    {
        path: '/register/:role',
        element: <RegisterRole/>,
        id: 'register-role',
    },
    {
        path: '/test',
        element: <Test/>,
    },
    {
        path: '/workshops',
        async lazy() {
            const {ListWorkshops} = await import('~/pages/workshop/list');

            return {
                Component: flowRight(withAuth, withLayout)(ListWorkshops),
            };
        },
    },
    {
        path: '/workshops/create',
        async lazy() {
            const {CreateWorkshop} = await import('~/pages/workshop/create');

            return {
                Component: flowRight(withAuth, withLayout)(CreateWorkshop),
            };
        },
    },
    {
        path: '/workshops/find',
        async lazy() {
            const {FindWorkshop} = await import('~/pages/workshop/find');

            return {
                Component: flowRight(
                    withRole('student'),
                    withAuth,
                )(FindWorkshop),
            };
        },
    },
    {
        path: '/feature-flag',
        id: 'feature-flag',
        async lazy() {
            const {FeatureFlag} = await import('~/pages/feature_flag');

            return {
                Component: flowRight(withAuth, withLayout)(FeatureFlag),
            }
        }
    },
    {
        path: '/workshops/:code',
        id: 'workshop-detail',
        async lazy() {
            const {WorkshopLayout} = await import(
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
                    const {Newsfeed} = await import('~/pages/newsfeed');

                    return {
                        Component: flowRight(withAuth)(Newsfeed),
                    };
                },
            },
            {
                path: 'schedule',
                id: 'schedule',
                async lazy() {
                    const {Schedule} = await import('~/pages/schedule');

                    return {
                        Component: flowRight(withAuth)(Schedule),
                    };
                },
            },
            {
                path: 'member',
                id: 'member',
                async lazy() {
                    const {Member} = await import('~/pages/member');

                    return {
                        Component: flowRight(withAuth)(Member),
                    };
                },
            },
        ],
    },
];

export default createBrowserRouter(routesConfig);
