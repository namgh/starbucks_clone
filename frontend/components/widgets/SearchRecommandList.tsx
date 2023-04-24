import React from "react";
import SearchRecommandItem from "../ui/SearchRecommandItem";

export default function SearchRecommandList() {
  return (
    <div className="recommand-tag">
      <div className="recommand-tage-title">
        <h3>추천 태그</h3>
      </div>
      <div className="tag-list">
        <SearchRecommandItem item="케이크" />
        <SearchRecommandItem item="리유저블" />
        <SearchRecommandItem item="도트머그" />
        <SearchRecommandItem item="스프링" />
      </div>
    </div>
  );
}
