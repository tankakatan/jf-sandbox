import type { Meta, StoryObj } from '@storybook/react-vite';

import Index from './index';

const meta = {
  component: Index,
} satisfies Meta<typeof Index>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    user: {
      id: 0,
      firstName: 'John',
      lastName: 'Connor',
      region: 'US',
      isActive: true,
    }
  }
};