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
                        items={[
                            {
                                key: 'newsfeed',
                                label: 'Bảng tin',
                                icon: <FundOutlined />,
                            },
                            {
                                key: 'schedule',
                                label: 'Lịch học',
                                icon: <ScheduleOutlined />,
                            },
                            {
                                key: 'members',
                                label: 'Thành viên',
                                icon: <UserOutlined />,
                            },
                            {
                                key: 'roles',
                                label: 'Vai trò lớp',
                                icon: <SwitcherOutlined />,
                            },
                            {
                                key: 'groups',
                                label: 'Nhóm học tập',
                                icon: <TeamOutlined />,
                            },
                            {
                                key: 'exercises',
                                label: 'Bài tập',
                                icon: <ReadOutlined />,
                            },
                            {
                                key: 'scores',
                                label: 'Bảng điểm',
                                icon: <BarChartOutlined />,
                            },
                            {
                                key: 'lessons',
                                label: 'Bài giảng',
                                icon: <PlayCircleOutlined />,
                            },
                            {
                                key: 'documents',
                                label: 'Tài liệu',
                                icon: <CreditCardOutlined />,
                            },
                        ]}
                        selectedKeys={[id]}
                        onClick={handleClickMenuItem}
                    ></Menu>
                </div>
            </div>
        </div>
    );
});
