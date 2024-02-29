import { useState, useCallback } from 'react';
import styled from 'styled-components';
import AlertIconCheck from '../../../assets/icons/AlertIconCheck';
import LabelButton from '../../../assets/buttons/LabelButton';
import Typography from '../../../assets/OldTypography';
import ModalLarge from '../../base/ModalLarge';
import SignUpAlertLarge03 from '../../../assets/alert/SignUpAlertLarge03';

export interface ModalProps {
  currentModal: number;
  isOpenModal: boolean;
  setCurrentModal: (currentModal: number) => void;
  setOpenModal: (isOpenModal: boolean) => void;
  onClickModal: () => void; // 함수
  email: string;
}

export default function SignUpLarge3(props: ModalProps) {
  const { currentModal, isOpenModal, setCurrentModal, setOpenModal, onClickModal, email } = props;

  return (
    <Main>
      {isOpenModal && (
        <SignUpAlertLarge03
          currentModal={currentModal}
          isOpenModal={isOpenModal}
          setCurrentModal={setCurrentModal}
          setOpenModal={setOpenModal}
          onClickModal={onClickModal}
          email={email}
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
  right: 50px;

  cursor: pointer;
`;

const ActionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 83px;
`;
