import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
//import Typography from '../../../assets/OldTypography';
import Typography from '../../../../assets/Typography';
import ModalSmall from '../../base/ModalSmall';

// ref: https://velog.io/@chlgdnd/%EB%AA%A8%EB%8B%AC-%EC%B0%BD-Fade-out-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0Feat.-React-Typescript

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.354vw; //26px;
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

export default function SignUpSmall(props: ModalProps) {
  const { isOpenModal, setOpenModal, onClickModal } = props;
  // 모달창 2초간만 유지
  useEffect(() => {
    if (isOpenModal) {
      setOpenModal(true); // 추가 (애니메이션 차원)

      const timer = setTimeout(() => {
        onClickModal(); // Close the modal after 2 seconds
        setOpenModal(false); // 추가 (애니메이션 차원)
        clearTimeout(timer); // Clear the timer to prevent multiple executions
      }, 2000);
    }
  }, [isOpenModal, setOpenModal, onClickModal]);

  return (
    <ModalContainer isOpen={isOpenModal}>
      <ModalSmall onClickToggleModal={onClickModal}>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M5.0992 9.08268C7.35437 9.08268 9.18254 7.25451 9.18254 4.99935C9.18254 2.74419 7.35437 0.916016 5.0992 0.916016C2.84404 0.916016 1.01587 2.74419 1.01587 4.99935C1.01587 7.25451 2.84404 9.08268 5.0992 9.08268Z"
              stroke="#D85888"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.46032 3.97852L4.58879 5.85004L3.7381 4.99935"
              stroke="#D85888"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <TextWrapper>
          <Typography size="10px" bold="500" color="#D85888">
            새로운 인증번호가 전송되었어요.
          </Typography>
        </TextWrapper>
      </ModalSmall>
    </ModalContainer>
  );
}
