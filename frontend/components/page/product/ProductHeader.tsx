import React, { useEffect } from "react";
import Image from "next/image";
import { productType } from "@/types/types";
import ProductLabel from "@/components/ui/ProductLabel";
import { useRouter } from "next/router";
import Price from "@/components/ui/Price";

interface ProductHeaderProps {
  product: productType;
}

export default function ProductHeader({ product }: ProductHeaderProps) {
  const router = useRouter();

  // 카카오톡 공유 init
  useEffect(() => {
    if (!window.Kakao.isInitialized())
      window.Kakao.init("3516958a9b5f02f44ab75393b932aa86");
  }, []);

  // 공유하기 API 호출
  const shareKakao = () => {
    window.Kakao.Share.sendCustom({
      templateId: 91771,
      templateArgs: {
        TITLE: product.name,
        THU: `https://storage.googleapis.com/ghbt/product_thumbnail/${product?.thumbnailUrl}`,
        ID: router.query.pid,
      },
    });
  };

  return (
    <section id="product-top">
      <div className="product-img">
        {product?.thumbnailUrl && (
          <Image
            src={`https://storage.googleapis.com/ghbt/product_thumbnail/${product?.thumbnailUrl}`}
            alt={product.name}
            priority
            width={414}
            height={414}
            style={{ height: "100%", width: "100%" }}
          />
        )}
      </div>
      <div className="product-info">
        <div className="product-name-container">
          <div className="product-name">
            <p>{product?.name}</p>
            <ProductLabel isBest={product?.isBest} isNew={product?.isNew} />
          </div>
          <div className="share-icon" onClick={shareKakao}>
            <Image
              src="/images/icons/share.png"
              alt="공유 버튼"
              width={20}
              height={20}
            />
          </div>
        </div>
        <div className="description">{product?.description}</div>
        <div className="price">
          <Price price={product.price} />
        </div>
      </div>
    </section>
  );
}
