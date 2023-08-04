import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { UploadProps } from 'antd';

interface Props {
    value?: string;
    onChange?: (value: string) => void;
}

export function InputUploadThumbnail({ value }: Props) {
    const uploadProps: UploadProps = {
        name: 'file',
        multiple: false,
        disabled: false,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(
                    `${info.file.name} file uploaded successfully.`,
                );
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        <Upload.Dragger {...uploadProps}>
            {!value && (
                <div>
                    <p className="ant-upload-drag-icon tw-text-center">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text tw-text-center">
                        Thêm ảnh bìa
                    </p>
                </div>
            )}
            {value && (
                <img
                    className={'tw-w-full tw-h-20 tw-object-cover'}
                    src={value}
                    alt=""
                />
            )}
        </Upload.Dragger>
    );
}
