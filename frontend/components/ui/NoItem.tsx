import React from "react";

export default function NoItem() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        paddingTop: "50%",
        textAlign: "center",
      }}
    >
      <p>조회되는 상품이 없습니다.</p>
    </div>
  );
}
