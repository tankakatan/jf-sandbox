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

const upsertUserAtom = atom(null, (get, set, user: User) => {
  const list = get(userListAtom);
  if (!user.id || !list.some((u) => u.id === user.id)) {
    set(userListAtom, [{ ...user, id: Date.now() }, ...list]);
  } else {
    set(userListAtom, list.map((u) => (u.id === user.id ? user : u)));
  }
});

const deleteUserAtom = atom(null, (get, set, userId: number) =>
  set(
    userListAtom,
    get(userListAtom).filter((u) => u.id !== userId),
  ),
);

// API:
export const useUserList = () => useAtomValue(userListAtom);
export const useUserById = (id: number) => useAtomValue(userByIdAtom(id));
export const useUpsertUser = () => useSetAtom(upsertUserAtom);
export const useDeleteUser = () => useSetAtom(deleteUserAtom);
