import {createBrowserRouter} from 'react-router-dom';
import {Login, LoginRole} from "~/pages/login";

export const routesConfig = [
    {
        path: '/login',
        element: <Login/>,
    },
    {
        path: '/login/:role',
        element: <LoginRole/>,
    },
];

export default createBrowserRouter(routesConfig);
