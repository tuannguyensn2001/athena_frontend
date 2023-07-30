import { createBrowserRouter } from 'react-router-dom';
import { CardClass } from '~/components/class/CardClass';
import { Login, LoginRole } from '~/pages/login';
import { Register, RegisterRole } from '~/pages/register';

export const routesConfig = [
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
];

export default createBrowserRouter(routesConfig);
