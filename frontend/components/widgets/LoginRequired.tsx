/** @jsxImportSource @emotion/react */

import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import { css } from "@emotion/react";
import Button from "../ui/Button";
import { useRouter } from "next/router";

export default function LoginRequired(props: { background?: string }) {
  const container = useRef<any>();
  const router = useRouter();

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("public/lottie/warning.json"),
    });
    lottie.setSpeed(0.6);
  }, []);

  let color = "var(--color-gray-background)";
  if (props.background === "white") {
    color = "var(--color-white)";
  }
  return (
    <div
      style={{
        padding: "25px",
        backgroundColor: `${color}`,
        height: "100%",
        paddingBottom: "270px",
        overflow: "hidden",
      }}
      className="first-section"
    >
      <div
        ref={container}
        style={{
          width: "100%",
          height: "100%",
        }}
      ></div>
      <div css={headerStyle}>
        앗!
        <br />
        로그인 후 이용할 수 있어요.
      </div>
      <div
        style={{
          display: "flex",
          width: "50vw",
          gap: "10px",
          paddingTop: "10px",
        }}
      >
        <Button btnType="button" btnEvent={() => router.push("/")} type="white">
          메인화면
        </Button>
        <Button btnType="button" btnEvent={() => router.push("login")}>
          로그인
        </Button>
      </div>
    </div>
  );
}

const headerStyle = css`
  font-weight: bold;
  font-size: 1.5rem;
  padding-left: 5px;
`;
