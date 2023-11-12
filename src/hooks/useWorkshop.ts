import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import API from '~/config/network';
import { GET_WORKSHOP_BY_CODE } from '~/define/api';
import type { IWorkshop } from '~/models/IWorkshop';
import type { ApiError, AppResponse } from '~/types/app';

export function useWorkshop() {
    const { code } = useParams();

    const { data, ...res } = useQuery<AppResponse<IWorkshop>, ApiError>({
        queryKey: [GET_WORKSHOP_BY_CODE, code],
        queryFn: async () => {
            const response = await API.get(`/api/v1/workshops/code/${code}`);
            return response.data;
        },
        onSuccess: (data) => {
            localStorage.setItem('workshop_id', data.data.id.toString());
        },
    });

    const workshop = useMemo(() => data?.data, [data]);

    return {
        code,
        workshop,
        ...res,
    };
}
