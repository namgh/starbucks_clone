/** @jsxImportSource @emotion/react */

import BottomFixedContainer from "@/components/ui/BottomFixedContainer";
import Button from "@/components/ui/Button";
import Config from "@/configs/config.export";
import { accessTokenState } from "@/state/accessTokenState";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import BackIcon from "@/components/ui/BackIcon";
import Link from "next/link";
import { css } from "@emotion/react";
import Swal from "sweetalert2";
import Image from "next/image";
import Head from "next/head";

export default function Login() {
  const { baseUrl } = Config();
  const router = useRouter();

  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onClickLogin = async () => {
    const result = await axios
      .post(
        `${baseUrl}/api/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.headers?.authorization) {
          const setAccess = res.headers.authorization.replace(/Bearer /g, "");
          setAccessToken(setAccess);
          router.push("/");
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          text: `아이디와 비밀번호를 다시 확인해주세요`,
          width: "70vw",
          confirmButtonText: "확인",
          confirmButtonColor: "green",
        });
      });
  };

  const setEmailFunction = (event: any) => {
    setEmail(event.target.value);
  };

  const setPasswordFunction = (event: any) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <Head>
        <title>Starbucks | Login</title>
      </Head>
      <BackIcon />
      <div>
        <section className="login-header" css={loginHeader}>
          <h1>로그인</h1>
        </section>
        <section className="greeting" css={greeting}>
          <Image
            width={80}
            height={80}
            src="/images/starbucks-logo.png"
            alt=""
          />
          <h2>
            안녕하세요.
            <br />
            스타벅스입니다.
          </h2>
          <p>회원 서비스 이용을 위해 로그인 해주세요.</p>
        </section>
        <section id="login-input">
          <input type="text" placeholder="아이디" onChange={setEmailFunction} />
          <br />
          <input
            type="password"
            placeholder="비밀번호"
            onChange={setPasswordFunction}
          />
        </section>
        <section id="login-service">
          <Link href="/">아이디 찾기</Link>
          <Link href="/">비밀번호 찾기</Link>
          <Link href="/signup1">회원가입</Link>
        </section>
        <BottomFixedContainer>
          <Button btnType={"submit"} btnEvent={onClickLogin}>
            로그인하기
          </Button>
        </BottomFixedContainer>
      </div>
    </div>
  );
}

const loginHeader = css`
  padding: 0 15px;
  margin-top: 40px;
  & h1 {
    font-size: 2rem;
    margin: 0;
    padding: 0;
  }

  @media screen and (max-height: 700px) {
    margin-top: 20px;
    & h1 {
      font-size: 1.5rem;
    }
  }
`;

const greeting = css`
  margin-top: 30px;
  padding: 20px;
  & h2 {
    font-size: 25px;
    font-weight: bold;
    letter-spacing: -1px;
    line-height: 30px;
    margin-bottom: 0px;
  }
  & p {
    font-size: 0.9rem;
  }

  @media screen and (max-height: 700px) {
    margin-top: 20px;
    margin-bottom: 0;
    padding-bottom: 0;
    & h2 {
      font-size: 1.2rem;
      line-height: 25px;
    }
    & p {
      font-size: 0.8rem;
    }
  }
`;
