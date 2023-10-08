import {
    BarChartOutlined,
    CreditCardOutlined,
    FundOutlined,
    PlayCircleOutlined,
    ReadOutlined,
    ScheduleOutlined,
    SwitcherOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Menu, Typography } from 'antd';
import { useMemo, memo } from 'react';
import { useMatches, useNavigate } from 'react-router-dom';
import useAuth from '~/hooks/useAuth';
import { useWorkshop } from '~/hooks/useWorkshop';

export const Sidebar = memo(function Sidebar() {
    const { workshop } = useWorkshop();

    const navigate = useNavigate();

    const matches = useMatches();

    const { pathname, id } = useMemo(() => {
        if (!matches) return { pathname: '', id: '' };
        if (!Array.isArray(matches) || matches.length != 2)
            return { pathname: '', id: '' };
        const { pathname } = matches[0];
        const { id } = matches[1];
        return {
            pathname,
            id,
        };
    }, [matches]);

    const { user } = useAuth();

    const menus = useMemo(() => {
        if (!user) return [];
        return [
            {
                key: 'newsfeed',
                label: 'Bảng tin',
                icon: <FundOutlined />,
                is_show: true,
            },
            {
                key: 'schedule',
                label: 'Lịch học',
                icon: <ScheduleOutlined />,
                is_show: true,
            },
            {
                key: 'member',
                label: 'Thành viên',
                icon: <UserOutlined />,
                is_show: user.role === 'teacher',
            },
            {
                key: 'roles',
                label: 'Vai trò lớp',
                icon: <SwitcherOutlined />,
                is_show: user.role === 'teacher',
            },
            {
                key: 'groups',
                label: 'Nhóm học tập',
                icon: <TeamOutlined />,
                is_show: user.role === 'teacher',
            },
            {
                key: 'exercises',
                label: 'Bài tập',
                icon: <ReadOutlined />,
                is_show: true,
            },
            {
                key: 'scores',
                label: 'Bảng điểm',
                icon: <BarChartOutlined />,
                is_show: user.role === 'teacher',
            },
            {
                key: 'lessons',
                label: 'Bài giảng',
                icon: <PlayCircleOutlined />,
                is_show: true,
            },
            {
                key: 'documents',
                label: 'Tài liệu',
                icon: <CreditCardOutlined />,
                is_show: true,
            },
        ]
            .filter((item) => item.is_show)
            .map((item) => {
                return {
                    key: item.key,
                    label: item.label,
                    icon: item.icon,
                };
            });
    }, [user]);

    const handleClickMenuItem = ({ key }: { key: string }) => {
        navigate(`${pathname}/${key}`);
    };

    return (
        <div className={'tw-h-full tw-divide-y tw-divide-slate-300  '}>
            <div className={' tw-p-4'}>
                <Typography.Title level={5}>{workshop?.name}</Typography.Title>
                <Typography.Text> Mã lớp: {workshop?.code}</Typography.Text>
            </div>

            <div className={'tw-pt-4 tw-p-0'}>
                <Typography.Text className={'tw-p-4'}>Danh mục</Typography.Text>
                <div>
                    <Menu
                        items={menus}
                        selectedKeys={[id]}
                        onClick={handleClickMenuItem}
                    ></Menu>
                </div>
            </div>
        </div>
    );
});
