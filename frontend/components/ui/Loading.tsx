import React from "react";
import { ClipLoader } from "react-spinners";

interface props {
  size?: number;
}
export default function Loading({ size = 20 }: props) {
  return (
    <div style={{ textAlign: "center" }}>
      <ClipLoader color="rgb(0, 155, 57)" size={size} />
    </div>
  );
}
