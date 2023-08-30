import { useState } from 'react';
import type { INotificationWorkshop } from '~/models/INotification';

export function useNotificationWorkshop() {
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
            JSON.stringify([...notifications, notification]),
        );
        setNotifications((prevState) => [...prevState, notification]);
    };

    const handleDeleteNotification = (id: number) => {
        setNotifications((prevState) =>
            prevState.filter((notification) => notification.id !== id),
        );
    };

    return {
        notifications,
        handleAddNotification,
        handleDeleteNotification,
    };
}
