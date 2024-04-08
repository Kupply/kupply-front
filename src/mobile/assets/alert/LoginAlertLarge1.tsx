import ModalLarge from '../../components/base/ModalLarge';
import styled from 'styled-components';
import AlertIconExclamation from '../../../assets/icons/AlertIconExclamation';
import Typography from '../../../assets/Typography';
import Button05 from '../buttons/Button05';
import Input02 from '../field/Input02';
import CTA01 from '../CTAs/CTA01';
import Icon02 from '../../../assets/icons/Icon02';
import Icon03 from '../../../assets/icons/Icon03';
import { StateOptions } from '../field/Input02';

interface LoginAlertLargeProps {
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

function SignUpAlertMobileLarge01({
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
  sendEmail,
}: LoginAlertLargeProps) {
  return (
    <ModalLarge onClickToggleModal={onClickModal}>
      <ButtonWrapper>
        <TopButton
          onClick={() => {
            setOpenModal(!isOpenModal);
          }}
        >
          <Icon03 size='100%' />
        </TopButton>
        <TopButton
          onClick={() => {
            setOpenModal(!isOpenModal);
          }}
        >
          <Icon02 size='100%'/>
        </TopButton>
      </ButtonWrapper>
      <div style={{ height: '20.833vw' }}></div>
      <img src={process.env.PUBLIC_URL + `/designImage/kupply/KupplyVer1.svg`} alt="Logo Image" />
      <Typography size={'14px'} bold={'500'} color="#141414" style={{ marginTop: '4.44vw' }}>
        임시 비밀번호를 발급받을 고려대 이메일 주소를 입력해주세요.
      </Typography>
      
      <ActionWrapper>
        <div style={{width: '81.667vw', height: '11.667vw'}}>
        <Input02
          state={emailState as StateOptions}
          setState={setEmailState}
          setValue={setEmail}
          value={email}
          placeholder="bright@korea.ac.kr"
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
          style={{width: '81.667vw', height: '11.667vw', padding: '0px 9.44vw'}}
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
  margin-top: 51px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default SignUpAlertMobileLarge01;
