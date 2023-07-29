import { createBrowserRouter } from 'react-router-dom';
import { CardClass } from '~/components/class/CardClass';
import { Login, LoginRole } from '~/pages/login';

export const routesConfig = [
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/login/:role',
        element: <LoginRole />,
    },
    {
        path: '/card-class',
        element: <CardClass />,
    },
];

export default createBrowserRouter(routesConfig);
