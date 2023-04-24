import { orderType } from "@/types/types";
import { atom } from "recoil";

export const orderState = atom<orderType>({
  key: "orderState",
  default: {
    orderId: "",
    addressNickname: "",
    baseAddress: "",
    cashReceipts: "",
    detailAddress: "",
    notice: "",
    paymentType: "",
    phoneNumber1: "",
    purchaseList: [],
    receiver: "",
    shippingPrice: 0,
    totalPrice: 0,
    zipCode: "",
  },
});
