import {
    BellOutlined,
    LogoutOutlined,
    ProfileOutlined,
} from '@ant-design/icons';
import {Avatar, Badge, Button, Dropdown, message, Typography} from 'antd';
import clsx from 'clsx';
import {useQueryClient} from 'react-query';
import {Link, useNavigate} from 'react-router-dom';
import useAuth from '~/hooks/useAuth';
import styles from './style.module.scss';

export function Header() {
    const {isLoggedIn, user} = useAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return (
        <header className={styles.header}>
            <nav className={'tw-flex tw-justify-between tw-py-4 tw-px-16'}>
                <div>
                    <img
                        src="https://shub.edu.vn/images/brand-blue.svg"
                        alt=""
                    />
                </div>
                <div className={'tw-flex tw-flex-col tw-justify-center'}>
                    <div>
                        <Link
                            to={'/workshops'}
                            className={'tw-no-underline tw-mr-12'}
                        >
                            <Typography.Text
                                className={clsx(['hover:tw-text-primary-600'])}
                            >
                                Lớp học
                            </Typography.Text>
                        </Link>
                        <Link to={'#'} className={'tw-no-underline tw-mr-12'}>
                            <Typography.Text
                                className={'hover:tw-text-primary-600'}
                            >
                                Học liệu
                            </Typography.Text>
                        </Link>
                        <Link to={'#'} className={'tw-no-underline tw-mr-12'}>
                            <Typography.Text
                                className={'hover:tw-text-primary-600'}
                            >
                                Lịch học
                            </Typography.Text>
                        </Link>
                        {user?.is_admin && <Link to={'/feature-flag'} className={'tw-no-underline tw-mr-12'}>
                            <Typography.Text
                                className={'hover:tw-text-primary-600'}
                            >
                                Feature Flag
                            </Typography.Text>
                        </Link>}
                    </div>
                </div>
                <div className={'tw-flex tw-gap-5'}>
                    {isLoggedIn && (
                        <>
                            <div>
                                <div className="tw-flex tw-flex-col tw-justify-center">
                                    <Badge count={0}>
                                        <Button
                                            icon={<BellOutlined/>}
                                            size={'large'}
                                        />
                                    </Badge>
                                </div>
                            </div>
                            <Dropdown
                                arrow
                                placement={'bottom'}
                                menu={{
                                    items: [
                                        {
                                            key: 'profile',
                                            label: 'Thông tin cá nhân',
                                            icon: <ProfileOutlined/>,
                                        },
                                        {
                                            key: 'logout',
                                            label: 'Đăng xuất',
                                            icon: <LogoutOutlined/>,
                                            onClick: async () => {
                                                localStorage.removeItem(
                                                    'access_token',
                                                );
                                                navigate('/login');
                                                await message.success(
                                                    'Đăng xuất thành công',
                                                );
                                                await queryClient.invalidateQueries();
                                            },
                                        },
                                    ],
                                }}
                            >
                                <Avatar
                                    src={user?.profile?.avatar_url}
                                    className={'hover:tw-cursor-pointer'}
                                    size={'large'}
                                >
                                    {user?.profile?.username?.charAt(0)}
                                </Avatar>
                            </Dropdown>
                        </>
                    )}
                    {!isLoggedIn && (
                        <Link to={'/login'}>
                            <Button size={'large'}>Đăng nhập</Button>
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
}
