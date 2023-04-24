import BottomFixedContainer from "@/components/ui/BottomFixedContainer";
import Button from "@/components/ui/Button";
import RightArrowMenu from "@/components/ui/RightArrowMenu";
import PayDeliveryInfo from "@/components/widgets/PayDeliveryInfo";
import PayInfo from "@/components/widgets/PayInfo";
import PayMethod from "@/components/widgets/PayMethod";
import PayProductList from "@/components/widgets/PayProductList";
import { deliveryListType } from "@/types/types";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Price from "@/components/ui/Price";
import { deliveryListState } from "@/state/delivery";
import { usePayment } from "@/hooks/usePayment";
import { useCartOrder } from "@/hooks/useCartOrder";
import { useDeliveryPrice } from "@/hooks/useDeliveryPrice";
import { accessTokenState } from "@/state/accessTokenState";
import LoginRequired from "@/components/widgets/LoginRequired";
import axiosApiInstance from "@/utils/axiosInstance";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

export default function Payment() {
  const [deliveryList, setDeliveryList] = useRecoilState(deliveryListState);
  const [deliveryPlace, setDeliveryPlace] = useState<deliveryListType>([]);
  const [payMethod, setPayMethod] = useState<string>("");
  const AT = useRecoilValue(accessTokenState);
  const router = useRouter();

  // recoil-persist
  const orderList = useCartOrder();
  const deliveryP = useDeliveryPrice();
  const [receipt, setReceipt] = usePayment();

  let totalPrice = 0;
  orderList.map((item) => (totalPrice += item.product.price * item.quantity));

  // 배송지 데이터 불러오기
  async function fetchDelivery() {
    const delivery = await axiosApiInstance.get(`/shipping-address`);
    setDeliveryList(delivery.data.shippingAddress);
  }

  if (AT) {
    useEffect(() => {
      fetchDelivery();
    }, []);
  }

  useEffect(() => {
    setDeliveryPlace([deliveryList[0]]);
  }, [deliveryList]);

  useEffect(() => {
    setReceipt({
      purchaseList: orderList.map(function (item) {
        let pId = String(item.product.productId);
        if (pId === "undefined") pId = String(item.product.id);
        return {
          productId: Number(pId),
          productName: item.product.name,
          productQuantity: item.quantity,
          productPrice: item.product.price,
        };
      }),
      shippingAddressId: deliveryPlace[0]?.id,
      shippingPrice: deliveryP,
      paymentType: `${payMethod}`,
      cashReceipts: "현금영수증",
      totalPrice: totalPrice + deliveryP,
    });
  }, [deliveryPlace, payMethod]);

  const purchase = async () => {
    if (
      Object.keys(receipt).length !== 0 &&
      receipt.paymentType === "kakao-pay" &&
      deliveryList.length > 0
    ) {
      const result = await axiosApiInstance.post(`/purchase`, {
        purchaseList: receipt.purchaseList,
        shippingAddressId: receipt.shippingAddressId,
        shippingPrice: receipt.shippingPrice,
        paymentType: receipt.paymentType,
        cashReceipts: receipt.cashReceipts,
        totalPrice: receipt.totalPrice,
      });
      window.location.href = result.data.next_redirect_pc_url;
    }
    if (receipt.paymentType !== "kakao-pay") {
      Swal.fire({
        icon: "warning",
        text: "결제수단을 선택해 주세요.",
      });
    }
    if (deliveryList.length === 0) {
      Swal.fire({
        icon: "warning",
        text: "배송지를 등록해 주세요.",
      });
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
      {AT ? (
        <div>
          <section id="pay-title">
            <p className="title">결제하기</p>
          </section>
          {deliveryList.length ? (
            <PayDeliveryInfo
              deliveryList={deliveryList}
              setDeliveryList={setDeliveryList}
              deliveryPlace={deliveryPlace}
              setDeliveryPlace={setDeliveryPlace}
            />
          ) : (
            <div
              style={{
                padding: "14px",
                textAlign: "center",
              }}
            >
              <p style={{ fontSize: "1.1rem", margin: "5px 0px" }}>
                등록된 배송지가 없습니다.
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div style={{ width: "50%" }}>
                  <Button
                    btnType="button"
                    type="white"
                    btnEvent={() => router.push("/delivery_register")}
                  >
                    등록하기
                  </Button>
                </div>
              </div>
            </div>
          )}

          <PayProductList itemList={orderList} />
          <div onClick={sorry}>
            <RightArrowMenu
              iconSrc=""
              menuName="모바일 상품권"
              link=""
              fontType="bold"
              padding="15px 10px"
            />
          </div>
          <PayMethod setMethod={setPayMethod} />
          <div onClick={sorry}>
            <RightArrowMenu
              iconSrc=""
              menuName="현금영수증"
              link=""
              fontType="bold"
              padding="15px 10px"
            />
          </div>
          <PayInfo itemPrice={totalPrice} delivery={deliveryP} />
          <section id="pay-info">
            <div className="pay">
              <div className="pay-price">
                <p className="title">최종 결제 금액</p>
                <p className="title price">
                  <Price price={totalPrice + deliveryP} />
                </p>
              </div>
            </div>
            <div className="notice">
              <div className="notice-box">
                위 주문 내용을 확인하였으며, 결제에 동의합니다.
                <br />
                (전자상거래법 8조 2항)
              </div>
            </div>
          </section>
          <BottomFixedContainer>
            <Button btnType="button" btnEvent={purchase}>
              <Price price={totalPrice + deliveryP} /> 결제하기
            </Button>
          </BottomFixedContainer>
        </div>
      ) : (
        <LoginRequired background="white" />
      )}
    </>
  );
}
