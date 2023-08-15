import { Outlet } from 'react-router-dom';
import { Sidebar } from '~/components/workshop/Sidebar';
import styles from './style.module.scss';
import { RefObject, useRef } from 'react';

export type OutletContext = {
    container: RefObject<HTMLDivElement>;
};

export function WorkshopLayout() {
    const container = useRef<HTMLDivElement>(null);

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <Sidebar />
            </div>
            <div ref={container} className={styles.content}>
                <Outlet context={{ container }} />
            </div>
            <div className={'tw-col-span-2'}>notification</div>
        </div>
    );
}
