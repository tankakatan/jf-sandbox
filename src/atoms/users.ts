import { atom, useAtomValue, useSetAtom } from "jotai";
import { atomFamily, atomWithStorage } from "jotai/utils";
import type { User } from "../@types";
import { users as defaultUserList } from "../fixtures";

const userListAtom = atomWithStorage<User[]>("users", defaultUserList);

// It is crucial to use `atomFamily` here, as it caches the result and prevents
// falling into an infinite re-render loop
const userByIdAtom = atomFamily((id: number) =>
  atom((get) => get(userListAtom).find((u) => u.id === id)),
);

const updateUserAtom = atom(null, (get, set, updatedUser: User) =>
  set(
    userListAtom,
    get(userListAtom).map((u) => (u.id === updatedUser.id ? updatedUser : u)),
  ),
);

const deleteUserAtom = atom(null, (get, set, userId: number) =>
  set(
    userListAtom,
    get(userListAtom).filter((u) => u.id !== userId),
  ),
);

// API:
export const useUserList = () => useAtomValue(userListAtom);
export const useUserById = (id: number) => useAtomValue(userByIdAtom(id));
export const useUpdateUser = () => useSetAtom(updateUserAtom);
export const useDeleteUser = () => useSetAtom(deleteUserAtom);
