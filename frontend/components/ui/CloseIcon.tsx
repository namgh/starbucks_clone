import React, { CSSProperties } from "react";
import Image from "next/image";

export default function CloseIcon(props: {
  onClickHandler?: React.MouseEventHandler<HTMLImageElement> | undefined;
  className?: string;
  style?: CSSProperties;
  width?: number;
  height?: number;
}) {
  return (
    <Image
      src="/images/icons/close.png"
      alt="닫기 아이콘"
      onClick={props.onClickHandler}
      width={props.width || 20}
      height={props.height || 20}
      className={props.className}
      style={props.style}
    />
  );
}
