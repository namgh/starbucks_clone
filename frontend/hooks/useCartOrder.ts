import { cartOrder } from "@/state/cart";
import { cartListType } from "@/types/types";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";

export function useCartOrder() {
  const [isInitial, setIsInitial] = useState(true);
  const cart = useRecoilValue(cartOrder);

  useEffect(() => {
    setIsInitial(false);
  });

  return isInitial === true ? ([] as cartListType) : cart;
}
