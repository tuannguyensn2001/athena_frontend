import { PlusOutlined } from '@ant-design/icons';
import { Button, Tooltip, Typography } from 'antd';
import type { Dayjs } from 'dayjs';
import { ScheduleCard } from '~/components/schedule/ScheduleCard';
import type { ISchedule } from '~/models/ISchedule';
import styles from './style.module.scss';

interface Props {
    day: string;
    instance: Dayjs;
    items: ISchedule[];
}

export function ScheduleColumn({ day, instance, items }: Props) {
    return (
        <div className={' tw-divide-y tw-divide-slate-300 '}>
            <div className={styles.header}>
                <Typography.Text className={'tw-font-semibold tw-text-md'}>
                    {day}
                </Typography.Text>
                <div className={'tw-flex tw-gap-3'}>
                    <Typography.Text className={'tw-font-semibold tw-text-xl'}>
                        {instance.format('DD/MM')}
                    </Typography.Text>
                    <Tooltip title={'Thêm lịch học'}>
                        <Button type={'text'} icon={<PlusOutlined />}></Button>
                    </Tooltip>
                </div>
            </div>

            <div className={styles.content}>
                {items.length > 0 &&
                    items.map((item) => (
                        <div key={item.id} className={'tw-p-2'}>
                            <ScheduleCard {...item} key={item.id} />
                        </div>
                    ))}
                {items.length === 0 && (
                    <div className={'tw-mt-5 tw-text-center'}>
                        <Typography.Text className={'tw-text-slate-500'}>
                            Không có lịch học
                        </Typography.Text>
                    </div>
                )}
            </div>
        </div>
    );
}
