import ProductContainerGrid from "@/components/layouts/ProductContainerGrid";
import Loading from "@/components/ui/Loading";
import Config from "@/configs/config.export";
import { useDidMountEffect } from "@/hooks/useDidmount";
import { eventType, productType } from "@/types/types";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Event() {
  const [loading, setLoading] = useState<boolean>(true);

  const [itemList, setItemList] = useState<productType[]>([]);
  const [eventInfo, setEventInfo] = useState<eventType>();
  const { query } = useRouter();

  const { baseUrl } = Config();

  useEffect(() => {
    const getData = async () => {
      const result = await axios
        .get(`${baseUrl}/api/product/search/c?filter=${query.category}`)
        .then((result) => setItemList(result.data.content))
        .catch((err) => console.log(err));

      const eventResult = await axios
        .get(`${baseUrl}/api/event/name/${query.category}`)
        .then((eventResult) => setEventInfo(eventResult.data))
        .catch((err) => console.log(err));

      setLoading(false);
    };
    if (query.category !== undefined) getData();
  }, [query, baseUrl]);

  return (
    <>
      {loading ? (
        <div style={{ width: "100vw", height: "100vh", paddingTop: "55%" }}>
          <Loading size={20} />
        </div>
      ) : (
        <div className="container">
          <section id="event-info">
            <div className="first-section-sub-one">
              <Image
                src={`https://storage.googleapis.com/ghbt/event/${eventInfo?.descriptionUrl}`}
                width={200}
                height={500}
                style={{ width: "100%", height: "100%" }}
                alt="이벤트배너"
                priority
              />
            </div>
          </section>
          <ProductContainerGrid itemList={itemList} />
        </div>
      )}
    </>
  );
}
