import ModalLarge from '../../../components/base/ModalLarge';

import styled from 'styled-components';
import AlertIconExclamation from '../../../assets/icons/AlertIconExclamation';
import Typography from '../../../assets/Typography';
import VerificationButton from '../../../assets/buttons/OldVerificationButton';


//import Icon03 from '../icons/Icon03';
//import Icon02 from '../icons/Icon02';

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
          {/* <Icon03 size={'3.125vw'} /> */}
        </TopButton>
        <TopButton
          onClick={() => {
            setOpenModal(!isOpenModal);
          }}
        >
          {/* <Icon02 size={'3.125vw'} /> */}
        </TopButton>
      </ButtonWrapper>
      <div style={{ height: '6.771vw' }}></div>
      <AlertIconExclamation width="5.885vw" height="5.885vw" />
      <Typography size={'1.25vw'} bold={'700'} color="#141414" style={{ marginTop: '1.25vw' }}>
        아직 인증번호를 받지 못하셨나요?
      </Typography>
      <Typography size={'0.9375vw'} color="#141414" style={{ marginTop: '1.25vw' }}>
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
  gap: 1.5625vw;
  margin-top: 3.75vw;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default SignUpAlertLarge01;
