import type { Meta, StoryObj } from "@storybook/react-vite";
import { users } from "@/entities/user/model/fixtures";
import UserList from "./index";

const meta = {
  component: UserList,
} satisfies Meta<typeof UserList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { users } };
