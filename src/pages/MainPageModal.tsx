import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import Typography from '../assets/OldTypography';
import AlertIconCheck from '../assets/icons/AlertIconCheck';
import ModalSmall from '../components/base/ModalSmall';

// ref: https://velog.io/@chlgdnd/%EB%AA%A8%EB%8B%AC-%EC%B0%BD-Fade-out-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0Feat.-React-Typescript

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 26px;
`;

const fadeInAnimation = css`
  animation: fadeIn 0.5s;
  -moz-animation: fadeIn 0.5s; /* Firefox */
  -webkit-animation: fadeIn 0.5s; /* Safari and Chrome */
  -o-animation: fadeIn 0.5s; /* Opera */
  animation-fill-mode: forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-moz-keyframes fadeIn {
    /* Firefox */
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes fadeIn {
    /* Safari and Chrome */
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-o-keyframes fadeIn {
    /* Opera */
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const fadeOutAnimation = css`
  animation: fadeOut 0.5s;
  -moz-animation: fadeOut 0.5s; /* Firefox */
  -webkit-animation: fadeOut 0.5s; /* Safari and Chrome */
  -o-animation: fadeOut 0.5s; /* Opera */
  animation-fill-mode: forwards;

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  @-moz-keyframes fadeOut {
    /* Firefox */
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  @-webkit-keyframes fadeOut {
    /* Safari and Chrome */
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  @-o-keyframes fadeOut {
    /* Opera */
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

const ModalContainer = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  ${(props) => (props.isOpen ? fadeInAnimation : fadeOutAnimation)};
  //margin-left: 200px;
`;

export interface ModalProps {
  currentModal: number;
  isOpenModal: boolean;
  setCurrentModal: (currentModal: number) => void;
  setOpenModal: (isOpenModal: boolean) => void;
  onClickModal: () => void; // 함수
}

export default function MainPageModal(props: ModalProps) {
  const { isOpenModal, setOpenModal, onClickModal } = props;
  // 모달창 2초간만 유지
  useEffect(() => {
    if (isOpenModal) {
      setOpenModal(true); // 추가 (애니메이션 차원)

      const timer = setTimeout(() => {
        onClickModal(); // Close the modal after 2 seconds
        setOpenModal(false); // 추가 (애니메이션 차원)
        clearTimeout(timer); // Clear the timer to prevent multiple executions
      }, 3000);
    }
  }, [isOpenModal, setOpenModal, onClickModal]);

  return (
    <ModalContainer isOpen={isOpenModal}>
      <ModalSmall onClickToggleModal={onClickModal}>
        <AlertIconCheck width="62px" height="62px" />
        <TextWrapper>
          <Typography size="mediumText" color="#141414" style={{ fontWeight: '700', lineHeight: '88.889%' }}>
            회원가입을 위한 이메일을 입력해주세요!
          </Typography>
          <div style={{ height: '8px' }}></div>
          <Typography size="normalText" color="#141414">
            이메일 입력 시 회원가입 페이지로 이동합니다.
          </Typography>
        </TextWrapper>
      </ModalSmall>
    </ModalContainer>
  );
}
