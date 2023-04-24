import ProductContainerGrid from "@/components/layouts/ProductContainerGrid";
import Loading from "@/components/ui/Loading";
import Config from "@/configs/config.export";
import { productType } from "@/types/types";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Best() {
  const [loading, setLoading] = useState<boolean>(true);
  const [itemList, setItemList] = useState<productType[]>([]);
  const { query } = useRouter();
  const { baseUrl } = Config();

  useEffect(() => {
    const getData = async () => {
      const result = await axios.get(
        `${baseUrl}/api/product/search/c?filter=${query.category}`
      );
      setItemList(result.data.content);
      setLoading(false);
    };
    getData();
  }, [query, baseUrl]);

  return (
    <>
      {loading ? (
        <div style={{ width: "100vw", height: "100vh", paddingTop: "55%" }}>
          <Loading size={20} />
        </div>
      ) : (
        <div className="first-section-sub-one">
          <ProductContainerGrid itemList={itemList} />
        </div>
      )}
    </>
  );
}
