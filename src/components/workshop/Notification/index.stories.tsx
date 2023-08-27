import type { Meta, StoryObj } from '@storybook/react';

import { Notification } from '~/components/workshop/Notification/index';

const meta: Meta<typeof Notification> = {
    component: Notification,
};

export default meta;

type Story = StoryObj<typeof Notification>;

export const PrimaryNotification: Story = {
    args: {},
};
