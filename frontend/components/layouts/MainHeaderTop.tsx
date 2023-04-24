import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useRecoilState, useRecoilValue } from "recoil";
import ContentsModal from "../modals/ContentsModal";
import Image from "next/image";
import { contentsModalState } from "@/state/contentsModalState";
import { CgProfile } from "react-icons/cg";
import { GrCart, GrSearch, GrLogout, GrLogin } from "react-icons/gr";
import { accessTokenState } from "@/state/accessTokenState";
import Badge from "../ui/Badge";
import BackIcon from "../ui/BackIcon";
import axiosApiInstance from "@/utils/axiosInstance";
import Swal from "sweetalert2";

export default function MainHeaderTop() {
  const router = useRouter();
  const [contentsIsView, setContentsIsView] =
    useRecoilState<boolean>(contentsModalState);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const handleBack = () => {
    if (router.pathname === "store") {
      router.replace("/");
      setContentsIsView(false);
    } else router.back();
  };

  const onClickLogout = async () => {
    Swal.fire({
      text: "로그아웃 하시겠습니까?",
      showDenyButton: true,
      confirmButtonText: "확인",
      denyButtonText: `취소`,
      width: "70vw",
      confirmButtonColor: "var(--color-light-green)",
      denyButtonColor: "rgb(231 50 83)",
    }).then((res) => {
      if (res.isConfirmed) {
        logout();
        Swal.fire("로그아웃 되었습니다", "", "success");
      }
    });
  };

  const logout = async () => {
    setAccessToken("");
    await axiosApiInstance.post(`auth/logout`).catch((error) => {
      router.push("/login");
    });
  };

  const showModal = () => {
    setContentsIsView(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setContentsIsView(false);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      <div className="header-top">
        <div className="menu-icon">
          {router.pathname === "/store" ||
          router.pathname.includes("/product") ||
          router.pathname === "/cart" ||
          router.pathname === "/payment" ? (
            <BackIcon />
          ) : (
            <div>
              <button onClick={showModal} style={{ padding: "0" }}>
                <Image
                  src="/images/icons/menu.svg"
                  alt=""
                  width={20}
                  height={20}
                />
              </button>
            </div>
          )}
        </div>
        <div onClick={() => router.push("/")}>
          <h1 onClick={closeModal}>온라인 스토어</h1>
        </div>
        <nav>
          <ul>
            {router.pathname === "/payment" ? (
              <li className="close-icon">
                <Image
                  src="/images/icons/close.png"
                  alt=""
                  width={20}
                  height={20}
                  onClick={() => router.back()}
                />
              </li>
            ) : (
              <>
                <li>
                  <Link href="/search">
                    <GrSearch size={20} />
                  </Link>
                </li>
                <li>
                  {accessToken && <Badge />}
                  <Link href="/cart">
                    <GrCart size={20} />
                  </Link>
                </li>
                <li>
                  <div
                    onClick={
                      !accessToken ? () => router.push("/login") : onClickLogout
                    }
                  >
                    {!accessToken ? (
                      <CgProfile size={20} />
                    ) : (
                      <GrLogout size={20} />
                    )}
                  </div>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
}
