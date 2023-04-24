import { useRecent } from "@/hooks/useRecent";
import { recentSearchKeyword } from "@/state/recentKeywordState";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";

type RecommandItem = {
  item?: string;
};

export default function SearchRecommandItem({ item = "" }: RecommandItem) {
  const router = useRouter();

  const [recentSearchKeywords, setRecentSearchKeywords] = useRecent();

  const onClickHandler = () => {
    if (item === "") {
      Swal.fire({
        icon: "warning",
        text: "검색어를 입력해주세요.",
      });
    } else {
      putKeyword(item);
      router.push(`/search_result?keyword=${item}&bigCategory=${"전체"}`);
    }
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
    <button className="tag-list-item" type="button" onClick={onClickHandler}>
      #{item}
    </button>
  );
}
