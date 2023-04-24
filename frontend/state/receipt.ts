import { receipt } from "@/types/types";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({});

export const payReceipt = atom<receipt>({
  key: "receipt",
  default: {
    purchaseList: [],
    shippingAddressId: 0,
    shippingPrice: 0,
    paymentType: "",
    cashReceipts: "",
    totalPrice: 0,
  },
  effects_UNSTABLE: [persistAtom],
});
