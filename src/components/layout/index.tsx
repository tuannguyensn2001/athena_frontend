import React from 'react';
import { Header } from '~/components/layout/header';

export function withLayout<T extends Record<string, never>>(
    Component: React.ComponentType<T>,
) {
    return function (props: T) {
        return (
            <div className={'tw-min-h-screen '}>
                <Header />
                <main>
                    <Component {...props} />
                </main>
            </div>
        );
    };
}
