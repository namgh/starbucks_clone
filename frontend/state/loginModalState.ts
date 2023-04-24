import { atom } from "recoil";

export const loginModalState = atom<Boolean>({
  key: "loginModalState",
  default: true,
});
