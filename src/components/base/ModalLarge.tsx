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
    <ModalContainer>
      <DialogBoxSizer>
        <DialogBox>{children}</DialogBox>
      </DialogBoxSizer>
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

// 모달창 위치 조정 목적의 컨테이너
const ModalContainer = styled.div`
  width: 100vw;
  height: 90vh;
  //position: fixed;
  position: fixed;
  top: 0;
  align-items: center;
  justify-content: center;
`;

// 모달 창 (흰 색 컨텐츠 창)
const DialogBox = styled.dialog`
  width: calc(814px * 0.8);
  height: calc(1028px * 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;

  border: none;
  border-radius: 20px;
  box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  background-color: white;
  z-index: 15;
`;

const DialogBoxSizer = styled.div`
  display: flex;
  padding: 50px 50px;
  position: fixed;
  z-index: 15;
`;

// 모달 뒷 (검은) 배경 - 크기 문제 해결 필요
const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  // top: 0;
  position: fixed;
  z-index: 9;
  background: rgba(20, 16, 19, 0.55);
`;
