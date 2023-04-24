/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import PayProductDetail from "./PayProductDetail";
import { useRecoilValue } from "recoil";
import { cartOrder } from "../../state/cart";
import { cartListType } from "@/types/types";
import Image from "next/image";

interface orderItems {
  itemList: cartListType;
}

export default function PayProductList({ itemList }: orderItems) {
  const orderList = useRecoilValue(cartOrder);
  const [detailOn, setDetailOn] = useState(false);

  const payContainer = css`
    background-color: #f4f4f4;
    padding: 10px 14px;
  `;

  const payProductHeader = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f4f4f4;
  `;

  const showDetailHandler = () => {
    setDetailOn(!detailOn);
  };

  return (
    <div css={payContainer}>
      <div css={payProductHeader}>
        <div
          style={{ fontSize: "16px", fontWeight: "700", padding: "5px 0px" }}
        >
          상품내역
        </div>
        <div>
          <Image
            className="arrow"
            src={
              detailOn
                ? "/images/icons/upload.png"
                : "/images/icons/arrow-down-sign-to-navigate.png"
            }
            width={16}
            height={16}
            alt="화살표이미지"
            onClick={showDetailHandler}
          />
        </div>
      </div>
      {/* 주문 상품 목록 받아와서 맵돌리기: summary on off 필요 */}
      <PayProductDetail
        detailOn={detailOn ? true : false}
        itemList={orderList}
      />
    </div>
  );
}
