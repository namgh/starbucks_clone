/** @jsxImportSource @emotion/react */

import BackIcon from "@/components/ui/BackIcon";
import BottomFixedContainer from "@/components/ui/BottomFixedContainer";
import Button from "@/components/ui/Button";
import Timer from "@/components/ui/Timer";
import Config from "@/configs/config.export";
import { css } from "@emotion/react";
import axios from "axios";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function SignUp2() {
  const { baseUrl } = Config();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailTokenValidation, setEmailTokenValidation] = useState(false);
  const [emailToken, setEmailToken] = useState("");
  const [password, SetPassword] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("");
  const [adAgreement, setAdAgreement] = useState<string | string[]>("none");

  const [emailErrMsg, setEmailErrMsg] = useState<string | null>("");
  const [emailValidationErrMsg, setEmailValidationErrMsg] = useState<
    string | null
  >("");
  const [passwordErrMsg, SetPasswordErrMsg] = useState<string | null>("");
  const [passwordValidationErrMsg, setPasswordValidationErrMsg] = useState<
    string | null
  >("");

  const [isTokenSend, setIsTokenSend] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [time, setTime] = useState(180);

  const [isShow, setIsShow] = useState<boolean>(false);

  const emailRegex =
    /^[0-9a-zA-Z]([-_ .]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/;

  // 광고 동의 정보
  useEffect(() => {
    router.query.ad && setAdAgreement(router.query.ad);
  }, [router.query.ad]);

  //이메일 확인
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!emailRegex.test(e.target.value))
      setEmailErrMsg(`⚠️ 이메일 형식을 확인해주세요`);
    else setEmailErrMsg(null);
  };

  //비밀번호 변경 로직
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    SetPassword(e.target.value);
    if (!passwordRegex.test(e.target.value))
      SetPasswordErrMsg(
        "⚠️ 비밀번호 형식을 확인해주세요 (10자리 이상의 문자, 숫자 조합)"
      );
    else SetPasswordErrMsg("");
    //비밀번호 검증과 현재 비밀번호가 일치하지 않다면 setPasswordValidationErrmsg 설정
    if (e.target.value === passwordValidation) setPasswordValidationErrMsg("");
    else if (e.target.value && e.target.value !== passwordValidation)
      setPasswordValidationErrMsg("⚠️ 비밀번호가 일치하지 않습니다");
  };
  const onChangeToken = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailToken(e.target.value);
  };

  //비밀번호 검증 로직
  const onChangePasswordValidation = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordValidation(e.target.value);
    if (password !== e.target.value)
      setPasswordValidationErrMsg("⚠️ 비밀번호가 일치하지 않습니다");
    else setPasswordValidationErrMsg("");
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  //이메일 검증 및 인증번호 전달
  const sendEmailValidate = async () => {
    // 이메일 양식 체크
    if (!(emailErrMsg === null) || email === "") {
      Toast.fire({
        icon: "warning",
        title: "이메일을 다시 확인해주세요",
      });
      return;
    }

    //중복 이메일 체크
    const check = await axios
      .post(`${baseUrl}/api/email/duplicate`, { email })
      .then((res) => {
        return res.status;
      })
      .catch((error) => {
        return error.response.status;
      });

    if (check === 409) {
      Toast.fire({
        icon: "warning",
        title: "이미 존재하는 이메일입니다",
      });
      return;
    }
    setIsShow(true);

    //있으면 이메일 보내기
    axios
      .post(`${baseUrl}/api/email`, {
        email,
      })
      .catch((error) => {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "이메일 전송 실패, 잠시 후 다시 시도해주세요",
        });
      });
  };

  // 인증번호 검증 및 검증 후 알림, 검증버튼 제거
  const checkTokenValidation = async () => {
    const validation = await axios
      .post(`${baseUrl}/api/email/validate`, {
        email: email,
        authCode: emailToken,
      })
      .then((res) => {
        return res;
      });
    if (validation.status === 202) {
      setEmailTokenValidation(false);

      Toast.fire({
        icon: "warning",
        title: "인증번호가 맞지 않습니다",
      });
      return;
    }

    setEmailTokenValidation(true);
    Toast.fire({
      icon: "success",
      title: "인증되었습니다",
    });
    setIsShow(false);
  };

  const onClickSignup = async () => {
    //회원가입 요청
    if (passwordErrMsg || passwordValidationErrMsg || emailErrMsg) {
      Toast.fire({
        icon: "error",
        title: "잘못된 값이 존재합니다",
      });
      return;
    } else if (!emailTokenValidation) {
      Toast.fire({
        icon: "warning",
        title: "이메일 인증을 완료해주세요",
      });
      return;
    } else if (!passwordErrMsg && !passwordValidationErrMsg && !emailErrMsg) {
      await axios
        .post(`${baseUrl}/api/auth/signup`, { email, password, adAgreement })
        .then(() => {
          router.push(`/signup_success?id=${email.split("@")[0]}`);
          Toast.fire({
            icon: "success",
            title: "회원가입 완료",
          });
        })
        .catch(() => {
          Toast.fire({
            icon: "error",
            title: "회원가입에 실패하였습니다",
          });
          return;
        });
    }
  };

  return (
    <>
      <header>
        <div className="signup-header">
          <BackIcon />
        </div>
      </header>

      <section className="greeting">
        <h2 className="signup-info">
          아이디와 비밀번호를
          <br />
          입력해 주세요.
        </h2>
      </section>

      <section className="email-input">
        <input
          type="text"
          id="user_email"
          name="email"
          placeholder="이메일@example.com"
          onChange={onChangeEmail}
        />
        <div style={{ width: "20%", textAlign: "center" }}>
          <button type="button" onClick={sendEmailValidate} css={button}>
            인증
          </button>
        </div>
      </section>
      <div className="signup-error">{emailErrMsg}</div>

      {isShow && (
        <section className="email-input" style={{ display: "flex" }}>
          <Timer />
          <input
            type="text"
            id="user_token_validate"
            placeholder="인증번호"
            onChange={onChangeToken}
            style={{ width: "calc(100vw - 20% - 20% - 35px)" }}
          />
          <div style={{ width: "20%", textAlign: "center" }}>
            <button type="button" onClick={checkTokenValidation} css={button}>
              확인
            </button>
          </div>
        </section>
      )}

      <section id="id-password-input">
        <input
          type="password"
          id="user_password"
          name="password"
          placeholder="비밀번호 (10-20자리 이내)"
          onChange={onChangePassword}
        />
        <div className="signup-error" style={{ paddingLeft: "0" }}>
          {passwordErrMsg}
        </div>
        <input
          type="password"
          id="user_password_check"
          name="password_check"
          placeholder="비밀번호 확인"
          onChange={onChangePasswordValidation}
        />
        <div className="signup-error" style={{ paddingLeft: "0" }}>
          {passwordValidationErrMsg}
        </div>
      </section>
      <BottomFixedContainer>
        <Button btnType={"submit"} btnEvent={onClickSignup}>
          회원가입
        </Button>
      </BottomFixedContainer>
    </>
  );
}

const button = css`
  text-align: center;
  border-radius: 10%;
  // width: 90%;
  padding: 0 0.5rem;
  height: 2.3rem;
  background-color: var(--color-light-green);
  border: none;
  color: var(--color-white);
  border: none;
  color: white;
  margin: 15px 0;
  letter-spacing: -0.2px;
  font-size: 1.1rem;
  white-space: nowrap;
  &:hover {
    filter: brightness(110%);
  }
  &:active {
    filter: brightness(120%);
  }
`;
