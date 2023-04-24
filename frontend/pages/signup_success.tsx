/** @jsxImportSource @emotion/react */

import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import { css } from "@emotion/react";
import Button from "@/components/ui/Button";
import { useRouter } from "next/router";

export default function SignUpSuccess() {
  const router = useRouter();
  const container = useRef<any>();

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: require("public/lottie/Comp1.json"),
    });
    lottie.setSpeed(1);
  }, []);

  return (
    <div css={layout}>
      <div css={contents}>
        <div
          ref={container}
          style={{
            width: "80%",
            height: "80%",
            paddingRight: "30px",
            margin: 0,
            position: "absolute",
            top: "-3.7rem",
            left: "2.8rem",
          }}
        ></div>
        <h1 style={{ textAlign: "center", margin: 0, lineHeight: "3rem" }}>
          <p style={{ color: "var(--color-light-green)", display: "inline" }}>
            {router.query.id}
          </p>
          님
          <br />
          회원가입을 축하합니다!
        </h1>
        <div
          style={{
            width: "70%",
            textAlign: "center",
            display: "flex",
            gap: "10px",
            marginTop: "20px",
            zIndex: "1",
          }}
        >
          <Button
            btnType="button"
            btnEvent={() => router.push("/")}
            type="white"
          >
            홈으로 가기
          </Button>
          <Button btnType="button" btnEvent={() => router.push("/login")}>
            로그인
          </Button>
        </div>
      </div>
    </div>
  );
}

const layout = css`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const contents = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
`;
