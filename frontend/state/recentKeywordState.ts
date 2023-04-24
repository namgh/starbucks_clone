import { useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const recentSearchKeyword = atom<string[]>({
  key: "keyword",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
