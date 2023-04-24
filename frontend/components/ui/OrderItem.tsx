/** @jsxImportSource @emotion/react */

import { orderItemType } from "@/types/types";
import { css } from "@emotion/react";
import Image from "next/image";

export default function OrderItem(props: { item: orderItemType }) {
  return (
    <div css={product}>
      <Image
        src={`https://storage.googleapis.com/ghbt/product_thumbnail/${props.item.productThumbnail}`}
        width={110}
        height={110}
        alt={"초기화 버튼"}
        css={img}
      />
      <div style={{ padding: "0px 20px " }}>
        <p style={{ margin: "0px", fontSize: "0.85rem" }}>
          {props.item.productName}
        </p>
        <p style={{ fontSize: "0.75rem", opacity: "0.6" }}>
          {props.item.productQuantity}개
        </p>
      </div>
    </div>
  );
}

const product = css`
  display: flex;
  justify-content: flex-start;
  padding-bottom: 20px;
`;

const img = css`
  border-radius: 15%;
  border: 1px solid rgba(128, 128, 128, 0.381);
`;
