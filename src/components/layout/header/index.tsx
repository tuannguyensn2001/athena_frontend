import {
    BellOutlined,
    LogoutOutlined,
    ProfileOutlined,
} from '@ant-design/icons';
import { Avatar, Badge, Button, Dropdown, Typography } from 'antd';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import useAuth from '~/hooks/useAuth';

export function Header() {
    const { isLoggedIn, user } = useAuth();
    return (
        <header className={'tw-shadow-md'}>
            <nav className={'tw-flex tw-justify-between tw-py-4 tw-px-16'}>
                <div>
                    <img
                        src="https://shub.edu.vn/images/brand-blue.svg"
                        alt=""
                    />
                </div>
                <div className={'tw-flex tw-flex-col tw-justify-center'}>
                    <div>
                        <Link to={'#'} className={'tw-no-underline tw-mr-12'}>
                            <Typography.Text
                                className={clsx([
                                    'hover:tw-text-blue-600',
                                    'tw-text-blue-900 tw-font-bold',
                                ])}
                            >
                                Lớp học
                            </Typography.Text>
                        </Link>
                        <Link to={'#'} className={'tw-no-underline tw-mr-12'}>
                            <Typography.Text
                                className={'hover:tw-text-blue-600'}
                            >
                                Học liệu
                            </Typography.Text>
                        </Link>
                        <Link to={'#'} className={'tw-no-underline'}>
                            <Typography.Text
                                className={'hover:tw-text-blue-600'}
                            >
                                Lịch học
                            </Typography.Text>
                        </Link>
                    </div>
                </div>
                <div className={'tw-flex tw-gap-5'}>
                    {isLoggedIn && (
                        <>
                            <div>
                                <div className="tw-flex tw-flex-col tw-justify-center">
                                    <Badge count={0}>
                                        <Button
                                            icon={<BellOutlined />}
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
                                            icon: <ProfileOutlined />,
                                        },
                                        {
                                            key: 'logout',
                                            label: 'Đăng xuất',
                                            icon: <LogoutOutlined />,
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
                    {!isLoggedIn && <Button size={'large'}>Đăng nhập</Button>}
                </div>
            </nav>
        </header>
    );
}
