import PrimaryLayout from "@/components/layouts/PrimaryLayout";
import { AxiosInterceptor } from "@/utils/axiosInstance";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import "public/css/style.css";
import { RecoilRoot } from "recoil";

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  return (
    <>
      <Head>
        <title>Starbucks</title>
      </Head>
      <RecoilRoot>
        <AxiosInterceptor>
          {pathname === "/search" ? (
            <Component {...pageProps} />
          ) : (
            <PrimaryLayout>
              <Component {...pageProps} />
            </PrimaryLayout>
          )}
        </AxiosInterceptor>
      </RecoilRoot>
    </>
  );
}

/**
 * _app.tsx의 역할
 * 페이지 전환시 레이아웃 유지
 * 페이지 전환시 상태값 유지
 * componentDidCatch를 이용해 커스텀 에러 핸들링 가능
 * 추가적인 데이터를 페이지로 주입시켜주기 가능
 * 글로벌 CSS 선언
 */
