/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import BottomFixedContainer from "@/components/ui/BottomFixedContainer";
import Button from "@/components/ui/Button";
import { useRecoilValue } from "recoil";
import { orderState } from "@/state/orderState";
import Price from "@/components/ui/Price";
import OrderItem from "@/components/ui/OrderItem";
import { useRouter } from "next/router";
import { useCartOrder } from "@/hooks/useCartOrder";
import axiosApiInstance from "@/utils/axiosInstance";
import { useEffect } from "react";

export default function OrderComplete() {
  const order = useRecoilValue(orderState);
  const router = useRouter();
  const orderList = useCartOrder();

  useEffect(() => {
    orderList.map(
      (item) => item.id !== 0 && axiosApiInstance.delete(`/cart/${item.id}`)
    );
  }, [orderList]);

  return (
    <div id="order-complete">
      <div css={layout}>
        <h1 style={{ margin: "0" }}> 주문이 완료되었습니다. </h1>
        <h3 style={{ margin: "10px 0px 0px 0px" }}>
          주문번호: {order.orderId}
        </h3>
      </div>
      <div css={contents}>
        <h2>배송 정보</h2>

        <div id="pay-delivery" style={{ padding: "0" }}>
          <div className="delivery-info-title"></div>
          <div className="delivery-info">
            <div className="delivery-name">
              <div className="name">
                {order.receiver}{" "}
                {order.addressNickname === ""
                  ? ""
                  : `(${order.addressNickname})`}
              </div>
            </div>
            <p>
              ({order.zipCode}) {order.baseAddress} {order.detailAddress}
            </p>
            <p>{order.phoneNumber1}</p>
          </div>
          <div css={div}>{order.notice}</div>
        </div>
      </div>

      <div css={contents}>
        <h2>
          주문 상품{" "}
          <span style={{ color: "var(--color-light-green)" }}>
            ({order.purchaseList && order.purchaseList?.length})
          </span>
        </h2>
        {order.purchaseList &&
          order.purchaseList?.map((item, idx) => (
            <OrderItem item={item} key={idx} />
          ))}
      </div>

      <div css={contents} style={{ marginBottom: "70px" }}>
        <div css={price}>
          <div>
            <h2>결제 금액</h2>
          </div>
          <div>
            <h2>
              <Price price={order.totalPrice} />
            </h2>
          </div>
        </div>
        <div css={price}>
          <div>
            <p style={{ fontSize: "0.9rem" }}>카카오페이</p>
          </div>
          <div>
            <p style={{ fontSize: "0.9rem" }}>
              <Price price={order.totalPrice} />
            </p>
          </div>
        </div>
      </div>

      <BottomFixedContainer>
        <div css={buttonContainer}>
          <Button
            btnType="button"
            btnEvent={() => router.push("/store")}
            type="white"
          >
            쇼핑 계속하기
          </Button>
          <Button btnType="button" btnEvent={() => router.push("/")}>
            메인으로 가기
          </Button>
        </div>
      </BottomFixedContainer>
    </div>
  );
}

const layout = css`
  background-color: white;
  padding: 70px 20px 20px 20px;
  margin: 0;
`;

const contents = css`
  margin-top: 10px;
  background-color: white;
  padding: 20px;
`;

const div = css`
  margin: 5px 0px;
  padding: 15px 0px 5px 0px;
  border-top: 1px solid rgba(128, 128, 128, 0.381);
  font-size: 0.9rem;
`;

const price = css`
  display: flex;
  justify-content: space-between;
`;

const buttonContainer = css`
  display: flex;
  gap: 15px;
  padding: 0px 30px;
  align-items: center;
  justify-content: space-between;
`;
