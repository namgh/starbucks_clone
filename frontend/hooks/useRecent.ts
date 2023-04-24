import { recentSearchKeyword } from "@/state/recentKeywordState";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";

export function useRecent() {
  const [isInitial, setIsInitial] = useState(true);
  const [keyword, setKeyword] = useRecoilState(recentSearchKeyword);

  useEffect(() => {
    setIsInitial(false);
  });

  return [isInitial === true ? [] : keyword, setKeyword] as const;
}
