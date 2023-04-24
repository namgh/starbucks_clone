import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import Price from "./Price";

interface props {
  price: number;
  label?: string;
  setTotalPrice: Dispatch<SetStateAction<number>>;
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}

export default function ItemAmount({
  price,
  label = "상품 주문 수량",
  setTotalPrice,
  count,
  setCount,
}: props) {
  const [isBtnValid, setIsBtnValid] = useState(false);

  const onClickAddHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCount(count + 1);
  };

  const onClickMinusHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCount(count - 1);
  };

  useEffect(() => {
    setIsBtnValid(count > 1);
    setTotalPrice(price * count);
  }, [count]);

  return (
    <section id="change-quantity">
      <div>
        <p>{label}</p>
        <div className="change">
          <div className="quantity">
            <button disabled={!isBtnValid} onClick={onClickMinusHandler}>
              <Image
                src="/images/icons/minus.png"
                alt=""
                height={15}
                width={15}
              />
            </button>
            <div style={{ fontSize: "1rem" }}>{count}</div>
            <button onClick={onClickAddHandler}>
              <Image
                src="/images/icons/add.png"
                alt=""
                height={15}
                width={15}
              />
            </button>
          </div>
          <p>
            <Price price={price * count} size="1.2rem" />
          </p>
        </div>
      </div>
    </section>
  );
}
