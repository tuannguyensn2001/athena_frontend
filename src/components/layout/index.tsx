import type { ComponentType } from 'react';
import { Header } from '~/components/layout/header';

export function withLayout<T extends Record<string, never>>(
    Component: ComponentType<T>,
) {
    return Result;

    function Result(props: T) {
        return (
            <div>
                <Header />
                <main>
                    <Component {...props} />
                </main>
            </div>
        );
    }
}
