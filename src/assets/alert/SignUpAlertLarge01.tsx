//import ModalLarge from '../../components/base/ModalLarge';
import ModalMedium from '../../components/base/ModalMedium';
import styled from 'styled-components';
import AlertIconExclamation from '../icons/AlertIconExclamation';
import Typography from '../Typography';
import VerificationButton from '../buttons/OldVerificationButton';
import Button05 from '../buttons/Button05';
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
    <ModalMedium onClickToggleModal={onClickModal}>
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
      <AlertIconExclamation width="5.885vw" height="5.885vw" />
      <TypographyBox>
        <Typography size="1.25vw" bold={'700'} color="#0a0606" style={{ marginTop: '1.67vw' }}>
          아직 인증번호를 받지 못하셨나요?
        </Typography>
        <Typography color="#141414" style={{ marginTop: '1.67vw' }}>
          새로운 인증번호를 받기 전, 네이버웍스 계정 생성 여부와 스팸 메일함을 먼저 확인해주세요.
        </Typography>
        <Typography size="0.85vw" color="#141414" style={{ marginTop: '0.67vw' }}>
          <a
            href="https://docs.google.com/presentation/d/1ZgkrJFw1n3kPsG_sU1iEipcu7BxfPaPd/edit#slide=id.p1"
            target="_blank"
            style={{
              textDecoration: 'underline',
              color: '#D85888',
            }}
          >
            네이버웍스 계정 생성 방법
          </a>
        </Typography>
      </TypographyBox>
      <ActionWrapper>
        <Button05
          onClick={async () => {
            setCurrentModal(currentModal + 2);
            setBlank();
            await sendEmail(email);
          }}
          style={{ width: '100%' }}
        >
          인증번호 다시 받기
        </Button05>
        <Button05
          onClick={() => {
            setCurrentModal(currentModal + 1);
          }}
          style={{ width: '100%' }}
        >
          이메일 주소 변경하기
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

export default SignUpAlertLarge01;
