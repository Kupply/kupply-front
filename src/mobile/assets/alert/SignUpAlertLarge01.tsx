import ModalLarge from '../../components/base/ModalLarge';
import styled from 'styled-components';
import AlertIconExclamation from '../../../assets/icons/AlertIconExclamation';
import Typography from '../../../assets/Typography';
import Button05 from '../buttons/Button05';
import Icon02 from '../../../assets/icons/Icon02';

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

function SignUpAlertMobileLarge01({
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
          <Icon02 size="100%" />
        </TopButton>
      </ButtonWrapper>
      <div style={{ height: '20.833vw' }}></div>
      <AlertIconExclamation width="22.22vw" height="22.22vw" />
      <Typography size={'4.44vw'} bold={'700'} color="#141414" style={{ marginTop: '4.44vw' }}>
        아직 인증번호를 받지 못하셨나요?
      </Typography>
      <Typography size={'3.33vw'} color="#141414" style={{ marginTop: '4.44vw' }}>
        새로운 인증번호를 받기 전, <br /> 네이버웍스 계정 생성 여부와 스팸 메일함을 먼저 확인해주세요.
      </Typography>
      <Typography size="2.75vw" color="#141414" style={{ marginTop: '2.22vw' }}>
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
      <ActionWrapper>
        <Button05
          onClick={async () => {
            setCurrentModal(currentModal + 2);
            setBlank();
            await sendEmail(email);
          }}
          style={{ width: '81.667vw', height: '11.667vw', padding: '0px 9.44vw' }}
        >
          인증번호 다시 받기
        </Button05>
        <Button05
          onClick={() => {
            setCurrentModal(currentModal + 1);
          }}
          style={{ width: '81.667vw', height: '11.667vw', padding: '0px 9.44vw' }}
        >
          이메일 주소 변경하기
        </Button05>
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
