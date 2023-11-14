import type { AxiosError } from 'axios/index';
import { useQuery } from 'react-query';
import API from '~/config/network';
import type { ICustomAttribute } from '~/models/ICustomAttribute';
import type { ITargetType } from '~/models/ITargetType';
import type { AppResponse } from '~/types/app';

type Query = {
    target_type?: ITargetType;
};

export default function useGetCustomAttribute(query: Query = {}) {
    return useQuery<AppResponse<ICustomAttribute[]>, AxiosError>({
        queryKey: ['customAttribute', query],
        queryFn: async () => {
            const response = await API.get(
                '/api/v1/feature_flag/custom_attribute',
                {
                    params: query,
                },
            );
            return response.data;
        },
    });
}
