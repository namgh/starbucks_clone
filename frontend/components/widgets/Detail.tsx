import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Button from "../ui/Button";
import DetailImage from "../ui/DetailImage";
import Loading from "../ui/Loading";
import Config from "@/configs/config.export";

interface imgData {
  id: number;
  productId: number;
  url: string;
}

export default function Detail() {
  const [imgList, setImgList] = useState<imgData[]>([]);
  const [showImgList, setShowImgList] = useState<imgData[]>([]);
  const [isMore, setIsMore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { baseUrl } = Config();

  const router = useRouter();

  const renderImgs = (): JSX.Element[] => {
    const imgs =
      showImgList &&
      showImgList.map((image, idx) => {
        if (image === undefined) {
          return (
            <p key={idx} style={{ fontSize: "0.8rem", color: "gray" }}>
              상세이미지 없음
            </p>
          );
        }
        return <DetailImage key={image.id} url={image.url} />;
      });
    return imgs;
  };

  const handleMore = () => {
    setShowImgList([...imgList]);
    setIsMore(true);
  };

  const handleMoreClose = () => {
    setShowImgList([imgList[0]]);
    setIsMore(false);
  };

  useEffect(() => {
    if (router.query.pid === undefined) router.query.pid = "1";
    const getData = async () => {
      const result = await axios.get(
        `${baseUrl}/api/image/${router.query.pid}`
      );
      setImgList([...result.data.images]);
      setShowImgList([result.data.images[0]]);
      setIsLoading(false);
    };
    getData();
  }, [router.isReady, router.query, baseUrl]);

  return (
    <>
      <section id="product-detail">
        <p>상품 정보</p>
        {isLoading && (
          <div style={{ width: "100vw", height: "100vh", paddingTop: "20%" }}>
            <Loading size={20} />
          </div>
        )}
        {renderImgs()}
        <div
          style={{ textAlign: "center", position: "relative", top: "-40px" }}
        >
          {imgList.length > 1 && !isMore && (
            <Button type="more" btnType={"button"} btnEvent={handleMore}>
              상품 정보 더보기
              <Image
                src="/images/icons/upload.png"
                alt="더보기 버튼"
                width={10}
                height={10}
                style={{
                  paddingRight: "5px",
                  transform: "rotate(180deg)",
                  opacity: "0.5",
                }}
              />
            </Button>
          )}
          {imgList.length > 1 && isMore && (
            <Button type="more" btnType={"button"} btnEvent={handleMoreClose}>
              상품 정보 접기
              <Image
                src="/images/icons/upload.png"
                width={10}
                height={10}
                alt="접기 아이콘"
                style={{ paddingLeft: "5px", opacity: "0.5" }}
              />
            </Button>
          )}
        </div>
      </section>
    </>
  );
}
