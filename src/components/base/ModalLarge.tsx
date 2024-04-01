import React, { PropsWithChildren, ReactNode } from 'react';
import styled, { css, keyframes } from 'styled-components';

/* 모달의 큰 틀 1) Wrapper - 2) DialogBox - 3) Backdrop 으로 구성 */

// Reference 1: https://velog.io/@april_5/React%EB%A1%9C-Modal-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
// Reference 2 (중요): https://velog.io/@syncstar/%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%AA%A8%EB%8B%AC%EC%B0%BD%EB%A7%8C%EB%93%A4%EA%B8%B0

interface ModalProps {
  onClickToggleModal: () => void;
  children: ReactNode; // Allow multiple children
  // 아무 인자를 받지 않고, void 를 return (=no return) 하는 함수
  // This kind of function is commonly used as a 'callback' or 'event handler' to specify what should happen when a modal is closed.
}

export default function ModalLarge({ onClickToggleModal, children }: PropsWithChildren<ModalProps>) {
  return (
    <Overlay>
      <Modal>
        {children}
      </Modal>
    </Overlay>
  );
}


const Overlay = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(52, 64, 84, 0.6);
  backdrop-filter: blur(8px);
  animation: fadein 0.5s;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Modal = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  height: 70%;
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0px 20px 24px -4px rgba(16, 24, 40, 0.1),
    0px 8px 8px -4px rgba(16, 24, 40, 0.04);
  transition: all 0.5s ease;
  z-index: 1;
`;
