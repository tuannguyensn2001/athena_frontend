import { Navigate, useParams } from 'react-router-dom';
import Header from '~/components/auth/header';
import { Role } from '~/types/role';

function LoginRole() {
    const { role } = useParams<{ role: Role }>();

    if (role !== 'teacher' && role !== 'student') {
        return <Navigate to={'/login'} />;
    }

    return (
        <div className={'tw-container tw-mx-auto'}>
            <Header />
        </div>
    );
}

export default LoginRole;
