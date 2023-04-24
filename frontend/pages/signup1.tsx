/** @jsxImportSource @emotion/react */

import BackIcon from "@/components/ui/BackIcon";
import BottomFixedContainer from "@/components/ui/BottomFixedContainer";
import Button from "@/components/ui/Button";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { privateAgreeType } from "@/types/types";
import CheckBox from "@/components/ui/CheckBox";
import { css } from "@emotion/react";

type adAgreeType = {
  email: boolean;
  sms: boolean;
};

export default function SignUp() {
  const router = useRouter();

  const [isAllAgree, setIsAllAgree] = useState<boolean>(false);
  const [required, setRequired] = useState<boolean>(false);

  const [adAgree, setAdAgree] = useState<string>("none");
  const [adAgreeArray, setAdAgreeArray] = useState<adAgreeType>(
    {} as adAgreeType
  );
  const [agreeArray, setAgreeArray] = useState<privateAgreeType>(
    {} as privateAgreeType
  );

  useEffect(() => {
    // setInputData({ ...inputData, privateAgree: agreeArray });
    if (
      agreeArray.isAgree &&
      agreeArray.isUseConfirm &&
      agreeArray.isAdvertisingConfirm
    ) {
      setIsAllAgree(true);
      setRequired(true);
    } else {
      if (agreeArray.isAgree && agreeArray.isUseConfirm) setRequired(true);
      else {
        setIsAllAgree(false);
        setRequired(false);
      }
    }
  }, [agreeArray]);

  useEffect(() => {
    // setInputData({ ...inputData, privateAgree: agreeArray });
    if (adAgreeArray.email && adAgreeArray.sms) {
      setAdAgree("all");
      setAgreeArray({ ...agreeArray, isAdvertisingConfirm: true });
    } else if (adAgreeArray.email) {
      setAdAgree("email");
      setAgreeArray({ ...agreeArray, isAdvertisingConfirm: true });
    } else if (adAgreeArray.sms) {
      setAdAgree("sms");
      setAgreeArray({ ...agreeArray, isAdvertisingConfirm: true });
    } else {
      setAdAgree("none");
      setAgreeArray({ ...agreeArray, isAdvertisingConfirm: false });
    }
  }, [adAgreeArray]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    if (name === "isAllAgree") {
      setAgreeArray({
        isAgree: checked,
        isUseConfirm: checked,
        isAdvertisingConfirm: checked,
      });
    } else {
      setAgreeArray({
        ...agreeArray,
        [name]: checked,
      });
    }
    if (name === "isAdvertisingConfirm") {
      setAdAgreeArray({
        email: checked,
        sms: checked,
      });
    }
  };

  const handleADInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setAdAgreeArray({
      ...adAgreeArray,
      [name]: checked,
    });
  };

  return (
    <>
      <header>
        <BackIcon />
      </header>
      <div>
        <section className="greeting first-section" css={greeting}>
          <Image
            src="/images/starbucks-logo.png"
            alt="스타벅스 로고"
            width={85}
            height={80}
          />
          <h2 className="signup-info">
            고객님
            <br />
            환영합니다!
          </h2>
        </section>
        <section className="agree-input" id="agree-main" css={agreeInput}>
          <CheckBox
            lableText="약관 전체동의"
            isArrow={false}
            inputName="isAllAgree"
            handler={handleInput}
            value={isAllAgree}
          />
          <hr style={{ width: "90%", opacity: "0.5" }} />
          <CheckBox
            lableText="이용약관 동의(필수)"
            isArrow={true}
            inputName="isAgree"
            handler={handleInput}
            value={agreeArray.isAgree}
          />
          <CheckBox
            lableText="개인정보 수집 및 이용동의(필수)"
            isArrow={true}
            inputName="isUseConfirm"
            handler={handleInput}
            value={agreeArray.isUseConfirm}
          />
          <CheckBox
            lableText="광고성 정보 수신동의(선택)"
            isArrow={true}
            inputName="isAdvertisingConfirm"
            handler={handleInput}
            value={agreeArray.isAdvertisingConfirm}
          />

          <div className="advertising-info" style={{ marginBottom: "25%" }}>
            <p>광고성 정보 수신 방법(선택)</p>
            <p>선택하지 않을 시 push로만 제공됩니다.</p>
            <Image
              src="/images/icons/check_white.png"
              alt="체크 이미지"
              width={10}
              height={10}
              style={{
                position: "relative",
                left: "53px",
                zIndex: "1",
                bottom: "2px",
              }}
            />
            <input
              type="checkbox"
              id="email"
              name="email"
              style={{ marginLeft: "40px" }}
              onChange={handleADInput}
            />
            <label htmlFor="email">E-mail</label>
            <Image
              src="/images/icons/check_white.png"
              alt="체크 이미지"
              width={10}
              height={10}
              style={{
                position: "relative",
                left: "38px",
                zIndex: "1",
                bottom: "2px",
              }}
            />
            <input
              type="checkbox"
              id="sms"
              name="sms"
              onChange={handleADInput}
            />
            <label htmlFor="sms">SMS</label>
          </div>
        </section>
        <BottomFixedContainer>
          {required ? (
            <Button
              btnType={"button"}
              btnEvent={() => router.push(`/signup2?ad=${adAgree}`)}
            >
              다음
            </Button>
          ) : (
            <>
              <Button btnType="button" btnEvent={() => ""} type="disabled">
                다음
              </Button>
            </>
          )}
        </BottomFixedContainer>
      </div>
    </>
  );
}
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
      font-size: 1.4rem;
      line-height: 25px;
    }
    & p {
      font-size: 0.8rem;
    }
  }
`;

const agreeInput = css`
  width: 100%;
  padding: 0;
  font-size: 1.2rem;
  margin-top: 80px;
  @media screen and (max-height: 700px) {
    font-size: 1rem;
    margin-top: 25px;
  }
`;
