import { PlusOutlined } from '@ant-design/icons';
import { Badge, Button, notification, Space, Table } from 'antd';
import type { AxiosError } from 'axios';
import get from 'lodash/get';
import { useMemo, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useToggle } from 'react-use';
import { ModalCustomAttribute } from '~/components/feature_flag/ModalCustomAttribute';
import API from '~/config/network';
import useGetCustomAttribute from '~/hooks/useGetCustomAttribute';
import type { ICustomAttribute } from '~/models/ICustomAttribute';
import type { AppResponse } from '~/types/app';

export function CustomAttribute() {
    const { data, refetch } = useGetCustomAttribute();

    const [selectedAttribute, setSelectedAttribute] = useState<number | null>(
        null,
    );

    const [api, contextHolder] = notification.useNotification();

    const { mutate } = useMutation<AppResponse, AxiosError, number>({
        mutationKey: 'toggle',
        mutationFn: async (id) => {
            const response = await API.patch(
                `/api/v1/feature_flag/custom_attribute/${id}/toggle`,
            );
            return response.data;
        },
        onSuccess() {
            api.success({
                message: 'Success',
                description: 'Update custom attribute successfully',
            });
            refetch();
        },
        onError() {
            api.error({
                message: 'Failed',
                description: 'Update custom attribute failed',
            });
        },
    });

    const attributes = useMemo(
        () =>
            get(data, 'data', []).map((item) => ({
                ...item,
                key: item.id,
            })),
        [data],
    );

    const [on, toggle] = useToggle(false);

    const handleClickCreate = () => {
        setSelectedAttribute(null);
        toggle();
    };

    const handleClickDelete = (id: number) => {
        setSelectedAttribute(id);
        toggle();
    };

    return (
        <div>
            {contextHolder}
            <div className={'tw-flex tw-justify-end'}>
                <Button onClick={handleClickCreate} icon={<PlusOutlined />}>
                    Create
                </Button>
            </div>
            <ModalCustomAttribute
                selectedAttribute={selectedAttribute}
                onToggle={toggle}
                open={on}
            />
            <Table
                dataSource={attributes}
                columns={[
                    {
                        title: 'Id',
                        dataIndex: 'id',
                        key: 'id',
                    },
                    {
                        title: 'Name',
                        dataIndex: 'name',
                        key: 'name',
                    },
                    {
                        title: 'Description',
                        dataIndex: 'description',
                        key: 'description',
                    },
                    {
                        title: 'Target type',
                        dataIndex: 'target_type',
                        key: 'target_type',
                        filterSearch: true,
                        sorter: (a, b) =>
                            a.target_type.localeCompare(b.target_type),
                        onFilter: (value, record) =>
                            record.target_type === value,
                        filters: [
                            {
                                text: 'User',
                                value: 'user',
                            },
                            {
                                text: 'Workshop',
                                value: 'workshop',
                            },
                            {
                                text: 'Member',
                                value: 'member',
                            },
                        ],
                    },
                    {
                        title: 'Data type',
                        dataIndex: 'data_type',
                        key: 'data_type',
                    },
                    {
                        title: 'Visible',
                        dataIndex: 'visible',
                        key: 'visible',
                        render: (visible: boolean) =>
                            visible ? (
                                <Badge status={'success'} text={'Yes'} />
                            ) : (
                                <Badge status={'error'} text={'No'} />
                            ),
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        render: (_, record) => (
                            <Space size={'large'}>
                                <Button
                                    onClick={() => handleClickDelete(record.id)}
                                >
                                    Edit
                                </Button>
                                <Button onClick={() => mutate(record.id)}>
                                    {record.visible ? 'Disabled' : 'Enabled'}
                                </Button>
                            </Space>
                        ),
                    },
                ]}
            />
        </div>
    );
}
