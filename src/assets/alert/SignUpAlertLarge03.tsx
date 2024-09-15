import ModalMedium from '../../components/base/ModalMedium';
import styled from 'styled-components';

import Typography from '../Typography';
import type { StateOptions } from '../OldTextFieldBox';
import Icon03 from '../icons/Icon03';
import Icon02 from '../icons/Icon02';

import AlertIconCheck from '../icons/AlertIconCheck';
import Button05 from '../buttons/Button05';

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
    <ModalMedium onClickToggleModal={onClickModal}>
      <ButtonWrapper>
        <TopButton
          onClick={() => {
            setCurrentModal(currentModal - 1);
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
      <AlertIconCheck width="5.885vw" height="5.885vw" />
      <Typography size={'1.25vw'} bold={'700'} color="#141414" style={{ marginTop: '1.25vw' }}>
        새로운 인증번호가 전송되었어요.
      </Typography>
      <Typography size={'0.9375vw'} color="#141414" style={{ marginTop: '1.25vw' }}>
        {email} 메일함을 다시 확인해주세요.
        <span style={{ display: 'block', marginTop: '8px' }} /> 아직 메일을 받지 못했다면 스팸 메일함을 확인해주세요.{' '}
      </Typography>
      <ActionWrapper>
        <Button05 onClick={onClickModal} style={{ width: '100%' }}>
          확인
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

export default SignUpAlertLarge03;
