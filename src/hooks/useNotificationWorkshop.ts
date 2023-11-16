import { useState } from 'react';
import type { INotificationWorkshop } from '~/models/INotification';
import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import { message } from 'antd';

type NotificationForm = Pick<INotificationWorkshop, 'content'>;
export function useNotificationWorkshop() {
    const notificationsApi = 'http://localhost:3000/notifications'
    const { data, isLoading } = useQuery({
        queryKey: 'notificationList',
        queryFn: async () => {
            const response = await axios.get(notificationsApi)
            return response.data
        }
    })
    const [notifications, setNotifications] = useState<INotificationWorkshop[]>(
        () => {
            const store = localStorage.getItem('notifications');
            if (!store) return [];
            const parse = JSON.parse(store);
            if (!Array.isArray(parse)) return [];
            return parse;
        },
    );

    const handleAddNotification = (notification: INotificationWorkshop) => {
        localStorage.setItem(
            'notifications',
            JSON.stringify(data),
        );
        setNotifications((prevState) => [...prevState, notification]);
    };

    const handleDeleteNotification = (id: number) => {
        setNotifications((prevState) =>
            prevState.filter((notification) => notification.id !== id),
        );
    };
   

    const mutateAddNotification = useMutation({
        mutationKey: 'addNotification',
        mutationFn: async (data: NotificationForm) => 
            axios.post(notificationsApi, data),
        async onSuccess() {
            await message.success('Thêm thông báo thành công')
        },
        onError() {
            return void message.error('Thêm thông báo thất bại')
        }
    })

    const mutateDeleteNotification = useMutation({
        mutationKey: 'deleteNotification',
        mutationFn: async (id: number) => {
            axios.delete(`${notificationsApi}/${id}`)
        },
        async onSuccess() {
            await message.success('Xoá thông báo thành công')
        },
        onError() {
            return void message.error('Xoá thông báo thất bại')
        },
    })

    return {
        notifications,
        handleAddNotification,
        handleDeleteNotification,
        mutateAddNotification,
        mutateDeleteNotification      
    };
}
