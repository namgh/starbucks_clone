/** @jsxImportSource @emotion/react */

import CartItemList from "@/components/layouts/CartItemList";
import {
  cartOrder,
  deliveryPrice,
  frozenCartListState,
  generalCartListState,
} from "@/state/cart";
import BottomFixedContainer from "@/components/ui/BottomFixedContainer";
import Button from "@/components/ui/Button";
import CartControlBar from "@/components/widgets/CartControlBar";
import { cartListType } from "@/types/types";
import { useEffect, useState } from "react";
import CartEmpty from "../components/widgets/CartEmpty";
import { css } from "@emotion/react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Config from "@/configs/config.export";
import { useRouter } from "next/router";
import Price from "@/components/ui/Price";
import Loading from "@/components/ui/Loading";
import axiosApiInstance from "@/utils/axiosInstance";
import { accessTokenState } from "@/state/accessTokenState";
import { useDidMountEffect } from "@/hooks/useDidmount";
import LoginRequired from "@/components/widgets/LoginRequired";
import Head from "next/head";
import Swal from "sweetalert2";

export default function Cart() {
  const { baseUrl } = Config();
  const [frozenCart, setFrozenCart] =
    useRecoilState<cartListType>(frozenCartListState);
  const [generalCart, setGeneralCart] =
    useRecoilState<cartListType>(generalCartListState);
  const [isLoading, setIsLoading] = useState(true);

  const accessToken = useRecoilValue(accessTokenState);

  const buttonContainer = css`
    display: flex;
    gap: 15px;
    padding: 0px 30px;
    align-items: center;
    justify-content: space-between;
  `;

  const submitPrice = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    font-weight: bolder;
    padding: 20px 30px 0px 30px;
  `;

  // 데이터 불러오기
  async function fetchGeneralData() {
    if (accessToken) {
      setTimeout(async () => {
        const generalResult = await axiosApiInstance
          .get(`cart/my_cart`, {
            headers: { Authorization: accessToken },
          })
          .catch((err) => {});
        if (generalResult) setGeneralCart(generalResult?.data);
        else setGeneralCart([]);
      }, 100);
    }
  }
  async function fetchFrozenData() {
    if (accessToken) {
      setTimeout(async () => {
        const frozenResult = await axiosApiInstance
          .get(`cart/my_cart/ice`, {
            headers: { Authorization: accessToken },
          })
          .catch((err) => {});

        if (frozenResult) setFrozenCart(frozenResult?.data);
        else setFrozenCart([]);
        setIsLoading(false);
      });
    }
  }

  useEffect(() => {
    fetchGeneralData();
    fetchFrozenData();
  }, [accessToken]);

  const totalCart = generalCart?.length + frozenCart?.length;

  // 체크박스 선택한 상품 수량
  let checkedItemQuantity = 0;
  frozenCart?.map((item) =>
    item.checked ? (checkedItemQuantity += 1) : (checkedItemQuantity += 0)
  );
  generalCart?.map((item) =>
    item.checked ? (checkedItemQuantity += 1) : (checkedItemQuantity += 0)
  );

  // 체크박스 선택한 상품 총 가격(배송비 미포함)
  let TotalPrice = 0;
  let frozenPrice = 0;
  let generalPrice = 0;

  frozenCart.map((item) =>
    item.checked
      ? (frozenPrice += item.product.price * item.quantity)
      : (frozenPrice += 0)
  );

  generalCart.map((item) =>
    item.checked
      ? (generalPrice += item.product.price * item.quantity)
      : (generalPrice += 0)
  );

  TotalPrice = frozenPrice + generalPrice;

  const frozenDelivery = frozenPrice > 30000 || frozenPrice === 0 ? 0 : 3000;
  const generalDelivery = generalPrice > 30000 || generalPrice === 0 ? 0 : 3000;

  const deliveryP = frozenDelivery + generalDelivery;

  // 결제하기에 넘겨줄 경우: checked=true 인것만 체크해서 넘겨주기
  const [orderList, setOrderList] = useRecoilState(cartOrder);
  const setDelivery = useSetRecoilState(deliveryPrice);

  const frozenOrder = frozenCart.filter((item) => item.checked);
  const generalOrder = generalCart.filter((item) => item.checked);
  const result = frozenOrder.concat(generalOrder);

  const router = useRouter();
  const onClickHandler = () => {
    if (result.length === 0) {
      Swal.fire({
        icon: "warning",
        text: "상품을 선택해 주세요!",
      });
    } else {
      setOrderList(result);
      setDelivery(deliveryP);
      router.push("/payment");
    }
  };

  const sorry = () => {
    Swal.fire({
      text: `준비 중인 기능입니다 🥺`,
      width: "70vw",
      confirmButtonText: "확인",
      confirmButtonColor: "green",
    });
  };

  return (
    <>
      <Head>
        <title>Starbucks | Cart</title>
      </Head>
      {!accessToken && <LoginRequired background="white" />}
      {accessToken && isLoading && (
        <div style={{ width: "100vw", height: "100vh", paddingTop: "55%" }}>
          <Loading />
        </div>
      )}
      {accessToken && !isLoading && totalCart === 0 && <CartEmpty />}
      {accessToken && !isLoading && totalCart !== 0 && (
        <>
          <div className="cart-container">
            <section id="cart-header">
              <p className="title">장바구니</p>
              <CartControlBar />
            </section>

            <CartItemList title={"일반상품"} />
            <CartItemList title={"냉동상품"} />

            {/* 최종 금액 */}
            <section id="total-cart-price">
              <div>
                <div className="title-total-price">총 주문 금액</div>
                <div className="prices">
                  <div className="cart-price">
                    <p>상품 금액</p>
                    <p className="price">
                      <Price price={TotalPrice} />
                    </p>
                  </div>
                  <div className="cart-price">
                    <p>할인 금액</p>
                    <p className="price">0원</p>
                  </div>
                  <div className="cart-price">
                    <p>배송비</p>
                    <p className="price">
                      <Price price={deliveryP} />
                    </p>
                  </div>
                </div>
                <div className="total-price">
                  <p>최종 결제 금액</p>
                  <p className="price">
                    <Price price={TotalPrice + deliveryP} />
                  </p>
                </div>

                {/* 안내문 */}
                <div className="notice">
                  <div className="notice-box">
                    장바구니에는 최대 20개까지 담을 수 있으며, 담긴 상품은 최대
                    2개월간 보관됩니다.
                    <br />
                    가격, 옵션 등 정보가 변경된 경우 주문이 불가할 수 있습니다.
                  </div>
                </div>
              </div>
            </section>
            <BottomFixedContainer>
              <div css={submitPrice}>
                <div>
                  총{" "}
                  <span style={{ color: "var(--color-primary)" }}>
                    {checkedItemQuantity}
                  </span>
                  건 / 20건
                </div>
                <div style={{ fontSize: "20px" }}>
                  <Price price={TotalPrice + deliveryP} />
                </div>
              </div>
              <div css={buttonContainer}>
                <Button btnType="button" btnEvent={sorry} type="white">
                  선물하기
                </Button>
                <Button btnType="button" btnEvent={onClickHandler}>
                  구매하기
                </Button>
              </div>
            </BottomFixedContainer>
          </div>
        </>
      )}
    </>
  );
}
