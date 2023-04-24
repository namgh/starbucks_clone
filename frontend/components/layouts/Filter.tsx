/** @jsxImportSource @emotion/react */

import Config from "@/configs/config.export";
import { store_subhead, middleCategory } from "@/data/StaticData";
import useFilter from "@/hooks/useFilter";
import { useRecent } from "@/hooks/useRecent";
import { recentSearchKeyword } from "@/state/recentKeywordState";
import { bigCategory, productType } from "@/types/types";
import { css } from "@emotion/react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import SearchHeader from "../widgets/SearchHeader";
import StoreHeadFilter from "../widgets/StoreHeadFilter";
import Image from "next/image";

export default function Filter(props: {
  allItem: productType[];
  setAllItem: Dispatch<SetStateAction<productType[]>>;
  itemList: productType[];
  setItemList: Dispatch<SetStateAction<productType[]>>;
}) {
  const router = useRouter();
  const { query } = useRouter();
  const { baseUrl } = Config();
  const { allItem, setAllItem, itemList, setItemList } = props;

  const [recentSearchKeywords] = useRecoilValue(recentSearchKeyword);

  const [categoryList, setCatogoryList] = useState<bigCategory[]>([]);

  const [volumeKeyword, setVolumeKeyword] = useState<string[]>([]);
  const [priceKeyword, setPriceKeyword] = useState<string[]>([]);
  const [categoryKeyword, setCategoryKeyword] = useState<string[]>([]);
  const [seasonKeyword, setSeasonKeyword] = useState<string[]>([]);
  const [isNullKeyword, setIsNullKeyword] = useState<boolean>(true);

  const [bItemList, setBItemList] = useState<productType[]>([]);
  const vItemList = useFilter(requestUrl("v"), volumeKeyword);
  const cItemList = useFilter(requestUrl("c"), categoryKeyword);
  const sItemList = useFilter(requestUrl("s"), seasonKeyword);
  const [pItemList, setPItemList] = useState<productType[]>([]);

  /** 대분류 필터링 */
  useEffect(() => {
    axios
      .get(`${baseUrl}/api/product/n/search/type/${query.keyword}`)
      .then((res) => {
        setCatogoryList([...res.data]);
      });

    axios
      .get(`${baseUrl}/api/product/n/search/c?filter=${query.bigCategory}`)
      .then((res) => {
        setBItemList(res.data);
      });

    handleReset();
  }, [query.bigCategory]);

  /** 키워드 변경 */
  useEffect(() => {
    createUrl();
    if (
      volumeKeyword.length === 0 &&
      priceKeyword.length === 0 &&
      categoryKeyword.length === 0 &&
      seasonKeyword.length === 0
    ) {
      setIsNullKeyword(true);
    } else {
      setIsNullKeyword(false);
    }
  }, [volumeKeyword, priceKeyword, categoryKeyword, seasonKeyword]);

  /** 보여줄 아이템 리스트 변경 */
  useEffect(() => {
    let items = [...allItem];
    if (bItemList) {
      items = items.filter((x) => isIn(bItemList, x.productId));
    }
    if (volumeKeyword.length !== 0) {
      items = items.filter((x) => isIn(vItemList, x.productId));
    }
    if (priceKeyword.length !== 0) {
      items = items.filter((x) => isIn(pItemList, x.productId));
    }
    if (categoryKeyword.length !== 0) {
      items = items.filter((x) => isIn(cItemList, x.productId));
    }
    if (seasonKeyword.length !== 0) {
      items = items.filter((x) => isIn(sItemList, x.productId));
    }
    setItemList([...items]);
  }, [bItemList, vItemList, pItemList, cItemList, sItemList]);

  /** 가격 필터링 */
  useEffect(() => {
    let items: productType[] = [];
    priceKeyword &&
      priceKeyword.map((p) => {
        if (p === "1만원미만") {
          items = [...items, ...allItem.filter((x) => x.price < 10000)];
        } else if (p === "1만원대") {
          items = [
            ...items,
            ...allItem.filter((x) => x.price >= 10000 && x.price < 20000),
          ];
        } else if (p === "2만원대") {
          items = [
            ...items,
            ...allItem.filter((x) => x.price >= 20000 && x.price < 30000),
          ];
        } else if (p === "3만원대") {
          items = [
            ...items,
            ...allItem.filter((x) => x.price >= 30000 && x.price < 40000),
          ];
        } else if (p === "4만원대") {
          items = [
            ...items,
            ...allItem.filter((x) => x.price >= 40000 && x.price < 50000),
          ];
        } else if (p === "5만원이상") {
          items = [...items, ...allItem.filter((x) => x.price >= 50000)];
        }
      });
    setPItemList([...items]);
  }, [priceKeyword]);

  const createUrl = () => {
    let url =
      router.pathname +
      "?keyword=" +
      getQuery(router.query.keyword, recentSearchKeywords) +
      "&bigCategory=" +
      getQuery(router.query.bigCategory, "전체");
    volumeKeyword.map((k) => (url = url + "&volume=" + k));
    priceKeyword.map((k) => (url = url + "&price=" + k));
    categoryKeyword.map((k) => (url = url + "&category=" + k));
    seasonKeyword.map((k) => (url = url + "&season=" + k));

    router.push(url);
  };
  function requestUrl(type: string): string {
    let url = query.keyword + "/" + type + "?";

    if (type === "v") {
      volumeKeyword.map((key) => (url = url + "filter=" + key + "&"));
    } else if (type === "c") {
      categoryKeyword.map((key) => (url = url + "filter=" + key + "&"));
    } else if (type === "s") {
      seasonKeyword.map((key) => (url = url + "filter=" + key + "&"));
    }
    return url;
  }

  const handleDelete = (key: string) => {
    volumeKeyword.includes(key) &&
      setVolumeKeyword([...volumeKeyword.filter((el) => el !== key)]);
    priceKeyword.includes(key) &&
      setPriceKeyword([...priceKeyword.filter((el) => el !== key)]);
    categoryKeyword.includes(key) &&
      setCategoryKeyword([...categoryKeyword.filter((el) => el !== key)]);
    seasonKeyword.includes(key) &&
      setSeasonKeyword([...seasonKeyword.filter((el) => el !== key)]);
  };

  const handleReset = () => {
    setVolumeKeyword([]);
    setPriceKeyword([]);
    setCategoryKeyword([]);
    setSeasonKeyword([]);
  };

  const renderKeyword = (keywordList: string[]): JSX.Element[] => {
    const keywords =
      keywordList &&
      keywordList.map((keyword, idx) => (
        <button
          key={idx}
          css={buttonStyle}
          onClick={() => handleDelete(keyword)}
        >
          <p>{keyword}</p>
          <p style={{ marginLeft: "8px" }}>X</p>
        </button>
      ));
    return keywords;
  };

  return (
    <div id="store-head" className="search-result">
      <div className="first-section"></div>
      {categoryList.length !== 0 && <SearchHeader itemList={categoryList} />}

      {/* 용량 */}
      {(query.bigCategory?.includes("텀블러/보온병") ||
        query.bigCategory?.includes("머그/컵")) && (
        <StoreHeadFilter
          data={store_subhead[2]}
          setFilterKeyword={setVolumeKeyword}
          filterKeyword={volumeKeyword}
        />
      )}
      {/* 가격 */}
      <StoreHeadFilter
        data={store_subhead[0]}
        setFilterKeyword={setPriceKeyword}
        filterKeyword={priceKeyword}
      />
      {/* 중분류 카테고리 */}
      <StoreHeadFilter
        data={middleCategory[categoryIdx(query.bigCategory)]}
        setFilterKeyword={setCategoryKeyword}
        filterKeyword={categoryKeyword}
      />
      {/* 시즌 */}
      <StoreHeadFilter
        data={store_subhead[1]}
        setFilterKeyword={setSeasonKeyword}
        filterKeyword={seasonKeyword}
      />
      {!isNullKeyword && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image
            src="/images/icons/reload.png"
            alt="초기화 버튼"
            width={20}
            height={20}
            style={{ padding: "5px", marginLeft: "15px" }}
            onClick={handleReset}
          />

          <div id="search-result-filter" style={{ height: "32px" }}>
            {renderKeyword(volumeKeyword)}
            {renderKeyword(priceKeyword)}
            {renderKeyword(categoryKeyword)}
            {renderKeyword(seasonKeyword)}
          </div>
        </div>
      )}
    </div>
  );
}

const buttonStyle = css`
  vertical-align: baseline;
  background-color: var(--color-light-green);
  color: var(--color-white);
  border: none;
  border-radius: 3px;
  padding: 7px 15px;
  white-space: nowrap;
`;

function getQuery(
  name: string | string[] | undefined,
  replaceValue: string
): string | string[] {
  if (typeof name === "undefined") {
    return replaceValue;
  } else {
    return name;
  }
}

function categoryIdx(name: string | string[] | undefined): number {
  if (name === undefined) {
    return 6;
  }
  if (typeof name === "object") {
    name = name[0];
  }
  return middleCategory.findIndex((Object) => Object.bigType === name);
}

function isIn(itemList: productType[], x: number) {
  let itemIdList: number[] = [];
  itemList && itemList.map((item) => itemIdList.push(item.productId));
  return itemIdList.includes(x);
}
