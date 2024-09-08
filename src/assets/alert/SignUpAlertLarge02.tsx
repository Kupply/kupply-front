import ModalMedium from '../../components/base/ModalMedium';
import styled from 'styled-components';
import AlertIconExclamation from '../icons/AlertIconExclamation';
import Typography from '../Typography';
import type { StateOptions } from '../OldTextFieldBox';
import Icon03 from '../icons/Icon03';
import Icon02 from '../icons/Icon02';
import TextFieldBox from '../OldTextFieldBox';
//import SubmitButton from '../buttons/SubmitButton';
import Button05 from '../buttons/Button05';

interface SignUpAlertLargeProps {
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
  sendEmail: (email: string) => Promise<boolean>;
}

function SignUpAlertLarge02({
  onClickModal,
  setOpenModal,
  isOpenModal,
  setBlank,
  setEmail,
  sendEmail,
  setCurrentModal,
  currentModal,
  email,
  emailState,
  setEmailState,
}: SignUpAlertLargeProps) {
  return (
    <ModalMedium onClickToggleModal={onClickModal}>
      <ButtonWrapper>
        <TopButton
          onClick={() => {
            setCurrentModal(currentModal - 1);
          }}
        >
          <Icon03 size="100%" />
        </TopButton>
        <TopButton
          onClick={() => {
            setOpenModal(!isOpenModal);
          }}
        >
          <Icon02 size="100%" />
        </TopButton>
      </ButtonWrapper>
      <AlertIconExclamation width="5.885vw" height="5.885vw" />
      <TypographyBox>
        <Typography size={'1.25vw'} bold={'700'} color="#141414" style={{ marginTop: '1.25vw' }}>
          <span className="mobile"> 고려대학교 이메일 주소를 입력해주세요.</span>
        </Typography>
        <Typography size={'0.9375vw'} color="#141414" style={{ marginTop: '1.25vw' }}>
          고려대학교 이메일 주소를 정확히 기입해주세요.
        </Typography>
      </TypographyBox>
      <ActionWrapper>
        <TextFieldBox
          placeholder="kupply@korea.ac.kr"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
          state={emailState}
          setState={setEmailState}
          setValue={setEmail}
        />
        <Button05
          onClick={async () => {
            const IDPattern = /.+@korea\.ac\.kr$/;
            if (IDPattern.test(email)) {
              setCurrentModal(currentModal + 1);
              setBlank();
              await sendEmail(email);
            } else {
              alert('형식에 맞지 않는 이메일 주소입니다.');
            }
          }}
          state="pressed"
          style={{ width: '100%' }}
        >
          제출하기
        </Button05>
      </ActionWrapper>
    </ModalMedium>
  );
}

const TopButton = styled.button`
  display: flex;
  width: 3.125vw;
  height: 3.125vw;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

const ActionWrapper = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3vw;
  gap: 1.5625vw;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TypographyBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default SignUpAlertLarge02;
