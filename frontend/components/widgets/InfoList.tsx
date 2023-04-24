/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import RightArrowMenu from "../ui/RightArrowMenu";
import Modal from "react-modal";
import InfoModal from "../modals/InfoModal";
import ModalHeader from "../ui/ModalHeader";

export default function InfoList() {
  const [isOpen1, setIsOpen1] = useState<boolean>(false);
  const [isOpen2, setIsOpen2] = useState<boolean>(false);
  const [isOpen3, setIsOpen3] = useState<boolean>(false);

  const hr = css`
    opacity: 0.5;
    margin: 0;
  `;

  const modalStyle: Object = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(255, 255, 255, 0.45)",
      zIndex: 999,
    },
    content: {
      position: "fixed",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      zIndex: 999,
      padding: "0",
    },
  };

  return (
    <div
      css={css`
        margin-bottom: 100px;
      `}
    >
      <Modal
        isOpen={isOpen1}
        style={modalStyle}
        onRequestClose={() => setIsOpen1(false)}
        ariaHideApp={false}
      >
        <ModalHeader
          setModalOpen={setIsOpen1}
          headerName="이용조건 및 배송안내"
        />
        <InfoModal setModalOpen={setIsOpen1} title="이용조건 및 배송안내" />
      </Modal>
      <button onClick={() => setIsOpen1(true)} style={{ width: "100%" }}>
        <RightArrowMenu
          menuName="이용조건 및 배송안내"
          link="#"
          fontType="strong"
        />
      </button>

      <hr css={hr} />

      <Modal
        isOpen={isOpen2}
        style={modalStyle}
        onRequestClose={() => setIsOpen2(false)}
        ariaHideApp={false}
      >
        <ModalHeader setModalOpen={setIsOpen2} headerName="교환/반품 안내" />
        <InfoModal setModalOpen={setIsOpen2} title="교환/반품 안내" />
      </Modal>
      <button onClick={() => setIsOpen2(true)} style={{ width: "100%" }}>
        <RightArrowMenu menuName="교환/반품 안내" link="#" fontType="strong" />
      </button>

      <hr css={hr} />

      <Modal
        isOpen={isOpen3}
        style={modalStyle}
        onRequestClose={() => setIsOpen3(false)}
        ariaHideApp={false}
      >
        <ModalHeader setModalOpen={setIsOpen3} headerName="취소/환불 안내" />
        <InfoModal setModalOpen={setIsOpen3} title="취소/환불 안내" />
      </Modal>
      <button onClick={() => setIsOpen3(true)} style={{ width: "100%" }}>
        <RightArrowMenu menuName="취소/환불 안내" link="#" fontType="strong" />
      </button>
    </div>
  );
}
