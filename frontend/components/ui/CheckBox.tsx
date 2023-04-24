/** @jsxImportSource @emotion/react */

import React from "react";
import Image from "next/image";
import { css } from "@emotion/react";

export default function CheckBox(props: {
  lableText: string;
  isArrow: boolean;
  inputName: string;
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: boolean;
}) {
  const { lableText, isArrow, inputName, handler, value } = props;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Image
          src="/images/icons/check_white.png"
          alt="체크 이미지"
          width={10}
          height={10}
          style={{
            position: "relative",
            left: "38px",
            zIndex: "1",
            bottom: "2px",
          }}
        />
        <input
          type="checkbox"
          name={inputName}
          id={inputName}
          onChange={handler}
          checked={value || false}
          css={inputStyle}
        />
        <label
          htmlFor={inputName}
          style={{ whiteSpace: "nowrap", paddingLeft: "10px" }}
        >
          {lableText}
        </label>
      </div>
      {isArrow && (
        <Image
          src="/images/icons/arrow-point-to-right.png"
          alt="다음 화살표"
          width={20}
          height={20}
          className="arrow"
          style={{ position: "relative" }}
        />
      )}
    </div>
  );
}

const inputStyle = css`
  transform: scale(1.2);
  appearance: none;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 1px solid var(--color-gray-button);
`;
