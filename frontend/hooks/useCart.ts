import { frozenCartListState, generalCartListState } from "@/state/cart";
import { recentSearchKeyword } from "@/state/recentKeywordState";
import { cartListType } from "@/types/types";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";

export function useCart(title: string) {
  const [frozenCart, setFrozenCart] =
    useRecoilState<cartListType>(frozenCartListState);
  const [generalCart, setGeneralCart] =
    useRecoilState<cartListType>(generalCartListState);

  if (title === "일반상품") {
    return [generalCart, setGeneralCart] as const;
  } else {
    return [frozenCart, setFrozenCart] as const;
  }
}
