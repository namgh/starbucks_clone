import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <script
          defer
          src="https://developers.kakao.com/sdk/js/kakao.min.js"
        ></script>
        <link rel="icon" href="/images/favi.png"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

/**
 * 헤드, 메타, 폰트, 웹 접급성 설정 등 커스터마이징에 사용
 * _app.tsx 다음에 실행됨
 * 무조건 서버에서 실행되는 파일이므로 브라우저 api, 이벤트 핸들러 등 실행 안됨
 * 비즈니스 로직 추가하면 안됨
 *  */
