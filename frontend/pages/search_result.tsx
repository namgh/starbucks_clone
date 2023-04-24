/** @jsxImportSource @emotion/react */

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SelectOrder from "@/components/ui/SelectOrder";
import axios from "axios";
import { productType } from "@/types/types";
import ProductContainerGrid from "@/components/layouts/ProductContainerGrid";
import Config from "@/configs/config.export";
import Filter from "@/components/layouts/Filter";
import ToTheTop from "@/components/ui/ToTheTop";

export default function SearchResult() {
  const router = useRouter();
  const { query } = useRouter();
  const { baseUrl } = Config();

  const [allItem, setAllItem] = useState<productType[]>([]); // 키워드 검색결과 전체
  const [itemList, setItemList] = useState<productType[]>([]); // 현재 조건에 맞는 아이템
  const [result, setResult] = useState<boolean>(false);

  /** 초기 데이터 세팅 */
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const getData = async () => {
      const result = await axios.get(
        `${baseUrl}/api/product/n/search/${query.keyword}`
      );
      if (result.data !== "") {
        setItemList([...result.data]);
        setAllItem([...result.data]);
        setResult(true);
      } else {
        setResult(false); // 검색결과가 없음
      }
    };
    getData();
  }, [router.isReady, query.keyword, baseUrl]);

  return (
    <>
      {result === false ? (
        <div style={{ textAlign: "center", marginTop: "60%" }}>
          <p>검색 결과가 없습니다.</p>
        </div>
      ) : (
        <>
          <ToTheTop />
          <div className={result ? "" : "hide"}>
            <Filter
              allItem={allItem}
              setAllItem={setAllItem}
              itemList={itemList}
              setItemList={setItemList}
            />
            {/* 정렬 기준 */}
            <SelectOrder itemList={itemList} setItemList={setItemList} />
          </div>

          {/* 상품 출력 */}
          {itemList.length !== 0 ? (
            <ProductContainerGrid itemList={itemList} />
          ) : (
            <div style={{ textAlign: "center", marginTop: "30%" }}>
              <p>조회되는 상품이 없습니다.</p>
            </div>
          )}
        </>
      )}
    </>
  );
}
