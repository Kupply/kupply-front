import styled from 'styled-components';
import { StateOptions } from '../../../assets/OldTextFieldBox';
import { sendEmail } from '../../../utils/SignUpFunctions';
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
