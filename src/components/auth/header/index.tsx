import { Button, Select } from 'antd';
import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Role } from '~/types/role';

function Header() {
    const { role } = useParams<{ role: Role }>();

    const hasRole = useMemo(() => {
        return role === 'teacher' || role === 'student';
    }, [role]);

    const navigate = useNavigate();

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
                            <Button size={'large'}>Đăng ký </Button>
                        </>
                    )}
                    {hasRole && (
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
