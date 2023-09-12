import React, { PropsWithChildren } from "react";
import styled, { css, keyframes } from "styled-components";

/* 모달의 큰 틀 1) Wrapper - 2) DialogBox - 3) Backdrop 구성 */

// Reference: https://velog.io/@april_5/React%EB%A1%9C-Modal-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
// Real-Reference: https://velog.io/@syncstar/%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%AA%A8%EB%8B%AC%EC%B0%BD%EB%A7%8C%EB%93%A4%EA%B8%B0

interface ModalProps {
  onClickToggleModal: () => void;
  // 아무 인자를 받지 않고, void 를 return (=no return) 하는 함수
  // This kind of function is commonly used as a 'callback' or 'event handler' to specify what should happen when a modal is closed.
}

export default function Modal({
  onClickToggleModal,
  children,
}: PropsWithChildren<ModalProps>) {
  return (
    <ModalContainer>
      <DialogBox>{children}</DialogBox>
      <Backdrop
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();

          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }}
      />
    </ModalContainer>
  );
}

// 완료
const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 완료
const DialogBox = styled.dialog`
  width: 42.6%; //818px; // *전체화면에 대해 크기 조정 필요
  height: 73.5%; // 918px; // *전체화면에 대해 크기 조정 필요
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  border-radius: 20px;
  box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1); // 수정
  box-sizing: border-box;
  background-color: white;
  position: fixed; // 추가
  z-index: 10;
`;

// 완료
const Backdrop = styled.div`
  width: 100%; // 100vw;
  height: 100%; // 100vh;
  top: 0;
  position: fixed;
  z-index: 9;
  background: rgba(20, 16, 19, 0.55);
`;

/*
interface ModalProps {
  setIsOpen: Dispatch<boolean>;
  children: ReactNode;
}

export default function Modal({ setIsOpen, children }: ModalProps) {
  const closeModal = (e: TouchEvent<HTMLDivElement>) => {
    if ((e?.target as Element)?.contains(e?.currentTarget)) {
      setIsOpen(false);
    }
  };

  return (
    <Wrapper onTouchEnd={(e) => closeModal(e)}>
      <div>{children}</div>
      <Close onTouchEnd={() => setIsOpen(false)}>X</Close>
    </Wrapper>
  );
}

const Close = styled.button`
  position: fixed;
  top: 50px;
  right: 50px;
  color: white;
  font-size: 22px;
  cursor: pointer;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background: blue;
`;
*/

/*
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
*/
