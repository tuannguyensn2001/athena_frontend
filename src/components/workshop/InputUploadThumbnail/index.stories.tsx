import type { Meta, StoryObj } from '@storybook/react';

import { InputUploadThumbnail } from '~/components/workshop/InputUploadThumbnail/index';

const meta: Meta<typeof InputUploadThumbnail> = {
    component: InputUploadThumbnail,
};

export default meta;

type Story = StoryObj<typeof InputUploadThumbnail>;

export const PrimaryInputUploadThumbnail: Story = {
    args: {},
};
