import { Spin } from 'antd';

export function Loading() {
    return (
        <div className="tw-flex tw-items-center tw-justify-center tw-w-full tw-h-screen tw-bg-blue-200">
            <div className="tw-flex tw-justify-center tw-items-center tw-space-x-1 tw-text-sm tw-text-gray-700">
                <Spin size={'large'} />
            </div>
        </div>
    );
}
