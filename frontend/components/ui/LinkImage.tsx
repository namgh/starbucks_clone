/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function LinkImage(props: {
  route: string;
  imageSrc: string;
  alt: string;
}) {
  return (
    <Link href={props.route}>
      <Image
        src={props.imageSrc}
        alt={props.alt}
        width={200}
        height={200}
        style={{ width: "100%", height: "100%" }}
        priority
      />
    </Link>
  );
}
