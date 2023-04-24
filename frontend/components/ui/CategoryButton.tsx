import { categoryType } from "@/types/types";
import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";
import { contentsModalState } from "@/state/contentsModalState";
import { useSetRecoilState } from "recoil";

export default function CategoryButton(props: { category: categoryType }) {
  const { category } = props;
  const router = useRouter();
  const setContentsIsView = useSetRecoilState(contentsModalState);

  const handleLink = (c: string) => {
    setContentsIsView(false);
    document.body.style.overflow = "unset";
    router.push(`store?bigCategory=${c}`);
  };
  // 목차에 누르면 해당 카테고리로 이동하는 사진 포함 버튼
  return (
    <button
      type="button"
      className="category-button"
      onClick={() => handleLink(category.name)}
    >
      <div className="category">
        <div className="category-img">
          <Image
            style={{ opacity: "1" }}
            src={`/images/products/category/${category.id}.jpg`}
            alt={category.name}
            width={100}
            height={100}
          />
        </div>
        <div className="category-name">
          <p>{category.name}</p>
        </div>
      </div>
    </button>
  );
}
