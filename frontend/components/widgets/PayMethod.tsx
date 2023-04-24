import React, { Dispatch, SetStateAction } from "react";

interface payMethod {
  setMethod: Dispatch<SetStateAction<string>>;
}

export default function PayMethod({ setMethod }: payMethod) {
  const handleChange = (e: any) => {
    setMethod(e.target.value);
  };

  return (
    <section id="pay-method">
      <div>
        <p>결제 수단</p>
      </div>
      <div className="pay-choice">
        <div>
          <label style={{ fontSize: "0.9rem" }}>
            <input
              type="radio"
              name="pay"
              value="starbucks-card"
              onChange={handleChange}
              style={{ accentColor: "green" }}
              disabled
            />{" "}
            스타벅스 카드(준비 중)
          </label>
        </div>
        <div>
          <label style={{ fontSize: "0.9rem" }}>
            <input
              type="radio"
              name="pay"
              value="kakao-pay"
              onChange={handleChange}
              style={{ accentColor: "green" }}
            />{" "}
            카카오페이
          </label>
        </div>
      </div>
    </section>
  );
}
