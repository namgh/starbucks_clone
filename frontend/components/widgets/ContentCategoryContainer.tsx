/** @jsxImportSource @emotion/react */

import Config from "@/configs/config.export";
import { categoryType } from "@/types/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CategoryButton from "../ui/CategoryButton";
import Loading from "../ui/Loading";
import RightArrowMenu from "../ui/RightArrowMenu";
import { css } from "@emotion/react";
import { contentsModalState } from "@/state/contentsModalState";
import { useSetRecoilState } from "recoil";

export default function ContentCategoryContainer() {
  const [loading, setLoading] = useState<boolean>(true);
  const setContentsIsView = useSetRecoilState(contentsModalState);
  const [categoryList, setCatogoryList] = useState<categoryType[]>();
  const { baseUrl } = Config();

  useEffect(() => {
    const getCategory = async () => {
      const result = await axios
        .get(`${baseUrl}/api/category`)
        .then((res) =>
          setCatogoryList(res.data.filter((c: categoryType) => c.type === "대"))
        )
        .catch((err) => console.log(err));
      setLoading(false);
    };
    getCategory();
  }, [baseUrl]);

  return (
    <section css={categorySection} id="category-items">
      <div
        className="get-all-items"
        onClick={() => {
          document.body.style.overflow = "unset";
          setContentsIsView(false);
        }}
      >
        <RightArrowMenu menuName={"전체 상품 보기"} link={"/store"} />
      </div>

      {loading ? (
        <div
          style={{
            display: "block",
            width: "100vw",
            height: "280px",
            padding: "130px",
          }}
        >
          <Loading />
        </div>
      ) : (
        <div className="contents-container">
          {categoryList &&
            categoryList.map((c) => <CategoryButton key={c.id} category={c} />)}
        </div>
      )}
    </section>
  );
}

const categorySection = css`
  background-color: white;
  margin: 0px;
  padding: 0px 14px 0px 14px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  padding-top: 1rem;
  // position: absolute;
  /* width: calc(100vw - 28px); */
  // top: calc(50vh - 25%);
  & img {
    border-radius: 70%;
    display: block;
    margin: 0px auto;
  }
  @media screen and (max-height: 700px) {
    padding-top: 0;
  }
`;
