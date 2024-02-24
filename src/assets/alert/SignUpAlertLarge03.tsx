import ModalLarge from '../../components/base/ModalLarge';
import styled from 'styled-components';

import Typography from '../Typography';
import type { StateOptions } from '../OldTextFieldBox';
import Icon03 from '../icons/Icon03';
import Icon02 from '../icons/Icon02';

import AlertIconCheck from '../icons/AlertIconCheck';
import LabelButton from '../buttons/LabelButton';
import SubmitButton from '../buttons/SubmitButton';

interface SignUpAlertLargeProps {
  currentModal: number;
  isOpenModal: boolean;
  setCurrentModal: (currentModal: number) => void;
  setOpenModal: (isOpenModal: boolean) => void;
  onClickModal: () => void; // 함수
  email: string;
}

function SignUpAlertLarge03({
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
      <AlertIconCheck width="113px" height="113px" />
      <Typography size={'24px'} bold={'700'} color="#141414" style={{ marginTop: '25px' }}>
        새로운 인증번호를 발송했습니다.
      </Typography>
      <Typography size={'18px'} color="#141414" style={{ marginTop: '24px' }}>
        {email} 메일함을 다시 확인해주세요.
        <br /> 아직 메일을 받지 못했다면 스팸 메일함을 확인해주세요!{' '}
      </Typography>
      <ActionWrapper>
        <SubmitButton size={'18px'} onClick={onClickModal}>
          확인
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

export default SignUpAlertLarge03;
