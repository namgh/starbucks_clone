/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import Sheet from "react-modal-sheet";
import myStyle from "./ProductOrderSection.module.css";
import Button from "@/components/ui/Button";
import Image from "next/image";
import ItemAmount from "@/components/ui/ItemAmount";
import { productType } from "@/types/types";
import Price from "@/components/ui/Price";
import { css } from "@emotion/react";
import Swal from "sweetalert2";

export default function ProductOrderSection(props: {
  product: productType;
  itemCount: number;
  setItemCount: React.Dispatch<React.SetStateAction<number>>;
  purchaseHandler: () => void;
  addCartHandler: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
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
      <div
        className={
          isOpen ? myStyle.footerMenuSection : myStyle.footerMenuSectionOff
        }
      >
        {!isOpen ? (
          <div
            className={myStyle.toggleButton}
            onClick={() => setIsOpen(true)}
          />
        ) : null}
        {isOpen ? (
          <div css={buttonContainer} className={isOpen ? "" : "hide"}>
            <div css={iconStyle}>
              <Image
                src="/images/icons/shopping-cart.svg"
                width={20}
                height={20}
                alt="장바구니"
                onClick={props.addCartHandler}
              />
            </div>
            <Button btnType="button" btnEvent={sorry} type="white">
              선물하기
            </Button>
            <Button btnType="button" btnEvent={props.purchaseHandler}>
              구매하기
            </Button>
          </div>
        ) : (
          <Button btnType="button" btnEvent={() => setIsOpen(true)}>
            구매하기
          </Button>
        )}
      </div>
      <Sheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        detent="content-height"
        style={{
          zIndex: 100,
        }}
      >
        <Sheet.Container>
          <Sheet.Content>
            <div
              style={{
                boxSizing: "border-box",
                paddingBottom: "2.3rem",
                paddingTop: "1rem",
              }}
              onClick={() => setIsOpen(false)}
            >
              {isOpen ? (
                <div
                  className={myStyle.toggleButton}
                  onClick={() => setIsOpen(false)}
                />
              ) : null}
              <ItemAmount
                price={props.product.price}
                label={props.product.name}
                setTotalPrice={setTotalPrice}
                count={props.itemCount}
                setCount={props.setItemCount}
              />
              <p
                style={{
                  textAlign: "right",
                  padding: "0 15px 0 30px",
                  marginBottom: "100px",
                  fontWeight: "bold",
                }}
              >
                합계 <Price price={totalPrice} size="x-large" />
              </p>
            </div>
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </>
  );
}
const buttonContainer = css`
  display: flex;
  gap: 15px;
  padding: 0 30px;
  align-items: center;
`;

const iconStyle = css`
  padding: 0;
  margin: 0;
  width: 30%;
`;
