import styled from 'styled-components';
import { sendEmail } from '../../../../utils/SignUpFunctions';
//import SignUpAlertLarge01 from '../../../../assets/alert/SignUpAlertLarge01';
import SignUpAlertMobileLarge01 from '../../../assets/alert/SignUpAlertLarge01';

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
        <SignUpAlertMobileLarge01
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

