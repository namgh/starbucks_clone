/** @jsxImportSource @emotion/react */

import Config from "@/configs/config.export";
import { store_subhead, middleCategory } from "@/data/StaticData";
import { useDidMountEffect } from "@/hooks/useDidmount";
import { categoryType, productType } from "@/types/types";
import { css } from "@emotion/react";
import axios from "axios";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import AllItemHeader from "../widgets/AllItemHeader";
import StoreHeadFilter from "../widgets/StoreHeadFilter";
import Image from "next/image";

export default function AllFilter(props: {
  allItem: productType[];
  setAllItem: Dispatch<SetStateAction<productType[]>>;
  itemList: productType[];
  setItemList: Dispatch<SetStateAction<productType[]>>;
  setPage: Dispatch<SetStateAction<number>>;
  setIsData: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const { query } = useRouter();
  const { baseUrl } = Config();
  const { allItem, setAllItem, itemList, setItemList, setPage, setIsData } =
    props;

  const [categoryList, setCatogoryList] = useState<categoryType[]>([]);

  const [volumeKeyword, setVolumeKeyword] = useState<string[]>([]);
  const [priceKeyword, setPriceKeyword] = useState<string[]>([]);
  const [categoryKeyword, setCategoryKeyword] = useState<string[]>([]);
  const [seasonKeyword, setSeasonKeyword] = useState<string[]>([]);
  const [isNullKeyword, setIsNullKeyword] = useState<boolean>(true);

  const [pItemList, setPItemList] = useState<productType[]>([]);
  const [cItemList, setCItemList] = useState<productType[]>([]);
  const [sItemList, setSItemList] = useState<productType[]>([]);
  const [vItemList, setVItemList] = useState<productType[]>([]);

  // 키워드 기반으로 url 세팅
  const createUrl = () => {
    let url =
      router.pathname +
      "?" +
      "bigCategory=" +
      getQuery(router.query.bigCategory, "전체");
    volumeKeyword.map((k) => (url = url + "&volume=" + k));
    priceKeyword.map((k) => (url = url + "&price=" + k));
    categoryKeyword.map((k) => (url = url + "&category=" + k));
    seasonKeyword.map((k) => (url = url + "&season=" + k));

    router.push(url);
  };

  // url 기반으로 키워드 세팅
  const settingKeyword = () => {
    const queries = router.query;
    queries.category &&
      getQueries(queries.category).map((k) =>
        setCategoryKeyword([...categoryKeyword, k])
      );
    queries.season &&
      getQueries(queries.season).map((k) =>
        setSeasonKeyword([...seasonKeyword, k])
      );
    queries.volume &&
      getQueries(queries.volume).map((k) =>
        setVolumeKeyword([...volumeKeyword, k])
      );
    queries.price &&
      getQueries(queries.price).map((k) =>
        setPriceKeyword([...priceKeyword, k])
      );
  };

  // 무한 스크롤로 전체 아이템이 추가된 경우 다시 필터링
  useDidMountEffect(() => {
    let items = [...allItem];
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
  }, [allItem]);

  /** 대분류 필터링
   * 대분류가 바뀌면, 원래 있던 데이터를 지우고 대분류 1페이지로 다시 요청한다.
   */
  useEffect(() => {
    axios.get(`${baseUrl}/api/category`).then((res) => {
      setCatogoryList(res.data.filter((c: categoryType) => c.type === "대"));
    });
  }, [baseUrl]);

  useEffect(() => {
    axios.get(`${baseUrl}/api/category`).then((res) => {
      setCatogoryList(res.data.filter((c: categoryType) => c.type === "대"));
    });

    setPage(0);
    setIsData(false);

    if (query.bigCategory === "전체") {
      axios.get(`${baseUrl}/api/product?page=0`).then((result) => {
        if (result.data !== "") {
          setAllItem([...result.data.content]);
          setItemList([...result.data.content]);
          setIsData(!result.data.last);
        }
      });
    } else {
      axios
        .get(
          `${baseUrl}/api/product/search/c?filter=${
            query.bigCategory
          }&page=${0}`
        )
        .then((res) => {
          setAllItem([...res.data.content]);
          setIsData(!res.data.last);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    handleReset(); // 우선 초기화하고
    createUrl(); // url을 새로 만들고
    settingKeyword(); // 키워드를 다시 세팅한다
  }, [query.bigCategory, baseUrl, setAllItem, setIsData, setItemList, setPage]);

  // 키워드 컨테이너 보여줄지 말지 여부 판단
  useDidMountEffect(() => {
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
  useDidMountEffect(() => {
    let items = [...allItem];
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
  }, [vItemList, pItemList, cItemList, sItemList]);

  /** 가격 필터링 */
  useDidMountEffect(() => {
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
  }, [priceKeyword, allItem]);

  /** 볼륨 */
  useDidMountEffect(() => {
    let items: productType[] = [];
    volumeKeyword &&
      volumeKeyword.map((k) => {
        items = [...items, ...allItem.filter((x) => x.volume === k)];
      });
    setVItemList([...items]);
  }, [volumeKeyword, allItem]);

  /** 중 카테고리 */
  useDidMountEffect(() => {
    let items: productType[] = [];
    categoryKeyword &&
      categoryKeyword.map((k) => {
        items = [...items, ...allItem.filter((x) => x.subType === k)];
      });
    setCItemList([...items]);
  }, [categoryKeyword, allItem]);

  /** 시즌 */
  useDidMountEffect(() => {
    let items: productType[] = [];
    seasonKeyword &&
      seasonKeyword.map((k) => {
        items = [...items, ...allItem.filter((x) => x.season === k)];
      });
    setSItemList([...items]);
  }, [seasonKeyword, allItem]);

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
    <div
      id="store-head"
      className="search-result"
      style={{ marginTop: "50px" }}
    >
      {categoryList.length !== 0 && <AllItemHeader itemList={categoryList} />}

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
            width={20}
            height={20}
            alt={"초기화 버튼"}
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

function getQueries(name: string | string[]): string[] {
  if (typeof name === "string") {
    const newName = [name];
    return newName;
  } else return name;
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
