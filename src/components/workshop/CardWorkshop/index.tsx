import { EllipsisOutlined } from '@ant-design/icons';
import { Card, Typography } from 'antd';
import type { FC } from 'react';
import type { IWorkshop } from '~/models/IWorkshop';

const { Meta } = Card;

type Props = Pick<IWorkshop, 'name' | 'thumbnail' | 'code'>;

export const CardWorkshop: FC<Props> = ({ thumbnail, name, code }) => (
    <Card
        className={
            'tw-shadow-md tw-max-w-sm hover:tw-cursor-pointer hover:tw-bg-gray-50 tw-overflow-hidden object-contain tw-inline-block'
        }
        style={{ border: '1px solid #D8DCF0' }}
        cover={
            <img
                className={
                    'tw-w-4/5 md:tw-w-72 object-cover hover:tw-scale-105 tw-transition tw-duration-500'
                }
                alt={name}
                src={thumbnail}
            />
        }
    >
        <div className="tw-flex tw-flex-row tw-flex-wrap">
            <div>
                <div>
                    <Meta title={name} />
                </div>
                <div className={'tw-mt-2'}>
                    <Typography.Text>{code}</Typography.Text>
                </div>
            </div>

            <button className="tw-absolute tw-right-2 tw-text-2xl tw-w-12 tw-h-12 tw-bg-inherit hover:tw-rounded-full hover:tw-bg-slate-200 tw-border-none hover:tw-cursor-pointer">
                <EllipsisOutlined />
            </button>
        </div>
    </Card>
);
