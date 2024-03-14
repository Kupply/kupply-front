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
        아직 인증번호를 받지 못하셨나요?
      </Typography>
      <Typography size={'18px'} color="#141414" style={{ marginTop: '24px' }}>
        새로운 인증번호를 받기 전, 먼저 스팸 메일함을 확인해주세요!
      </Typography>
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
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

const ActionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin-top: 72px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default SignUpAlertLarge01;
