import { atom } from "jotai";
import { atomFamily, atomWithStorage } from "jotai/utils";
import type { User, UserData } from "../types";
import { users as defaultUserList } from "./fixtures";

export const userListAtom = atomWithStorage<User[]>("users", defaultUserList);
export const userByIdAtom = atomFamily((id: number) =>
  atom(get => (get(userListAtom) as User[]).find((u) => u.id === id)),
);

export const upsertUserAtom = atom(null, (get, set, user: UserData) => {
  const list = get(userListAtom) as User[];
  if (!user.id || !list.some((u) => u.id === user.id)) {
    set(userListAtom, [{ ...user, id: Date.now() }, ...list]);
  } else {
    set(
      userListAtom,
      list.map((u) => (u.id === user.id ? user : u)),
    );
  }
});

export const deleteUserAtom = atom(null, (get, set, userId: number) =>
  set(
    userListAtom,
    (get(userListAtom) as User[]).filter((u) => u.id !== userId),
  ),
);
