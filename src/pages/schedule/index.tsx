import { Button, Radio, Tooltip, Typography } from 'antd';
import { ScheduleColumn } from '~/components/schedule/ScheduleColumn';
import { useWeek } from '~/hooks/useWeek';
import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined';
import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined';
import styles from './style.module.scss';

export function Schedule() {
    const {
        weekToString,
        isCurrentWeek,
        increaseWeek,
        decreaseWeek,
        backToNow,
        listDaysInWeek,
    } = useWeek();

    return (
        <div className={'tw-h-full tw-divide-y tw-divide-slate-300'}>
            <div className={styles.header}>
                <div>
                    <Radio.Group
                        options={[
                            {
                                label: 'Tuần',
                                value: 'week',
                            },
                            {
                                label: 'Tháng',
                                value: 'month',
                            },
                        ]}
                        size={'large'}
                        defaultValue={'week'}
                        optionType={'button'}
                        buttonStyle={'solid'}
                    />
                </div>

                <div className={'tw-mt-1'}>
                    <div className="tw-flex tw-gap-3 tw-h-8">
                        <div className="tw-flex tw-flex-col tw-justify-center">
                            <Tooltip title={'Tuần trước'}>
                                <Button
                                    onClick={decreaseWeek}
                                    type={'text'}
                                    icon={<ArrowLeftOutlined />}
                                />
                            </Tooltip>
                        </div>
                        <div
                            className={'tw-flex tw-flex-col tw-justify-center'}
                        >
                            <Typography.Text
                                className={'tw-font-semibold tw-text-lg'}
                            >
                                {weekToString}
                            </Typography.Text>
                            {!isCurrentWeek && (
                                <Typography.Text
                                    onClick={backToNow}
                                    className={
                                        ' tw-cursor-pointer tw-text-center tw-text-blue-900'
                                    }
                                >
                                    Quay về tuần hiện tại
                                </Typography.Text>
                            )}
                        </div>
                        <div className="tw-flex tw-flex-col tw-justify-center">
                            <Tooltip title={'Tuần sau'}>
                                <Button
                                    onClick={increaseWeek}
                                    type={'text'}
                                    icon={<ArrowRightOutlined />}
                                />
                            </Tooltip>
                        </div>
                    </div>
                </div>
                <div>
                    <Button>Nhận xét</Button>
                </div>
            </div>
            <div className={styles.content}>
                {listDaysInWeek.map((item) => (
                    <ScheduleColumn
                        key={item.instance.format('DD-MM-YYYY')}
                        {...item}
                    />
                ))}
            </div>
        </div>
    );
}
