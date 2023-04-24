import { atom } from "recoil";

export const contentsModalState = atom<boolean>({
  key: "contentsModalState",
  default: false,
});
