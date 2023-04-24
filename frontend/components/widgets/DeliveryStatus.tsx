import Image from "next/image";
import React from "react";
import Swal from "sweetalert2";

export default function DeliveryStatus() {
  const sorry = () => {
    Swal.fire({
      text: `준비 중인 기능입니다 🥺`,
      width: "70vw",
      confirmButtonText: "확인",
      confirmButtonColor: "green",
    });
  };
  return (
    <section id="order-status">
      <div className="delivery-status-header">
        <h2>주문/배송 현황</h2>
        <p>최근 3개월 동안 구매한 상품</p>
      </div>
      <div className="order-status-container" onClick={sorry}>
        <div className="status-item">
          <p className="status-count" id="status-prepared-count">
            0
          </p>
          <p>상품준비중</p>
        </div>
        <div className="status-item">
          <Image
            className="arrow"
            src="/images/icons/contents/right-arrow.png"
            width={10}
            height={10}
            alt=""
          />
        </div>
        <div className="status-item">
          <p className="status-count" id="status-prepared-count">
            0
          </p>
          <p>배송준비중</p>
        </div>
        <div className="status-item">
          <Image
            className="arrow"
            src="/images/icons/contents/right-arrow.png"
            width={10}
            height={10}
            alt=""
          />
        </div>
        <div className="status-item">
          <p className="status-count" id="status-prepared-count">
            0
          </p>
          <p>배송중</p>
        </div>
        <div className="status-item">
          <Image
            className="arrow"
            src="/images/icons/contents/right-arrow.png"
            width={10}
            height={10}
            alt=""
          />
        </div>
        <div className="status-item">
          <p className="status-count" id="status-prepared-count">
            0
          </p>
          <p>배송완료</p>
        </div>
      </div>
    </section>
  );
}
