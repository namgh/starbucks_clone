import { cartListType } from "@/types/types";
import React from "react";
import Price from "../ui/Price";

export default function PayInfo(props: {
  itemPrice: number;
  delivery: number;
}) {
  return (
    <section id="pay-info">
      <div>
        <p>결제 정보</p>
      </div>
      <div className="pay">
        <div className="pay-price">
          <p className="title">주문 금액</p>
          <p className="title price">
            <Price price={props.itemPrice + props.delivery} />
          </p>
        </div>
        <div className="pay-price">
          <p>상품 금액</p>
          <p className="price">
            <Price price={props.itemPrice} />
          </p>
        </div>
        <div className="pay-price">
          <p>배송비</p>
          <p className="price">
            <Price price={props.delivery} />
          </p>
        </div>
      </div>
      <div className="pay">
        <div className="pay-price">
          <p className="title">할인 금액</p>
          <p className="title price">0원</p>
        </div>
        <div className="pay-price">
          <p>상품 할인</p>
          <p className="price">0원</p>
        </div>
      </div>
      <div className="pay">
        <div className="pay-price">
          <p className="title">결제 금액</p>
          <p className="title price">
            <Price price={props.delivery + props.itemPrice} />
          </p>
        </div>
        <div className="pay-price">
          <p>모바일 상품권</p>
          <p className="price">0원</p>
        </div>
      </div>
    </section>
  );
}
