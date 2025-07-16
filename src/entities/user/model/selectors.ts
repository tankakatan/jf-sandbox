import { useAtomValue } from "jotai";
import { userByIdAtom, userListAtom } from "./atoms";

export const useUserList = () => useAtomValue(userListAtom);
export const useUserById = (id: number) => useAtomValue(userByIdAtom(id));
