import ModalLarge from '../../components/base/ModalLarge';
import styled from 'styled-components';
import AlertIconExclamation from '../icons/AlertIconExclamation';
import Typography from '../Typography';
import type { StateOptions } from '../OldTextFieldBox';
import Icon03 from '../icons/Icon03';
import Icon02 from '../icons/Icon02';
import TextFieldBox from '../OldTextFieldBox';
import SubmitButton from '../buttons/SubmitButton';

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
          <Icon03 size={'60px'} />
        </TopButton>
        <TopButton
          onClick={() => {
            setOpenModal(!isOpenModal);
          }}
        >
          <Icon02 size={'60px'} />
        </TopButton>
      </ButtonWrapper>
      <div style={{ height: '130px' }}></div>
      <AlertIconExclamation width="113px" height="113px" />
      <Typography size={'24px'} bold={'700'} color="#141414" style={{ marginTop: '25px' }}>
        인증번호를 받을 고려대 이메일 주소를 입력해주세요!
      </Typography>
      <Typography size={'18px'} color="#141414" style={{ marginTop: '24px' }}>
        고려대학교 이메일 주소를 정확히 기입해주세요.
      </Typography>
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
        <SubmitButton
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
          size={'18px'}
        >
          제출하기
        </SubmitButton>
      </ActionWrapper>
    </ModalLarge>
  );
}

const TopButton = styled.button`
  display: flex;
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

const ActionWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin-top: 72px;

  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default SignUpAlertLarge02;
