/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { cartListType } from "@/types/types";
import Price from "../ui/Price";
import Image from "next/image";

interface orderItems {
  detailOn: boolean;
  itemList: cartListType;
}

export default function PayProductDetail({ detailOn, itemList }: orderItems) {
  const productDetails = css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: #f4f4f4;
  `;

  return (
    <>
      {detailOn &&
        itemList.map((item, index) => (
          <div css={productDetails} key={index}>
            <Image
              src={`https://storage.googleapis.com/ghbt/product_thumbnail/${item.product.thumbnailUrl}`}
              width={70}
              height={70}
              alt="상품이미지"
              style={{
                borderRadius: "15%",
                margin: "10px 20px 10px 0px",
                border: "1px solid rgba(128, 128, 128, 0.381)",
              }}
            />
            <div>
              <p>{item.product.name}</p>
              <div
                style={{ color: "var(--color-gray-text)", fontSize: "11px" }}
              >
                주문수량: {item.quantity}개
              </div>
              <p style={{ fontWeight: "700" }}>
                <Price price={item.product.price * item.quantity} />
              </p>
            </div>
          </div>
        ))}
      {!detailOn && itemList[0] && (
        <div css={productDetails}>
          <Image
            src={`https://storage.googleapis.com/ghbt/product_thumbnail/${itemList[0].product.thumbnailUrl}`}
            width={70}
            height={70}
            alt="상품이미지"
            style={{
              borderRadius: "15%",
              margin: "10px 20px 10px 0px",
              border: "1px solid rgba(128, 128, 128, 0.381)",
            }}
          />
          <div>
            <p style={{ fontWeight: "700" }}>
              {itemList.length > 1
                ? `${itemList[0].product.name}외
              ${itemList.length - 1}개`
                : `${itemList[0].product.name}`}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
