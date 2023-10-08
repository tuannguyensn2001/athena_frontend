import { Outlet, useMatches } from 'react-router-dom';
import { Notification } from '~/components/workshop/Notification';
import { Sidebar } from '~/components/workshop/Sidebar';
import styles from './style.module.scss';
import type { RefObject } from 'react';
import { useMemo, useRef } from 'react';
import clsx from 'clsx';

export type OutletContext = {
    container: RefObject<HTMLDivElement>;
};

export function WorkshopLayout() {
    const container = useRef<HTMLDivElement>(null);

    const [_, { id }] = useMatches();

    const hideNotificationColumn = useMemo(
        () => ['schedule'].includes(id),
        [id],
    );

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <Sidebar />
            </div>
            <div
                ref={container}
                className={clsx([
                    styles.content,
                    {
                        'tw-bg-slate-200': ['newsfeed'].includes(id),
                        'tw-col-span-8': !hideNotificationColumn,
                        'tw-col-span-10': hideNotificationColumn,
                    },
                ])}
            >
                <Outlet context={{ container }} />
            </div>
            {!hideNotificationColumn && (
                <div className={'tw-col-span-2'}>
                    <Notification />
                </div>
            )}
        </div>
    );
}
