import Image from "next/image";
import React from "react";

export default function PayCoupon() {
  return (
    <section id="coupon">
      <details>
        <summary>
          <div>
            <p>쿠폰 및 할인</p>
            <div>
              <Image
                className="arrow"
                src="/images/icons/arrow-down-sign-to-navigate.png"
                width={16}
                height={16}
                alt="화살표이미지"
              />
            </div>
          </div>
        </summary>
        <div className="detail">
          <a href="">
            <div className="coupon-detail">
              <Image
                src="/images/icons/discount.png"
                alt=""
                width={16}
                height={16}
              />
              <p>쿠폰</p>
            </div>
          </a>
        </div>
      </details>
    </section>
  );
}
