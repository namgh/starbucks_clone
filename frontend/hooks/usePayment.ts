import { payReceipt } from "@/state/receipt";
import { receipt } from "@/types/types";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";

export function usePayment() {
  const [isInitial, setIsInitial] = useState(true);
  const [receipt, setReceipt] = useRecoilState(payReceipt);

  useEffect(() => {
    setIsInitial(false);
  });

  return [isInitial === true ? ({} as receipt) : receipt, setReceipt] as const;
}
