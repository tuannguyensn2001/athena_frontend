import type { Meta, StoryObj } from '@storybook/react';

import { CardClass } from '~/components/class/CardClass/index';

const meta: Meta<typeof CardClass> = {
    component: CardClass,
};

export default meta;

export const PrimaryCardClass: StoryObj<typeof CardClass> = {
    args: {},
};
