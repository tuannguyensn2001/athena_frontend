import { Typography } from 'antd';

export function Newsfeed() {
    return (
        <div className={'tw-divide-y tw-divide-slate-300'}>
            <div className={'tw-pt-5 tw-pl-4 tw-pb-3'}>
                <Typography.Title level={5}>Bảng tin</Typography.Title>
            </div>
            <div className={' tw-overflow-scroll '}>
                {Array.from({ length: 100 }).map((_, i) => (
                    <div key={i}>Newsfeed {i}</div>
                ))}
                {/*newsfeed*/}
            </div>
        </div>
    );
}
