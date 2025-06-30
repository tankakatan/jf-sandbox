import type { Region } from "../shared";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  region: Region;
  isActive: boolean;
};
