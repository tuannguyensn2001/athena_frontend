import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import API from '~/config/network';
import { useWorkshop } from '~/hooks/useWorkshop';
import { ISchedule } from '~/models/ISchedule';
import dayjs from '~/packages/dayjs';
import { ApiResponse, AppResponse } from '~/types/app';

export function useWeek() {
    const [week, setWeek] = useState(0);

    const { workshop } = useWorkshop();

    const { data } = useQuery<AppResponse<ISchedule[]>>({
        queryKey: ['week', week],
        queryFn: async () => {
            const response = await API.get(
                `/api/v1/schedules/workshops/${workshop?.id}`,
                {
                    params: {
                        start: currentWeek[0].unix(),
                        finish: currentWeek[1].unix(),
                    },
                },
            );
            return response.data;
        },
        enabled: !!workshop?.id,
    });

    const increaseWeek = () => setWeek((prevState) => prevState + 1);
    const decreaseWeek = () => setWeek((prevState) => prevState - 1);
    const backToNow = () => setWeek(0);

    const currentWeek = useMemo(() => {
        const day = dayjs().weekday(7 * week);
        return [day.startOf('isoWeek'), day.endOf('isoWeek')];
    }, [week]);

    const weekToString = useMemo(() => {
        const [start, end] = currentWeek;
        return `${start.format('DD/MM/YYYY')}-${end.format('DD/MM/YYYY')}`;
    }, [currentWeek]);

    const isCurrentWeek = useMemo(() => {
        return week === 0;
    }, [week]);

    const listDaysInWeek = useMemo(() => {
        const start = dayjs()
            .weekday(7 * week)
            .startOf('isoWeek');
        return [
            'Thứ 2',
            'Thứ 3',
            'Thứ 4',
            'Thứ 5',
            'Thứ 6',
            'Thứ 7',
            'Chủ nhật',
        ].map((item, index) => {
            const instance = start.add(index, 'day');
            return {
                day: item,
                instance,
                items:
                    data?.data
                        ?.filter((item) => {
                            const start = dayjs.unix(item.start);
                            return instance.isSame(start, 'day');
                        })
                        ?.sort((a, b) => a.start - b.start) || [],
            };
        });
    }, [currentWeek, data]);

    return {
        week,
        increaseWeek,
        decreaseWeek,
        backToNow,
        currentWeek,
        weekToString,
        isCurrentWeek,
        listDaysInWeek,
    };
}
