import type { Meta, StoryObj } from '@storybook/react';

import { CardClass } from '~/components/class/CardClass/index';

const meta: Meta<typeof CardClass> = {
    component: CardClass,
};

export default meta;

export const PrimaryCardClass: StoryObj<typeof CardClass> = {
    args: {
        imgSrc:'https://shub-storage.sgp1.cdn.digitaloceanspaces.com/profile_images/44-01.jpg',
        title: 'Toan 12',
        id:'abcde'
    },
};
