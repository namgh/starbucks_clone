import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import CartItem from "../ui/CartItem";
import { DefaultValue, useRecoilState } from "recoil";
import { cartListType } from "@/types/types";
import { frozenCartListState, generalCartListState } from "../../state/cart";
import Link from "next/link";
import Image from "next/image";
import Price from "../ui/Price";
import { useCart } from "@/hooks/useCart";

interface cartType {
  title: string;
}

export default function CartItemList({ title }: cartType) {
  const [cartItems, setCartItems] = useCart(title);
  const [listAllCheck, setListAllCheck] = useState(false);
  const [totalDeliveryPrice, setTotalDeliveryPrice] = useState<number>(0);

  useEffect(() => {
    let check = true;
    cartItems.find((item) => item.checked === false)
      ? (check = false)
      : (check = true);
    setListAllCheck(check);
  }, [cartItems]);

  const handleCartListAllCheck = (check: boolean) => {
    setListAllCheck(!check);
    setCartItems(
      cartItems.map((item) => {
        const cartResult = { ...item };
        cartResult.checked = !check;
        return cartResult;
      })
    );
  };

  let checkedItemQuantity = 0;
  cartItems.map((item) =>
    item.checked ? (checkedItemQuantity += 1) : (checkedItemQuantity += 0)
  );

  let listPrice = 0;
  cartItems.map((item) =>
    item.checked
      ? (listPrice += item.product.price * item.quantity)
      : (listPrice += 0)
  );

  const deliveryPrice = listPrice >= 30000 || listPrice == 0 ? 0 : 3000;
  const deliveryComment =
    listPrice >= 30000
      ? "무료배송"
      : `${(30000 - listPrice).toLocaleString("en")}원 더 담으면 무료배송`;

  useEffect(() => {
    setTotalDeliveryPrice(totalDeliveryPrice + deliveryPrice);
  }, [cartItems]);

  return (
    <>
      {cartItems.length === 0 ? (
        ""
      ) : (
        <div>
          <section id="cart-list">
            <div className="select">
              {/* 일반 / 냉동 일괄 선택 체크박스 */}
              <div className="select-items">
                <div
                  className={listAllCheck ? "sbCheckBoxOn" : "sbCheckBox"}
                  onClick={() => handleCartListAllCheck(listAllCheck)}
                >
                  <Image
                    src="/images/icons/check.png"
                    alt={"체크이미지"}
                    width={15}
                    height={15}
                  />
                </div>
                <p className="cart-select-btn">{title}</p>
              </div>
            </div>
            {cartItems.map((item) => (
              <CartItem item={item} key={item.id} title={title} />
            ))}
          </section>
          {!checkedItemQuantity ? (
            ""
          ) : (
            <div className="cart-delivery">
              <p>
                상품 {checkedItemQuantity}건 <Price price={listPrice} /> +
                배송비 <Price price={deliveryPrice} /> = 총{" "}
                <Price price={listPrice + deliveryPrice} />
              </p>
              <p style={{ fontWeight: "bold" }}>{deliveryComment}</p>
              <Link href="/store" style={{ textDecoration: "underline" }}>
                더 담으러 가기
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
}
