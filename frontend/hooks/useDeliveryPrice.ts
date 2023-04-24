import { deliveryPrice } from "@/state/cart";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";

export function useDeliveryPrice() {
  const [isInitial, setIsInitial] = useState(true);
  const cart = useRecoilValue(deliveryPrice);

  useEffect(() => {
    setIsInitial(false);
  });

  return isInitial === true ? 0 : cart;
}
