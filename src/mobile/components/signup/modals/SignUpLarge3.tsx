import styled from 'styled-components';
import SignUpAlertMobileLarge03 from '../../../assets/alert/SignUpAlertLarge03';


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
        <SignUpAlertMobileLarge03
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
