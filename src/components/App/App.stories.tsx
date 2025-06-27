import type { Meta, StoryObj } from '@storybook/react-vite';

import { App } from './App';

const meta = {
  component: App,
  argTypes: {
    label: { control: 'text' },
    trackColor: { control: 'color', name: 'Track Color' },
    rangeColor: { control: 'color', name: 'Range/Thumb Color' },
  },
} satisfies Meta<typeof App>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Label',
    trackColor: '#ccc',
    rangeColor: '#3182ce',
  },
};
