import { DeleteOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Typography } from 'antd';
import { Permission } from '~/components/system/Permission';
import type { IComment } from '~/models/IComment';
import { memo } from 'react';

type Props = IComment & {
    onDelete?: (id: number) => void;
};

export const Comment = memo(
    function Comment({ user, content, onDelete, id }: Props) {
        return (
            <div className={'tw-flex tw-gap-3 tw-mt-3'}>
                <div className={'tw-mt-3'}>
                    <Avatar size={'default'} src={user?.profile?.avatar_url}>
                        {user?.profile?.username.charAt(0)}
                    </Avatar>
                </div>
                <div className={'tw-bg-gray-100 tw-rounded-xl tw-px-3 tw-py-2'}>
                    <div>
                        <Typography.Text className={'tw-font-semibold'}>
                            {user?.profile?.username}
                        </Typography.Text>
                    </div>
                    <Typography.Text>{content}</Typography.Text>
                </div>

                <Permission role={'teacher'}>
                    <div className={'tw-mt-3'}>
                        <Dropdown
                            arrow
                            className={
                                'hover:tw-bg-gray-200 tw-cursor-pointer tw-rounded-full tw-p-2'
                            }
                            placement={'bottom'}
                            menu={{
                                items: [
                                    {
                                        key: 'delete',
                                        label: 'Xóa bình luận',
                                        icon: <DeleteOutlined />,
                                        onClick: () => onDelete?.(id),
                                    },
                                ],
                            }}
                        >
                            <EllipsisOutlined />
                        </Dropdown>
                    </div>
                </Permission>
            </div>
        );
    },
    (prev, next) => prev.id === next.id,
);
