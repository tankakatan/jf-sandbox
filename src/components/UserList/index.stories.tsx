import type { Meta, StoryObj } from "@storybook/react-vite";
import { Region } from "../../shared";
import Index from "./index";

const meta = {
  component: Index,
} satisfies Meta<typeof Index>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    users: [
      {
        id: 0,
        firstName: "John",
        lastName: "Connor",
        region: Region.UnitedStates,
        isActive: true,
      },
    ],
  },
};
