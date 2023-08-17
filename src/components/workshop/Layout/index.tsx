import { Outlet, useMatches } from 'react-router-dom';
import { Sidebar } from '~/components/workshop/Sidebar';
import styles from './style.module.scss';
import type { RefObject } from 'react';
import { useRef } from 'react';
import clsx from 'clsx';

export type OutletContext = {
    container: RefObject<HTMLDivElement>;
};

export function WorkshopLayout() {
    const container = useRef<HTMLDivElement>(null);

    const [_, { id }] = useMatches();

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
                    },
                ])}
            >
                <Outlet context={{ container }} />
            </div>
            <div className={'tw-col-span-2'}>notification</div>
        </div>
    );
}
