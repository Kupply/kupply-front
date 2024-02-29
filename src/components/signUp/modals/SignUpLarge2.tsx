import { useState, useCallback } from 'react';
import styled from 'styled-components';
import AlertIconExclamation from '../../../assets/icons/AlertIconExclamation';
import TextFieldBox, { StateOptions } from '../../../assets/OldTextFieldBox';
import SubmitButton from '../../../assets/buttons/OldSubmitButton';
import Typography from '../../../assets/OldTypography';
import ModalLarge from '../../base/ModalLarge';
import { sendEmail } from '../../../pages/signUp/SignUp1Page';
import SignUpAlertLarge02 from '../../../assets/alert/SignUpAlertLarge02';

export interface ModalProps {
  currentModal: number;
  isOpenModal: boolean;
  setCurrentModal: (currentModal: number) => void;
  setOpenModal: (isOpenModal: boolean) => void;
  onClickModal: () => void; // 함수;
  email: string;
  emailState: StateOptions;
  setEmail: (email: string) => void;
  setEmailState: (emailState: StateOptions) => void;
  setBlank: () => void;
}

export default function SignUpLarge2(props: ModalProps) {
  /* 각 input들의 값을 state를 사용하여 관리 */
  // const [email, setEmail] = useState<string>("");
  // const [emailState, setEmailState] = useState<StateOptions>("default");

  const {
    currentModal,
    isOpenModal,
    setCurrentModal,
    setOpenModal,
    onClickModal,
    email,
    emailState,
    setEmail,
    setEmailState,
    setBlank,
  } = props;

  return (
    <Main>
      {isOpenModal && (
        <SignUpAlertLarge02
          onClickModal={onClickModal}
          setOpenModal={setOpenModal}
          isOpenModal={isOpenModal}
          setBlank={setBlank}
          setEmail={setEmail}
          sendEmail={sendEmail}
          setCurrentModal={setCurrentModal}
          currentModal={currentModal}
          email={email}
          emailState={emailState}
          setEmailState={setEmailState}
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

const PrevButton = styled.button`
  display: flex;
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50px;
  left: 50px;

  cursor: pointer;
`;

const ActionWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 628px;

  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin-top: 72px;

  & > div {
    width: 90%;
    box-sizing: border-box;
    height: 68px;
    max-width: 628px;
  }

  & > button {
    width: 90%;
    max-width: 628px;
  }
`;
