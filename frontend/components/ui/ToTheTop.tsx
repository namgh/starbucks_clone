/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";

export default function ToTheTop() {
  // 토글 여부를 결정하는 state 선언
  const [toggleBtn, setToggleBtn] = useState(true);

  // window 객체에서 scrollY 값을 받아옴
  // 어느정도 스크롤이 된건지 판단 후, 토글 여부 결정
  const handleScroll = () => {
    const { scrollY } = window;

    scrollY > 200 ? setToggleBtn(true) : setToggleBtn(false);
  };

  // scroll 이벤트 발생 시 이를 감지하고 handleScroll 함수를 실행
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 버튼 클릭 시 스크롤을 맨 위로 올려주는 함수
  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 토글 여부 state에 따라 버튼을 보여주거나 감추게 만듦
  return toggleBtn ? (
    <div onClick={goToTop} css={containerStyle}>
      <MdKeyboardArrowUp size={45} color="#b9b3b3" />
    </div>
  ) : null;
}

const containerStyle = css`
  position: fixed;
  bottom: 30px;
  right: 20px;
  border-radius: 50%;
  border: 1px solid gray;
  width: 45px;
  height: 45px;
  background-color: white;
  opacity: 0.5;
  box-shadow: 1px 2px 5px grey;
  z-index: 999;
`;
