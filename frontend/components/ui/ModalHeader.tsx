/** @jsxImportSource @emotion/react */
import { contentsModalState } from "@/state/contentsModalState";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { useSetRecoilState } from "recoil";
import CloseIcon from "./CloseIcon";
import Image from "next/image";

export default function ModalHeader(props: {
  headerName?: string;
  setModalOpen?: Dispatch<SetStateAction<boolean>>;
}) {
  const { headerName, setModalOpen } = props;
  const setContentsIsView = useSetRecoilState<boolean>(contentsModalState);
  const router = useRouter();

  const header = css`
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: space-between;
    padding: 0px 10px;
  `;

  const closeModal = () => {
    setContentsIsView(false);
    router.back();
  };

  return (
    <div css={header}>
      <div>
        <Image
          src="/images/icons/blank.png"
          alt={"투명"}
          width={30}
          height={30}
        />
      </div>
      <h3>{headerName}</h3>
      <CloseIcon
        style={{ padding: "16px 6px" }}
        onClickHandler={() =>
          setModalOpen ? setModalOpen(false) : closeModal()
        }
        width={15}
        height={15}
      />
    </div>
  );
}
