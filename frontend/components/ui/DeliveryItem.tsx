import { deliveryListState } from "@/state/delivery";
import { deliveryListType, deliveryType } from "@/types/types";
import axiosApiInstance from "@/utils/axiosInstance";
import React, { useState } from "react";
import { useRecoilState } from "recoil";

interface change {
  item: deliveryType;
  setDeliveryPlace: React.Dispatch<React.SetStateAction<deliveryListType>>;
}

export default function DeliveryItem({ item, setDeliveryPlace }: change) {
  const [deliveryList, setDeliveryList] = useRecoilState(deliveryListState);

  const handleChange = (e: any) => {
    setDeliveryPlace([item]);
  };

  const handleDelete = () => {
    axiosApiInstance.delete(`shipping-address/${item.id}`);

    setDeliveryList([
      ...deliveryList.filter((element) => element.id !== item.id),
    ]);
  };

  return (
    <section id="delivery-list">
      <input
        type="radio"
        name="deliver-place"
        value={item.id}
        onChange={handleChange}
      />
      <div className="delivery-info">
        <div className="delivery-name">
          <div className="name">
            {item.receiver} ({item.addressNickname})
          </div>
          {item.isDefault ? <div className="is-primary">기본</div> : ""}
        </div>
        <p>
          ({item.zipCode}) {item.baseAddress}
          {item.detailAddress}
        </p>
        <p>{item.phoneNumber1}</p>
        <p>{item.notice}</p>
      </div>
      <div
        onClick={handleDelete}
        style={{ opacity: "0.7", fontSize: "0.8rem" }}
      >
        삭제
      </div>
    </section>
  );
}
