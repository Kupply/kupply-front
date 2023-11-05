import React, { PropsWithChildren } from 'react';
import styled, { css, keyframes } from 'styled-components';

/* 모달의 큰 틀 1) Wrapper - 2) DialogBox - 3) Backdrop 구성 */
// 이슈 1. 모달 위치 (잠정적 해결)
// 2. 모달 백드롭 (잠정적 해결)
// 3. 모달 셋타임 (해결)
// 4. 애니메이션
// 5. dropDown useRef 처럼 모달창 외부 누를 시, 창 사라지게 설정

// Reference: https://velog.io/@april_5/React%EB%A1%9C-Modal-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
// Real-Reference: https://velog.io/@syncstar/%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%AA%A8%EB%8B%AC%EC%B0%BD%EB%A7%8C%EB%93%A4%EA%B8%B0

interface ModalProps {
  onClickToggleModal: () => void;
}

export default function ModalSmall({ onClickToggleModal, children }: PropsWithChildren<ModalProps>) {
  return (
    <ModalContainer>
      <Backdrop
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();

          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }}
      >
        <DialogBox>{children}</DialogBox>
      </Backdrop>
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  //top: 670px;
  //left: 300px;
  // right: 663px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DialogBox = styled.dialog`
  width: 594px;
  height: 102px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 0px 28px 0px rgba(20, 20, 20, 0.05);
  box-sizing: border-box;
  background-color: rgba(248, 248, 248, 1);
  position: fixed;
  z-index: 10;
`;

const Backdrop = styled.div`
  width: 594px;
  height: 102px;
  display: flex;
  align-items: center;
  position: fixed;
  top: 75%; // 임의 조정
  left: 50%; // 663px;
  z-index: 9;
  //background: rgba(248, 248, 248, 0.4);
`;
