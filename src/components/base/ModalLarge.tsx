import React, { PropsWithChildren, ReactNode } from 'react';
import styled, { css, keyframes } from 'styled-components';

interface ModalProps {
  onClickToggleModal: () => void;
  children: ReactNode;
}

export default function ModalLarge({ onClickToggleModal, children }: PropsWithChildren<ModalProps>) {
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

const ModalContainer = styled.div`
  width: 100%;
  //max-width: 1000px;
  //position: fixed;
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 600px) {
    width: 90vw;
    height: 90vh;
    margin-top: 5vh;
    top: 0px;

    & > dialog {
      position: fixed;

      height: 100%;
    }
  }
`;

// 모달 창 (흰 색 컨텐츠 창)
const DialogBox = styled.dialog`
  width: 50vw; // *전체화면에 대해 크기 조정 필요 43vw 814px
  //height: 750px; // 81vh; // *전체화면에 대해 크기 조정 필요 40vw750px
  /* height: 40vw; */
  height: 38vw;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  border-radius: 20px;
  box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  background-color: white;
  position: fixed;
  top: 0px;
  z-index: 10;

  // --------------이하 스크롤바 관련 코드-------------

  /* Webkit 기반의 브라우저 Chrome, Safari */
  &::-webkit-scrollbar {
    width: 1px;
    height: 10px; /* 스크롤바 높이를 10px로 수정 */
  }

  &::-webkit-scrollbar-thumb {
    background: transparent; /* 투명으로 설정 */
    border-radius: 999px;
    min-height: 30%;
    box-shadow: transparent;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: transparent;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background: transparent;
  }

  &::-webkit-scrollbar-button {
    background: transparent;
  }

  &::-webkit-scrollbar-corner {
    background: transparent;
  }

  .scrollbarWrapper {
    position: absolute;
    right: 0;
    top: 0;
    width: 10px;
    height: 100%;
    background: transparent;
    pointer-events: none;
  }

  /* Firefox에서 스크롤바 숨기기 */
  scrollbar-width: thin;

  /* Internet Explorer에서 스크롤바 숨기기 */
  -ms-overflow-style: -ms-autohiding-scrollbar;

  @media screen and (max-width: 600px) {
    width: 100vw;
    height: 100vh;
  }
  overflow: hidden; // 스크롤 기능 X
`;

// 모달 뒷 (검은) 배경 - 크기 문제 해결 필요
const Backdrop = styled.div`
  width: 100%; // 100vw;
  height: 100%; // 100vh;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 9;
  background: rgba(20, 16, 19, 0.55);
`;
