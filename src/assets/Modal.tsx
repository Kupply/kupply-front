import React, { useState } from "react";
import styled from "styled-components";

// 2023.09.04 수정중 by 윤진

interface ModalProps extends React.ComponentPropsWithoutRef<"div"> {
  title?: string;
  alert?: string;
  coin?: number | string;
}

const ModalWrapper = styled.div`
  width: 100%; //100vw;
  height: 100%; //100vh;
  align-items: center;
  justify-content: center;
`;

// 반영 완료
const ModalBackground = styled.div`
  background-color: rgba(20, 16, 19, 0.55);
  width: 100%;
  height: 100vh;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 70px 50px 70px 50px;
  box-sizing: border-box;
  width: 57.3%;
  height: 50px;
  background-color: white;
  /* Alert_black shadow */
  box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
`;

const useOpenModal = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const clickModal = () => {
    setIsOpenModal(true);
  };
  const closeModal = () => {
    setIsOpenModal(false);
  };
  return { isOpenModal, clickModal, closeModal };
};

export default function Modal({ title, alert, coin }: ModalProps) {
  const { isOpenModal, clickModal, closeModal } = useOpenModal();

  return (
    <ModalBackground onClick={closeModal}>
      <ModalContainer>모달창입니다.</ModalContainer>
    </ModalBackground>
  );
}
