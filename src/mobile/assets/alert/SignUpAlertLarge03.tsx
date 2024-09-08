import ModalLarge from '../../components/base/ModalLarge';
import styled from 'styled-components';
import Typography from '../../../assets/Typography';
import { StateOptions } from '../field/Input01';
import Icon03 from '../../../assets/icons/Icon03';
import Icon02 from '../../../assets/icons/Icon02';
import AlertIconCheck from '../../../assets/icons/AlertIconCheck';
import CTA01 from '../CTAs/CTA01';

interface SignUpAlertLargeProps {
  currentModal: number;
  isOpenModal: boolean;
  setCurrentModal: (currentModal: number) => void;
  setOpenModal: (isOpenModal: boolean) => void;
  onClickModal: () => void; // 함수
  email: string;
}

function SignUpAlertMobileLarge03({
  onClickModal,
  setOpenModal,
  isOpenModal,
  setCurrentModal,
  currentModal,
  email,
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
      <AlertIconCheck width="22.22vw" height="22.22vw" />
      <Typography size={'4.44vw'} bold={'700'} color="#141414" style={{ marginTop: '4.44vw' }}>
        새로운 인증번호가 전송되었어요.
      </Typography>
      <div style={{ textAlign: 'center', marginTop: '4.44vw' }}>
        <Typography size={'3.33vw'} color="#141414" style={{ lineHeight: '16px' }}>
          {email} 메일함을 다시 확인해주세요.
          <span style={{ display: 'block' }} /> 아직 메일을 받지 못했다면 스팸 메일함을 확인해주세요.{' '}
        </Typography>
      </div>
      <ActionWrapper>
        <CTA01 style={{ width: '81.667vw', height: '11.667vw', padding: '0px 9.44vw' }} onClick={onClickModal}>
          확인
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
  margin-top: 110px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default SignUpAlertMobileLarge03;
