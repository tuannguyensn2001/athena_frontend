import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { create } from 'zustand';

interface Store {
    isFirstPostAppear: boolean;
    setFirstPostAppear: (val: boolean) => void;
}

export const useNewsfeedStore = create<Store>()(
    devtools(
        immer((set) => ({
            isFirstPostAppear: false,
            setFirstPostAppear: (val) => {
                set((state) => {
                    state.isFirstPostAppear = val;
                });
            },
        })),
    ),
);
