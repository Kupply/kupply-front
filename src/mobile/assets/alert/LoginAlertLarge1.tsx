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
import { useState } from 'react';

interface LoginAlertLargeProps {
  isOpenModal: boolean;
  setOpenModal: (isOpenModal: boolean) => void;
  onClickModal: () => void; // 함수;
  sendEmail: (email: string) => Promise<void>;
}

function LoginAlertMobileLarge01({ isOpenModal, setOpenModal, onClickModal, sendEmail }: LoginAlertLargeProps) {
  const [email, setEmail] = useState<string>('');
  const [emailState, setEmailState] = useState<StateOptions>('default');
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <ModalLarge onClickToggleModal={onClickModal}>
      <ButtonWrapper>
        <TopButton
          onClick={() => {
            setOpenModal(!isOpenModal);
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
      <div style={{ height: '20.833vw' }}></div>
      <LogoContainer>
        <img src={process.env.PUBLIC_URL + `/designImage/kupply/KupplyVer1.svg`} alt="Logo Image" />
      </LogoContainer>
      <TextBox>
        <Typography size="3.89vw" bold="500">
          임시 비밀번호를 발급받을<br></br>
        </Typography>
        <Typography size="3.89vw" bold="500">
          고려대 이메일 주소를 입력해주세요.
        </Typography>
      </TextBox>

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
              setEmail('');
              setIsSubmitting(true);
              try {
                await sendEmail(email);
              } finally {
                setIsSubmitting(false);
              }
            } else {
              alert('형식에 맞지 않는 이메일 주소입니다.');
            }
          }}
          state={email !== '' ? (isSubmitting ? 'disabled' : 'default') : 'disabled'}
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
  margin-top: 51px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const LogoContainer = styled.div`
  width: 41.67vw;
  height: 9.167vw;
  margin-bottom: 39px;
`;

const TextBox = styled.div`
  width: 54.44vw;
  text-align: center;
  line-height: 120%;
`;

export default LoginAlertMobileLarge01;
