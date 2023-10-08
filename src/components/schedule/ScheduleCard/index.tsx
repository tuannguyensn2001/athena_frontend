import { Typography } from 'antd';
import { ISchedule } from '~/models/ISchedule';
import dayjs from '~/packages/dayjs';

type Props = Pick<
    ISchedule,
    'id' | 'name' | 'attendance_number' | 'members_number' | 'start'
>;

export function ScheduleCard({
    id,
    name,
    attendance_number,
    members_number,
    start,
}: Props) {
    return (
        <div className={'tw-bg-blue-900 tw-p-2 '}>
            <div>
                <Typography.Text className={'tw-text-white tw-font-semibold'}>
                    Bắt đầu lúc {dayjs.unix(start).format('HH:mm')}
                </Typography.Text>
            </div>
            <div>
                <Typography.Text className={'tw-text-white tw-font-semibold'}>
                    {name}
                </Typography.Text>
            </div>
            <div>
                <Typography.Text className={'tw-text-white tw-font-semibold'}>
                    Điểm danh: {attendance_number} / {members_number}
                </Typography.Text>
            </div>
        </div>
    );
}
