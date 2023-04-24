import React, { useEffect, useState } from "react";
import EventBanner from "@/components/widgets/EventBanner";
import ProductContainerRecommand from "@/components/layouts/ProductContainerRecommand";
import ProductContainerVertical from "@/components/layouts/ProductContainerVertical";
import { productType } from "@/types/types";
import Config from "@/configs/config.export";
import axios from "axios";
import Head from "next/head";

export default function Home() {
  const { baseUrl } = Config();

  const [recommand1, setRecommand1] = useState<productType[]>([]);
  const [recommand2, setRecommand2] = useState<productType[]>([]);
  const [recommand3, setRecommand3] = useState<productType[]>([]);
  const [recommand4, setRecommand4] = useState<productType[]>([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/product/search/c?filter=${"라인프렌즈"}`)
      .then((res) => {
        setRecommand1([...res.data.content]);
      });

    axios
      .get(`${baseUrl}/api/product/search/c?filter=${"체리블라썸"}`)
      .then((res) => {
        setRecommand2([...res.data.content]);
      });

    axios
      .get(`${baseUrl}/api/product/search/c?filter=${"케이크"}`)
      .then((res) => {
        setRecommand3([...res.data.content]);
      });

    axios
      .get(`${baseUrl}/api/product/search/c?filter=${"Core"}`)
      .then((res) => {
        setRecommand4([...res.data.content]);
      });
  }, [baseUrl]);

  return (
    <>
      <Head>
        <title>Starbucks | Home</title>
      </Head>
      <div className="container">
        <EventBanner />
        <ProductContainerRecommand
          sectionId="recommand-md-1"
          headerName="귀여운 곰돌이 🐻"
          itemList={recommand1}
        />
        <ProductContainerRecommand
          sectionId="recommand-md-2"
          headerName="Cherry Blossom 🌸"
          itemList={recommand2}
        />
        <ProductContainerRecommand
          sectionId="recommand-md-3"
          headerName="달콤한 스타벅스 케이크 🍰"
          itemList={recommand3}
        />
        <ProductContainerVertical
          sectionId="chunsik"
          headerName="Core 🏠"
          itemList={recommand4}
        />
      </div>
    </>
  );
}
