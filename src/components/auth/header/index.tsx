import { Button, Select } from 'antd';
import { useMemo } from 'react';
import { Link, useMatches, useNavigate, useParams } from 'react-router-dom';
import type { Role } from '~/types/role';

function Header() {
    const { role } = useParams<{
        role: Role;
    }>();

    const hasRole = useMemo(
        () => role === 'teacher' || role === 'student',
        [role],
    );

    const navigate = useNavigate();
    const [{ id }] = useMatches();

    const handleChangeRole = (val: Role) => {
        navigate(`/login/${val}`);
    };

    return (
        <div className={'tw-h-20 tw-flex tw-flex-col tw-justify-center'}>
            <div className={'tw-flex tw-justify-between '}>
                <div>
                    <img
                        src="https://shub.edu.vn/images/brand-blue.svg"
                        alt=""
                    />
                </div>
                <div className={'tw-flex tw-gap-5'}>
                    {!hasRole && (
                        <>
                            <Button size={'large'} type={'text'}>
                                Trang chủ
                            </Button>
                            {id === 'register' && (
                                <Link to={'/login'}>
                                    <Button size={'large'}>Đăng nhập </Button>
                                </Link>
                            )}
                            {id === 'login' && (
                                <Link to={'/register'}>
                                    <Button size={'large'}>Đăng ký </Button>
                                </Link>
                            )}
                        </>
                    )}
                    {hasRole && id === 'login-role' && (
                        <div>
                            <Select
                                onChange={handleChangeRole}
                                value={role}
                                size={'large'}
                                options={[
                                    {
                                        value: 'teacher',
                                        label: 'Tôi là giáo viên',
                                    },
                                    {
                                        value: 'student',
                                        label: 'Tôi là học sinh',
                                    },
                                ]}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
