import { useState, useCallback } from 'react';
import styled from 'styled-components';
import { sendEmail } from '../../../pages/signUp/SignUp1Page';
import SignUpAlertLarge from '../../../assets/alert/SignUpAlertLarge01';

export interface ModalProps {
  currentModal: number;
  isOpenModal: boolean;
  setCurrentModal: (currentModal: number) => void;
  setOpenModal: (isOpenModal: boolean) => void;
  onClickModal: () => void; // 함수
  email: string;
  setBlank: () => void;
}

export default function SignUpLarge1(props: ModalProps) {
  const { currentModal, isOpenModal, setCurrentModal, setOpenModal, onClickModal, email, setBlank } = props;

  return (
    <Main>
      {isOpenModal && (
        <SignUpAlertLarge
          onClickModal={onClickModal}
          setOpenModal={setOpenModal}
          isOpenModal={isOpenModal}
          setBlank={setBlank}
          setCurrentModal={setCurrentModal}
          currentModal={currentModal}
          email={email}
          sendEmail={sendEmail}
        />
      )}
    </Main>
  );
}

const Main = styled.main`
  width: 100%;
  height: 1px; // 버튼 안눌림 이슈 수정
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  z-index: 1005; // Modal.tsx 와 상이한 stacking context
`;

const CloseButton = styled.button`
  display: flex;
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50px;

  cursor: pointer;
`;

const PrevButton = styled.button`
  display: flex;
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50px;

  cursor: pointer;
`;

const ActionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin-top: 72px;
`;
