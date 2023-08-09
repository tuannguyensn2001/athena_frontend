import { Outlet } from 'react-router-dom';
import { Sidebar } from '~/components/workshop/Sidebar';
import styles from './style.module.scss';

export function WorkshopLayout() {
    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <Sidebar />
            </div>
            <div className={styles.content}>
                <Outlet />
            </div>
            <div className={'tw-col-span-2'}>notification</div>
        </div>
    );
}
