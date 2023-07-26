import { createBrowserRouter } from 'react-router-dom';
import Login from '~/pages/login';
import LoginRole from '~/pages/login/role';

const routes = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/login/:role',
        element: <LoginRole />,
    },
]);

export default routes;
