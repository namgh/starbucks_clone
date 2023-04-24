import React from "react";
import Image from "next/image";
import Loading from "./Loading";

function DetailImage(props: { url: string }) {
  return (
    <Image
      src={`https://storage.googleapis.com/ghbt/product_image/${props.url}`}
      alt="상세이미지"
      // fill
      width={200}
      height={200}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      style={{ height: "100%", width: "100%" }}
      priority
    />
  );
}

export default React.memo(DetailImage);
