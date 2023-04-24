import { productType } from "@/types/types";
import Link from "next/link";
import React from "react";
import Price from "./Price";
import ProductLabel from "./ProductLabel";
import Image from "next/image";

type Item = {
  item: productType;
};

const ProductContainerRecommand = ({ item }: Item) => {
  const limitTitle = (title: string, limit: number = 18) => {
    const newTitle: string[] = [];
    if (title.length > limit) {
      title.split(" ").reduce((acc, cur) => {
        if (acc + cur.length <= limit) {
          newTitle.push(cur);
        }
        return acc + cur.length;
      }, 0);
      return `${newTitle.join(" ")} ...`;
    }
    return title;
  };

  return (
    <Link href={`/product/${item.productId}`}>
      <div className="recommand-product-item">
        <div className="recommand-product-item__img">
          <Image
            style={{ borderRadius: "15px" }}
            src={`https://storage.googleapis.com/ghbt/product_thumbnail/${item?.thumbnailUrl}`}
            alt={item.name}
            width={140}
            height={140}
            priority={true}
          />
        </div>
        <div className="recommand-product-item__info">
          <ProductLabel isBest={item.isBest} isNew={item.isNew} />
          <p className="item-title">{limitTitle(item.name)}</p>
          <p className="item-price">
            <Price price={item.price} />
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductContainerRecommand;
