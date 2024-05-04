import ModalLarge from '../../components/base/ModalLarge';
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
    <ModalLarge onClickToggleModal={onClickModal}>
      <ButtonWrapper>
        <TopButton
          onClick={() => {
            setCurrentModal(currentModal - 1);
          }}
        >
          <Icon03 size={'3.125vw'} />
        </TopButton>
        <TopButton
          onClick={() => {
            setOpenModal(!isOpenModal);
          }}
        >
          <Icon02 size={'3.125vw'} />
        </TopButton>
      </ButtonWrapper>
      <div style={{ height: '6.771vw' }}></div>
      <AlertIconExclamation width="5.885vw" height="5.885vw" />
      <TextWrapper>
        <Typography size={'1.25vw'} bold={'700'} color="#141414" style={{ marginTop: '1.25vw' }}>
          인증번호를 받을 <span className="mobile"> 고려대 이메일 주소를 입력해주세요!</span>
        </Typography>
        <Typography size={'0.9375vw'} color="#141414" style={{ marginTop: '1.25vw' }}>
          고려대학교 이메일 주소를 정확히 기입해주세요.
        </Typography>
      </TextWrapper>
      <ActionWrapper>
        <TextFieldBox
          placeholder="bright@korea.ac.kr"
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
          state='pressed'
          style={{width: '100%'}}
        >
          제출하기
        </Button05>
      </ActionWrapper>
    </ModalLarge>
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
  gap: 1.5625vw;
  margin-top: 3.75vw;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TextWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > span {
    text-align: center;
  }
  @media screen and (max-width: 600px) {
    .mobile {
      display: block;
      margin-top: 8px;
    }
  }
`;

export default SignUpAlertLarge02;
