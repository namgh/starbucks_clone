import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function BackIcon() {
  const router = useRouter();
  const onClickHandler = () => {
    router.pathname !== "/store" ? router.back() : router.push("/");
  };
  return (
    <div>
      <Image
        src="/images/icons/left.png"
        alt="뒤로가기"
        className="back-button"
        width={20}
        height={20}
        onClick={onClickHandler}
      />
    </div>
  );
}
