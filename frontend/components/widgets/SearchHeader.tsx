import { bigCategory, categoryType } from "@/types/types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function SearchHeader(props: { itemList: bigCategory[] }) {
  const router = useRouter();

  const handlePushLink = (name: string | undefined) => {
    if (name === undefined) {
      name = "케이크";
    }
    router.push(
      `${router.pathname}?keyword=${router.query.keyword}&bigCategory=${name}`
    );
  };

  return (
    <div className="header-sub">
      <nav>
        <ul>
          <li
            key={0}
            className={
              router.query.bigCategory === "전체" ||
              router.query.bigCategory === undefined
                ? "active"
                : ""
            }
            onClick={() => handlePushLink("전체")}
          >
            전체
          </li>
          {props.itemList &&
            props.itemList.map((category: bigCategory, idx: number) => (
              <li
                key={idx}
                className={
                  router.query.bigCategory === category.typeName ? "active" : ""
                }
                onClick={() => handlePushLink(category.typeName)}
              >
                {category.typeName}({category.typeCount})
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
}
