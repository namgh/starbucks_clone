import { productType } from "@/types/types";
import Link from "next/link";
import React from "react";
import Price from "./Price";
import ProductLabel from "./ProductLabel";
import Image from "next/image";

type Item = {
  item: productType;
};

export default function ProductItemRow({ item }: Item) {
  return (
    <Link href={`/product/${item.productId}`}>
      <div className="chunsik-item">
        <Image
          style={{ borderRadius: "10px" }}
          src={`https://storage.googleapis.com/ghbt/product_thumbnail/${item?.thumbnailUrl}`}
          alt={item.name}
          width={140}
          height={140}
          priority={true}
        />
        <div className="chunsik-item-info">
          <ProductLabel isBest={item.isBest} isNew={item.isNew} />
          <p className="item-title">{item.name}</p>
          <p className="item-price">
            <Price price={item.price} />
          </p>
        </div>
      </div>
    </Link>
  );
}
