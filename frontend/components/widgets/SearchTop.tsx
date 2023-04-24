import React, { useState } from "react";
import { useRouter } from "next/router";
import { useRecent } from "@/hooks/useRecent";
import CloseIcon from "../ui/CloseIcon";
import Image from "next/image";
import Swal from "sweetalert2";

export interface ChildProps {
  isView: Boolean;
  setIsView: React.Dispatch<React.SetStateAction<Boolean>>; //setIsView의 타입
}

export default function SearchTop() {
  // 검색화면 상단 검색창

  const router = useRouter();
  const [word, setWord] = useState<string>("");

  const [recentSearchKeywords, setRecentSearchKeywords] = useRecent();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resultHandler();
  };

  const typingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };

  function resultHandler() {
    if (word === "") {
      Swal.fire({
        icon: "warning",
        text: "검색어를 입력해주세요.",
      });
    } else {
      putKeyword(word);
      router.push(`/search_result?keyword=${word}&bigCategory=${"전체"}`);
    }
  }

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
    <div className="search-top">
      <div className="search-bar">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="검색어를 입력해 주세요."
            onChange={typingHandler}
          />
        </form>
      </div>
      <div className="search-icons">
        <ul>
          <li>
            <Image
              src="/images/icons/search.svg"
              onClick={resultHandler}
              alt="검색아이콘"
              width={20}
              height={20}
            />
          </li>
          <li>
            <CloseIcon onClickHandler={() => router.back()} />
          </li>
        </ul>
      </div>
    </div>
  );
}
