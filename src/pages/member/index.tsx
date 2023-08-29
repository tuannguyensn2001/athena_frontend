import {
    DeleteOutlined,
    EditOutlined,
    SearchOutlined,
    ShareAltOutlined,
} from '@ant-design/icons';
import { Button, Input, Table, Tooltip, Typography } from 'antd';
import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { ModalAddMember } from '~/components/member/ModalAddMember';
import API from '~/config/network';
import { useWorkshop } from '~/hooks/useWorkshop';
import type { IUser } from '~/models/IUser';
import type { ApiError, AppResponse } from '~/types/app';

export function Member() {
    const [openModalAddMember, setOpenModalAddMember] = useState(false);

    const { workshop } = useWorkshop();

    const { data } = useQuery<AppResponse<IUser[]>, ApiError>({
        enabled: !!workshop?.id,
        queryKey: ['members', workshop?.id],
        queryFn: async () => {
            const response = await API.get(
                `/api/v1/members/students/workshop/${workshop?.id}`,
            );
            return response.data;
        },
    });

    const dataSource = useMemo(() => {
        if (!data?.data) return [];
        return data.data.map((item) => ({
            key: item.id,
            school: item?.profile?.school,
            username: item?.profile?.username,
            id: item.id,
            exercises: '0/0',
            phone: item.phone,
        }));
    }, [data?.data]);

    const handleClose = () => setOpenModalAddMember(false);

    return (
        <div className={'tw-divide-y tw-divide-slate-300'}>
            <ModalAddMember
                isOpen={openModalAddMember}
                handleClose={handleClose}
            />
            <div className={'tw-pt-5 tw-pl-4 tw-pb-3 tw-bg-white'}>
                <Typography.Title level={5}>
                    Thành viên lớp học
                </Typography.Title>
            </div>
            <div>
                <div
                    className={
                        'tw-grid tw-grid-cols-12 tw-gap-4 tw-mt-5 tw-px-5'
                    }
                >
                    <div className={'tw-col-span-2'}>mode</div>
                    <div className="tw-col-span-8">
                        <Input
                            placeholder={'Nhập và bấm enter tìm kiếm'}
                            prefix={<SearchOutlined />}
                            size={'large'}
                        />
                    </div>
                    <div className={'tw-col-span-2'}>
                        <Button
                            onClick={() => setOpenModalAddMember(true)}
                            type={'primary'}
                            size={'large'}
                        >
                            Thêm học sinh
                        </Button>
                    </div>
                </div>

                <div>
                    <Table
                        columns={[
                            {
                                title: 'Tên',
                                dataIndex: 'username',
                                key: 'username',
                            },
                            {
                                title: 'Số điện thoại',
                                dataIndex: 'phone',
                                key: 'phone',
                            },
                            {
                                render: (_, { id }) => (
                                    <Tooltip title={'Chỉnh sửa tên gợi nhớ'}>
                                        <Button
                                            type={'text'}
                                            icon={<EditOutlined />}
                                        />
                                    </Tooltip>
                                ),
                            },
                            {
                                title: 'Trường',
                                dataIndex: 'school',
                                key: 'school',
                            },
                            {
                                title: 'Bài đã làm',
                                dataIndex: 'exercises',
                            },
                            {
                                render: (_, { id }) => (
                                    <div className={'tw-flex tw-gap-2'}>
                                        <Tooltip
                                            title={'Chia sẻ điểm đang tắt'}
                                        >
                                            <Button icon={<ShareAltOutlined />}>
                                                Chia sẻ
                                            </Button>
                                        </Tooltip>
                                        <Tooltip
                                            title={
                                                'Xoá thành viên khỏi lớp học'
                                            }
                                        >
                                            <Button
                                                icon={<DeleteOutlined />}
                                                onClick={() => console.log(id)}
                                            />
                                        </Tooltip>
                                    </div>
                                ),
                            },
                        ]}
                        dataSource={dataSource}
                    />
                </div>
            </div>
        </div>
    );
}
