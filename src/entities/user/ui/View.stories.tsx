import type { Meta, StoryObj } from "@storybook/react-vite";

import View from "./View";

const meta = {
  component: View,
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { id: 0 },
};
