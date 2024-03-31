import ModalLarge from '../../components/base/ModalLarge';

import styled from 'styled-components';
import AlertIconExclamation from '../icons/AlertIconExclamation';
import Typography from '../Typography';
import VerificationButton from '../buttons/OldVerificationButton';

import Icon03 from '../icons/Icon03';
import Icon02 from '../icons/Icon02';

interface SignUpAlertLargeProps {
  onClickModal: () => void;
  setOpenModal: (isOpenModal: boolean) => void;
  setCurrentModal: (currentModal: any) => void;
  currentModal: number;
  isOpenModal: boolean;
  sendEmail: (email: string) => Promise<boolean>;
  email: string;
  setBlank: () => void;
}

function SignUpAlertLarge01({
  onClickModal,
  setOpenModal,
  isOpenModal,
  setBlank,
  setCurrentModal,
  currentModal,
  email,
  sendEmail,
}: SignUpAlertLargeProps) {
  return (
    <ModalLarge onClickToggleModal={onClickModal}>
      <ButtonWrapper>
        <TopButton
          onClick={() => {
            setOpenModal(!isOpenModal);
          }}
        >
          <Icon03 size={'45px'} />
        </TopButton>
        <TopButton
          onClick={() => {
            setOpenModal(!isOpenModal);
          }}
        >
          <Icon02 size={'45px'} />
        </TopButton>
      </ButtonWrapper>
      <div style={{ height: '10%' }}></div>
      <AlertIconExclamation width="120px" height="120px" />
      <TypographyBox>
        <Typography bold={'700'} color="#0a0606" style={{ marginTop: '32px' }}>
          아직 인증번호를 받지 못하셨나요?
        </Typography>
        <Typography color="#141414" style={{ marginTop: '32px' }}>
          새로운 인증번호를 받기 전, 먼저 스팸 메일함을 확인해주세요!
        </Typography>
      </TypographyBox>
      <ActionWrapper>
        <VerificationButton
          onClick={async () => {
            setCurrentModal(currentModal + 2);
            setBlank();
            await sendEmail(email);
          }}
        >
          인증번호 다시 받기
        </VerificationButton>
        <VerificationButton
          onClick={() => {
            setCurrentModal(currentModal + 1);
          }}
        >
          이메일 주소 변경하기
        </VerificationButton>
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 50px;
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

  & > span:first-child {
    display: block;
    font-size: 30px;
    @media screen and (max-width: 850px) {
      font-size: 28px;
    }
    @media screen and (max-width: 768px) {
      font-size: 26px;
    }
  }
  & > span:last-child {
    display: block;
    font-size: 20px;
    @media screen and (max-width: 850px) {
      font-size: 18px;
    }
    @media screen and (max-width: 768px) {
      font-size: 16px;
    }
  }
`;

export default SignUpAlertLarge01;
