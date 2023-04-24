import { useRecent } from "@/hooks/useRecent";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import CloseIcon from "./CloseIcon";

type SearchedItem = {
  item?: string;
};

export default function LatestSearchItem({ item = "" }: SearchedItem) {
  const router = useRouter();

  const [recentSearchKeywords, setRecentSearchKeywords] = useRecent();

  const onClickHandler = () => {
    putKeyword(item);
    router.push({
      pathname: "/search_result",
      query: {
        keyword: `${item}`,
        bigCategory: `${"전체"}`,
      },
    });
  };

  const deleteHandler = () => {
    const res = recentSearchKeywords.filter((k) => k !== item);
    setRecentSearchKeywords([...res]);
  };

  function putKeyword(keyword: string) {
    //이미 있는 키워드 재검색 시 가장 앞으로 갱신
    if (recentSearchKeywords.includes(keyword)) {
      setRecentSearchKeywords([
        keyword,
        ...recentSearchKeywords.filter((k) => k !== keyword),
      ]);
    } else {
      // 없을 경우 앞에 추가
      setRecentSearchKeywords([keyword, ...recentSearchKeywords]);
      //추가했는데 개수가 10개 초과인 경우 제일 오래된 값 제거
      if (recentSearchKeywords.length >= 10) {
        let keywords: string[] = [keyword, ...recentSearchKeywords];
        keywords.pop();
        setRecentSearchKeywords([...keywords]);
      }
    }
  }

  return (
    <div className="keywords">
      <div onClick={onClickHandler}>{item}</div>
      <CloseIcon onClickHandler={deleteHandler} />
    </div>
  );
}
