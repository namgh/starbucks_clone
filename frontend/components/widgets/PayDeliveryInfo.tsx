/** @jsxImportSource @emotion/react */
import { deliveryListType, deliveryType } from "@/types/types";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import DeliveryChangeModal from "../modals/DeliveryChangeModal";

interface delivery {
  deliveryList: deliveryListType;
  setDeliveryList: React.Dispatch<React.SetStateAction<deliveryListType>>;
  deliveryPlace: deliveryListType;
  setDeliveryPlace: React.Dispatch<React.SetStateAction<deliveryListType>>;
}

export default function PaymentDeliveryInfo({
  deliveryList,
  setDeliveryList,
  deliveryPlace,
  setDeliveryPlace,
}: delivery) {
  const [modalOpen, setModalOpen] = useState(false);

  const div = css`
    margin: 5px 0px;
    padding: 10px 0px;
    border-top: 1px solid rgba(128, 128, 128, 0.381);
    font-size: 0.9rem;
  `;

  return (
    <>
      <section id="pay-delivery">
        <div className="delivery-info-title" style={{ paddingBottom: "10px" }}>
          <p>배송 정보</p>
          <div className="delivery-change" onClick={() => setModalOpen(true)}>
            변경
          </div>
          {modalOpen && (
            <DeliveryChangeModal
              setModalOpen={setModalOpen}
              deliveryList={deliveryList}
              setDeliveryList={setDeliveryList}
              deliveryPlace={deliveryPlace}
              setDeliveryPlace={setDeliveryPlace}
            />
          )}
        </div>
        <div className="delivery-info">
          <div className="delivery-name">
            <div className="name">
              {deliveryPlace[0]?.receiver} ({deliveryPlace[0]?.addressNickname})
            </div>
            {deliveryPlace[0]?.isDefault ? (
              <div className="is-primary">기본</div>
            ) : (
              ""
            )}
          </div>
          <p>
            ({deliveryPlace[0]?.zipCode}) {deliveryPlace[0]?.baseAddress}{" "}
            {deliveryPlace[0]?.detailAddress}
          </p>
          <p>{deliveryPlace[0]?.phoneNumber1}</p>
        </div>
        <div css={div}>{deliveryPlace[0]?.notice}</div>
      </section>
    </>
  );
}
