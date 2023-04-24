import { cartListType } from "@/types/types";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const generalCartListState = atom<cartListType>({
  key: "generalCart",
  default: [],
});

export const frozenCartListState = atom<cartListType>({
  key: "frozenCart",
  default: [],
});

export const cartOrder = atom<cartListType>({
  key: "cartOrder",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const deliveryPrice = atom<number>({
  key: "deliveryPrice",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const cartCount = atom<number>({
  key: "cartCount",
  default: 0,
});
