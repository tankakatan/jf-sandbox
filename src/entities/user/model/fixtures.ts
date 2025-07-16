import { Region } from "@/entities/region/enums";

export const users = [
  {
    id: 1,
    firstName: "Alice",
    lastName: "Smith",
    region: Region.UnitedStates,
    isActive: true,
  },
  {
    id: 2,
    firstName: "Bob",
    lastName: "Johnson",
    region: Region.Canada,
    isActive: false,
  },
  {
    id: 3,
    firstName: "Charlie",
    lastName: "Brown",
    region: Region.UnitedKingdom,
    isActive: true,
  },
];
