import { Header } from './index';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Header> = {
    component: Header,
};

export default meta;

type Story = StoryObj<typeof Header>;

export const PrimaryHeader: Story = {
    args: {
        //👇 The args you need here will depend on your component
    },
};
