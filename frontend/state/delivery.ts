import { deliveryListType } from "@/types/types";
import { atom } from "recoil";

export const deliveryListState = atom<deliveryListType>({
  key: "deliveryList",
  default: [],
});
