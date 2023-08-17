import { Button, Input, Table, Tooltip, Typography } from 'antd';
import {
    DeleteOutlined,
    EditOutlined,
    SearchOutlined,
    ShareAltOutlined,
} from '@ant-design/icons';

export function Member() {
    return (
        <div className={'tw-divide-y tw-divide-slate-300'}>
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
                    <div className={'tw-col-span-2'}>add</div>
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
                        dataSource={[
                            {
                                key: 1,
                                school: 'ABC',
                                username: 'ABC',
                                id: 1,
                                exercises: '0/0',
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}
