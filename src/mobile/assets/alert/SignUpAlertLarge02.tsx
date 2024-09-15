import ModalLarge from '../../components/base/ModalLarge';
import styled from 'styled-components';
import AlertIconExclamation from '../../../assets/icons/AlertIconExclamation';
import Typography from '../../../assets/Typography';
import { StateOptions } from '../field/Input02';
import Icon03 from '../../../assets/icons/Icon03';
import Icon02 from '../../../assets/icons/Icon02';
import Input01 from '../field/Input01';
import CTA01 from '../CTAs/CTA01';
import Button05 from '../buttons/Button05';
import Input02 from '../field/Input02';

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

function SignUpAlertMobileLarge02({
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
          <Icon03 size={'100%'} />
        </TopButton>
        <TopButton
          onClick={() => {
            setOpenModal(!isOpenModal);
          }}
        >
          <Icon02 size={'100%'} />
        </TopButton>
      </ButtonWrapper>
      <div style={{ height: '20.833vw' }}></div>
      <AlertIconExclamation width="22.22vw" height="22.22vw" />
      <TextWrapper>
        <Typography size={'4.44vw'} bold={'700'} color="#141414" style={{ marginTop: '4.44vw' }}></Typography>
        <Typography size={'4.44vw'} bold={'700'} color="#141414" style={{ marginTop: '12px' }}>
          인증번호를 받을 <br />
          고려대학교 이메일 주소를 입력해주세요.
        </Typography>
        <Typography size={'3.33vw'} color="#141414" style={{ marginTop: '4.44vw' }}>
          고려대학교 이메일 주소를 정확히 기입해주세요.
        </Typography>
      </TextWrapper>
      <ActionWrapper>
        <div style={{ width: '81.667vw', height: '11.667vw' }}>
          <Input02
            state={emailState as StateOptions}
            setState={setEmailState}
            setValue={setEmail}
            value={email}
            placeholder="kupply@korea.ac.kr"
          />
        </div>
        <CTA01
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
          style={{ width: '81.667vw', height: '11.667vw', padding: '0px 9.44vw' }}
        >
          제출하기
        </CTA01>
      </ActionWrapper>
    </ModalLarge>
  );
}

const TopButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

const ActionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 43px;
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
`;

export default SignUpAlertMobileLarge02;
