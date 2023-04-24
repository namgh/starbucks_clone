import React from "react";

type SearchKeyword = {
  keyword?: string | string[];
};

export default function SearchResultInfo({
  keyword = "default",
}: SearchKeyword) {
  return (
    <div className="header-sub search-info">
      <p className="serach-keyword">&quot;{keyword}&quot;의 검색결과</p>
    </div>
  );
}
