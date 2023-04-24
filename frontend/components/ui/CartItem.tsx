import React, { useEffect, useState } from "react";
import { cartItemType, cartListType } from "@/types/types";
import OrderChangeModal from "../modals/OrderChangeModal";
import axios from "axios";
import CloseIcon from "./CloseIcon";
import { useCart } from "@/hooks/useCart";
import Price from "./Price";
import { AT } from "@/data/StaticData";
import Config from "@/configs/config.export";
import Image from "next/image";
import axiosApiInstance from "@/utils/axiosInstance";

export default function CartItem(props: { item: cartItemType; title: string }) {
  const [quantity, setQuantity] = useState(props.item.quantity);
  const [itemPrice, setItemPrice] = useState(
    props.item.quantity * props.item.product.price
  );
  const [isItem, setIsItem] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [cartList, setCartList] = useCart(props.title);
  const { baseUrl } = Config();
  const showModal = () => {
    setModalOpen(true);
  };

  const handleCheck = () => {
    setCartList(
      cartList.map((item) => {
        const itemResult = { ...item };
        if (item.product.id === props.item.product.id) {
          itemResult.checked = !item.checked;
        }
        return itemResult;
      })
    );
  };

  const deleteItem = async () => {
    await axiosApiInstance.delete(`/cart/${props.item.id}`);
    setIsItem(false);

    setCartList([
      ...cartList.filter((item) => item.product.id !== props.item.product.id),
    ]);
  };

  return (
    <>
      {isItem ? (
        <div className="cart-product">
          <div
            className={props.item.checked ? "sbCheckBoxOn" : "sbCheckBox"}
            onClick={handleCheck}
          >
            <Image
              width={15}
              height={15}
              src="/images/icons/check.png"
              alt=""
            />
          </div>
          <div style={{ width: "95%" }}>
            <div className="item-info">
              <Image
                src={`https://storage.googleapis.com/ghbt/product_thumbnail/${props.item.product.thumbnailUrl}`}
                alt=""
                width={70}
                height={70}
                className="product-img"
                style={{ width: "25%", height: "25%", paddingLeft: "10px" }}
              />
              <div className="info">
                <div>
                  <p className="name">{props.item.product.name}</p>
                  <p className="price">
                    <Price price={props.item.product.price} />
                  </p>
                </div>
                <CloseIcon
                  className="close-icon"
                  onClickHandler={deleteItem}
                  width={10}
                  height={10}
                />
              </div>
            </div>
            <div className="count">
              <p>수량: {quantity}개</p>
            </div>
            <div className="item-price">
              <p>주문 금액</p>
              <p>
                <Price price={itemPrice} />
              </p>
            </div>
            <div className="item-purchase">
              <button onClick={showModal}>주문 수정</button>
              {modalOpen && (
                <OrderChangeModal
                  setModalOpen={setModalOpen}
                  item={props.item}
                  quantity={quantity}
                  setQuantity={setQuantity}
                  totalPrice={itemPrice}
                  setTotalPrice={setItemPrice}
                  title={props.title}
                />
              )}
              <button>바로 구매</button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
