/** @jsxImportSource @emotion/react */

import ModalHeader from "@/components/ui/ModalHeader";
import RightArrowMenu from "@/components/ui/RightArrowMenu";
import ContentCategoryContainer from "@/components/widgets/ContentCategoryContainer";
import { firstCategory } from "@/data/StaticData";
import { accessTokenState } from "@/state/accessTokenState";
import { contentsModalState } from "@/state/contentsModalState";
import { css, keyframes } from "@emotion/react";
import Link from "next/link";
import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function Contents() {
  const setContentsIsView = useSetRecoilState(contentsModalState);
  const contentsIsView = useRecoilValue(contentsModalState);
  const accessToken = useRecoilValue(accessTokenState);
  const [animation, setAnimation] = useState<boolean>(true);

  const closeModal = () => {
    setAnimation(false);
    document.body.style.overflow = "unset";
    setTimeout(() => setContentsIsView(false), 500);
  };

  return (
    <div
      css={animation ? modalOnStyle : modalOffStyle}
      style={{
        backgroundColor: "white",
        height: "100vh",
        width: "100vw",
      }}
    >
      <ModalHeader setModalOpen={closeModal} />
      <section className="contents-head">
        {/*본문*/}
        {accessToken ? (
          <div className="contents-msg">
            <div className="msg-title">Welcome !</div>
            <p style={{ fontSize: "1rem", marginBottom: "0" }}>
              온라인 스토어에 오신 것을 환영합니다.
            </p>
          </div>
        ) : (
          <div className="contents-msg">
            <div className="msg-title">Sign in to Online Store</div>
            <div>
              <Link href="/login" onClick={closeModal}>
                <ins>로그인</ins>
              </Link>{" "}
              후 이용해 보세요.
            </div>
          </div>
        )}

        <hr className="contents-line" />
      </section>
      {/* 제품 카테고리 */}
      <ContentCategoryContainer />
      {/*기획전/베스트 이동*/}
      <section css={bottomNav}>
        <div onClick={closeModal}>
          <RightArrowMenu
            menuName={"기획전"}
            link={`/event?category=${firstCategory.event}`}
            fontType="strong"
            description="진행중인 기획전을 만나보세요."
          />
        </div>
        <hr css={hr} />
        <div onClick={closeModal}>
          <RightArrowMenu
            menuName={"베스트"}
            link={`/best?category=${firstCategory.best}`}
            fontType="strong"
            description="스타벅스의 베스트 상품을 만나보세요."
          />
        </div>
      </section>
    </div>
  );
}

const animate = keyframes`
from {
  transform: translateX(-100vw);
  background-color: white;
}

to {
  transform: translateX(0);
  background-color: white;
}
`;

const animate2 = keyframes`
from {
  transform: translateX(0);
  background-color: white;
}

to {
  transform: translateX(-100vw);
  background-color: white;
}
`;

const modalOnStyle = css`
  position: fixed;
  background-color: var(--color-white);
  top: 0;
  left: 0;
  z-index: 999;
  width: auto;
  height: 100vh;
  animation: ${animate} 0.5s ease-out;
`;

const modalOffStyle = css`
  position: fixed;
  background-color: var(--color-white);
  top: 0;
  left: 0;
  z-index: 999;
  width: auto;
  height: 100vh;
  animation: ${animate2} 0.5s ease-out;
`;

const bottomNav = css`
  background-color: var(--color-gray-background);
  padding: 1em 0 3rem 0;
  position: absolute;
  /* top: calc(100vh - 30%); */
  bottom: 0;
  margin: 0;
  width: 100vw;
  @media screen and (max-height: 700px) {
    display: flex;
  }
  @media (hover: none) and (pointer: coarse) {
    padding-bottom: 30%;
  }
`;

const hr = css`
  margin: 15px 0;
  @media screen and (max-height: 700px) {
    margin: 10px 0;
  }
`;
