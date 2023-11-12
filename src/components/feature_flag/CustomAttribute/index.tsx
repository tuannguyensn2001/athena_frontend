import {Button, Table} from "antd";
import type {AxiosError} from "axios";
import get from 'lodash/get'
import {useMemo} from "react";
import {useQuery} from "react-query";
import {useToggle} from "react-use";
import {ModalCustomAttribute} from "~/components/feature_flag/ModalCustomAttribute";
import API from "~/config/network";
import type {ICustomAttribute} from "~/models/ICustomAttribute";
import type {AppResponse} from "~/types/app";

export function CustomAttribute() {

    const {data} = useQuery<
        AppResponse<ICustomAttribute[]>,
        AxiosError
    >({
        queryKey: "customAttribute",
        queryFn: async () => {
            const response = await API.get('/api/v1/feature_flag/custom_attribute');
            return response.data
        },
        refetchOnWindowFocus: true
    })

    const attributes = useMemo(() => get(data, 'data', []).map(item => ({
        ...item,
        key: item.id
    })), [data])

    const [on, toggle] = useToggle(false);

    return (
        <div>
            <Button onClick={toggle}>Create</Button>
            <ModalCustomAttribute onToggle={toggle} open={on}/>
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
                        title: 'Target type',
                        dataIndex: 'target_type',
                        key: 'target_type',
                        sorter: (a, b) => a.target_type.localeCompare(b.target_type),
                        onFilter: (value, record) => record.target_type === value,
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
                                value: 'member'
                            }
                        ]
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
                        render: (visible: boolean) => visible ? 'Yes' : 'No'
                    }
                ]}
            />
        </div>
    )
}
