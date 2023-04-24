/** @jsxImportSource @emotion/react */

import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import Button from "@/components/ui/Button";

export default function PayCancel() {
  const container = useRef<any>();
  const router = useRouter();

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("public/lottie/paycharacter.json"),
    });
    lottie.setSpeed(0.6);
  }, []);
  return (
    <div css={layout}>
      <div css={contents}>
        <div
          ref={container}
          style={{
            width: "60%",
            height: "60%",
            paddingRight: "30px",
          }}
        ></div>
        결제가 취소되었습니다.
        <div style={{ width: "40%", textAlign: "center" }}>
          <Button
            type="white"
            btnType="button"
            btnEvent={() => router.push("/")}
          >
            확인
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
