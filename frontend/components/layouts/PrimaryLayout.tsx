import React from "react";
import MainHeaderTop from "@/components/layouts/MainHeaderTop";
import MainHeaderBottom from "@/components/layouts/MainHeaderBottom";
import SubHeader from "./SubHeader";
import { useRouter } from "next/router";
import SearchResultInfo from "../widgets/SearchResultInfo";
import ContentsModal from "../modals/ContentsModal";
import { useRecoilState } from "recoil";
import { contentsModalState } from "@/state/contentsModalState";

export default function PrimaryLayout(props: { children: React.ReactNode }) {
  const { pathname } = useRouter();
  const { query } = useRouter();
  const keyword = query.keyword;

  const [contentsIsView, setContentsIsView] =
    useRecoilState<boolean>(contentsModalState);

  const mainMenu = ["/", "/event", "/best", "/mypage"];
  return (
    <>
      <div className="container">
        {contentsIsView && <ContentsModal />}
        {pathname !== "/login" && (
          <header>
            {pathname === "/delivery_register" ? "" : <MainHeaderTop />}
            {pathname === "/search_result" && (
              <SearchResultInfo keyword={keyword} />
            )}
            {mainMenu.includes(pathname) ? <MainHeaderBottom /> : ""}
            {pathname === "/best" || pathname === "/event" ? <SubHeader /> : ""}
          </header>
        )}
        {props.children}
      </div>
    </>
  );
}
