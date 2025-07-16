import { useSetAtom } from "jotai";
import { deleteUserAtom, upsertUserAtom } from "./atoms";

export const useUpsertUser = () => useSetAtom(upsertUserAtom);
export const useDeleteUser = () => useSetAtom(deleteUserAtom);
