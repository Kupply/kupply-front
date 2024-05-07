import styled from 'styled-components';
import { sendEmail } from '../../../utils/SignUpFunctions';
import SignUpAlertLarge01 from '../../../assets/alert/SignUpAlertLarge01';

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
        <SignUpAlertLarge01
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
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  z-index: 1005;

  /* & > div > dialog {
    top: 15%;
    min-height: 600px;
  } */
`;
