import { productType } from "@/types/types";
import React from "react";
import ProductItemRow from "../ui/ProductItemRow";

export default function ProductContainerVertical(props: {
  sectionId: string;
  headerName: string;
  itemList: productType[];
}) {
  const { sectionId, headerName, itemList } = props;
  return (
    <section className="recommand" id={sectionId}>
      <h2 className="product-header">{headerName}</h2>
      <div className="product-container-vertical">
        {itemList.map((item: productType) => (
          <ProductItemRow key={item.productId} item={item} />
        ))}
      </div>
    </section>
  );
}
