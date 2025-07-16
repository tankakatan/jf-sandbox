import type { Region } from "../region/enums";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  region: Region;
  isActive: boolean;
};

export type UserData = User & { id?: number };

export type UserFormData = {
  firstName: string;
  lastName: string;
  region: Region;
  isActive: boolean;
};
