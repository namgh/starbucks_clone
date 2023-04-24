/** @jsxImportSource @emotion/react */

import { cartListType, productType } from "@/types/types";
import { css, keyframes } from "@emotion/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { cartOrder } from "../../state/cart";
import Button from "../ui/Button";
import ItemAmount from "../ui/ItemAmount";
import Price from "../ui/Price";

export default function ProductDetailSubmit(props: {
  price: number;
  productName: string;
  handleIsOpen: React.MouseEventHandler<HTMLDivElement>;
  itemCount: number;
  setItemCount: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { price, productName, handleIsOpen } = props;
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const totalPriceStyle = css`
    text-align: right;
    padding: 0 1rem;
    margin-bottom: 95px;
    font-weight: bold;
  `;

  return (
    <div onClick={handleIsOpen}>
      <ItemAmount
        price={price}
        label={productName}
        setTotalPrice={setTotalPrice}
        count={props.itemCount}
        setCount={props.setItemCount}
      />
      <p css={totalPriceStyle}>
        합계 <Price price={totalPrice} size="x-large" />
      </p>
    </div>
  );
}
