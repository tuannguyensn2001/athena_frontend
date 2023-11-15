import { Button } from 'antd';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { useToggle } from 'react-use';
import { ModalTargetGroup } from '~/components/feature_flag/ModalTargetGroup';
import API from '~/config/network';
import { ITargetGroup } from '~/models/ITargetGroup';
import { AppResponse } from '~/types/app';

export function TargetGroup() {
    const [on, toggle] = useToggle(false);

    const { data } = useQuery<AppResponse<ITargetGroup[]>, AxiosError>({
        queryKey: 'target_group',
        queryFn: async () => {
            const response = await API.get('/api/v1/feature_flag/target_group');
            return response.data;
        },
    });

    return (
        <div>
            <ModalTargetGroup open={on} onToggle={toggle} />

            <Button onClick={toggle}>Create</Button>
        </div>
    );
}
