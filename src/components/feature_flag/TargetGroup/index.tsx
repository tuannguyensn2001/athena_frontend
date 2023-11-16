import { Button, Table } from 'antd';
import type { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { useToggle } from 'react-use';
import { ModalTargetGroup } from '~/components/feature_flag/ModalTargetGroup';
import API from '~/config/network';
import type { ITargetGroup } from '~/models/ITargetGroup';
import type { AppResponse } from '~/types/app';
import { useMemo, useState } from 'react';
import get from 'lodash/get';

export function TargetGroup() {
    const [on, toggle] = useToggle(false);

    const [selectedTargetGroup, setSelectedTargetGroup] = useState<
        number | null
    >(null);

    const { data, isLoading } = useQuery<
        AppResponse<ITargetGroup[]>,
        AxiosError
    >({
        queryKey: 'target_group',
        queryFn: async () => {
            const response = await API.get(
                '/api/v1/feature_flag/target_groups',
            );
            return response.data;
        },
    });

    const targetGroups = useMemo(() => get(data, 'data', []), [data]);

    const handleClickEdit = (id: number) => {
        setSelectedTargetGroup(id);
        toggle();
    };

    return (
        <div>
            <ModalTargetGroup
                selectedTargetGroup={selectedTargetGroup}
                open={on}
                onToggle={toggle}
            />

            <Button onClick={toggle}>Create</Button>

            <div>
                <Table
                    loading={isLoading}
                    dataSource={targetGroups}
                    columns={[
                        {
                            key: 'id',
                            dataIndex: 'id',
                            title: 'Id',
                        },
                        {
                            key: 'name',
                            dataIndex: 'name',
                            title: 'Name',
                        },
                        {
                            key: 'target_type',
                            dataIndex: 'target_type',
                            title: 'Target type',
                        },
                        {
                            key: 'action',
                            title: 'Action',
                            render: (_, record) => (
                                <Button
                                    onClick={() => handleClickEdit(record.id)}
                                >
                                    Edit
                                </Button>
                            ),
                        },
                    ]}
                />
            </div>
        </div>
    );
}
