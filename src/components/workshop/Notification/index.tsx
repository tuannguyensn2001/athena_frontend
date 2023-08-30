import dayjs from 'dayjs';
import { useState } from 'react';
import { Button, Modal, Typography, Input } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { useForm, Controller } from 'react-hook-form';
import { useNotificationWorkshop } from '~/hooks/useNotificationWorkshop';
import { INotificationWorkshop } from '~/models/INotification';

type NotiProps = Pick<INotificationWorkshop, 'content' | 'created_at'>;

type NotificationForm = Pick<INotificationWorkshop, 'content'>;

export function Notification() {
    const { handleSubmit, control, reset } = useForm<NotificationForm>({
        defaultValues: {
            content: '',
        },
    });

    const { notifications, handleAddNotification, handleDeleteNotification } =
        useNotificationWorkshop();

    const { confirm } = Modal;

    const showDeleteConfirm = (id: number) => {
        confirm({
            title: 'Xoá thông báo',
            content: 'Học sinh sẽ không còn nhìn thấy thông báo này nữa ?',
            okText: 'Đồng ý',
            cancelText: 'Thoát',
            onOk() {
                handleDeleteNotification(id);
            },
            onCancel() {
                console.log('Thoát');
            },
        });
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const submit = (data: NotificationForm) => {
        handleAddNotification({
            content: data.content,
            id: Math.random(),
            created_at: dayjs().unix(),
        });
        reset({
            content: '',
        });
    };

    return (
        <div>
            <Typography.Title level={5} className="tw-font-semibold tw-text-lg">
                Thông báo
            </Typography.Title>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                className="tw-flex tw-items-center tw-justify-center tw-font-semibold tw-p-5 tw-w-full md:tw-w-72"
                onClick={showModal}
            >
                Thêm thông báo
            </Button>

            <Modal
                title="Thông báo sẽ được gửi đến các thành viên trong lớp"
                open={isModalOpen}
                centered
                closeIcon={null}
                footer={null}
            >
                <form onSubmit={handleSubmit(submit)}>
                    <Controller
                        name="content"
                        control={control}
                        render={({ field }) => (
                            <Input {...field} placeholder="Nội dung" />
                        )}
                    />
                    <div className="tw-flex tw-justify-end tw-mt-3">
                        <Button
                            className="tw-mr-2 tw-w-20 tw-font-semibold tw-bg-slate-200"
                            onClick={handleCancel}
                        >
                            Huỷ
                        </Button>
                        <Button
                            htmlType="submit"
                            type="primary"
                            className="tw-w-20 tw-font-semibold"
                            onClick={handleOk}
                        >
                            Tạo
                        </Button>
                    </div>
                </form>
            </Modal>

            {notifications.map((item, index) => (
                <div
                    className="tw-mt-4 tw-bg-slate-100 tw-p-1 tw-rounded-md tw-w-full md:tw-w-72 tw-relative tw-flex tw-flex-col"
                    style={{ borderLeft: '4px solid rgb(30, 136, 229)' }}
                    key={index}
                >
                    <div className="tw-flex">
                        <div>
                            <Typography>{item.content}</Typography>
                            <Typography className="tw-text-gray-600">
                                {item.created_at}
                            </Typography>
                        </div>

                        <CloseOutlined
                            className="tw-text-red-600 tw-text-xs tw-pt-1 tw-right-2.5 tw-absolute"
                            onClick={() => showDeleteConfirm(item.id)}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
