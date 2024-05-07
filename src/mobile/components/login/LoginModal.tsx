import styled from "styled-components";
import LoginAlertMobileLarge01 from "../../assets/alert/LoginAlertLarge1";
import { StateOptions } from "../../assets/field/Input01";

interface LoginModalProps{
  isOpenModal: boolean;
  setOpenModal: (isOpenModal: boolean) => void;
  onClickModal: () => void; // 함수;
  sendEmail: (email: string) => Promise<void>;
}

export default function LoginModal(props: LoginModalProps){
  const {isOpenModal, setOpenModal, onClickModal, sendEmail} = props;
  
  return (
    <Main>
      <LoginAlertMobileLarge01
      isOpenModal={isOpenModal}
      setOpenModal={setOpenModal}
      onClickModal={onClickModal}
      sendEmail={sendEmail}
      />
    </Main>
  )
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