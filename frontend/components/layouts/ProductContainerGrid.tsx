import { productType } from "@/types/types";
import { useEffect } from "react";
import NoItem from "../ui/NoItem";
import ProductItemCol from "../ui/ProductItemCol";
import { useRouter } from "next/router";

type Item = {
  itemList: productType[];
};

export default function ProductContainerGrid({ itemList = [] }: Item) {
  const { pathname } = useRouter();
  return (
    <>
      {itemList.length === 0 ? (
        <NoItem />
      ) : (
        <div
          className="product-container"
          style={pathname === "/store" ? { minHeight: "95vh" } : {}}
        >
          {itemList &&
            itemList.map((item: productType, idx: number) => (
              <ProductItemCol key={idx} item={item} idx={idx} />
            ))}
        </div>
      )}
    </>
  );
}
