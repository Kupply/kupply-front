import { useState, useCallback } from 'react';
import styled from 'styled-components';
import AlertIconCheck from '../../../assets/icons/AlertIconCheck';
import LabelButton from '../../../assets/buttons/LabelButton';
import Typography from '../../../assets/Typography';
import ModalLarge from '../../../components/base/ModalLarge';

export interface ModalProps {
  currentModal: number;
  isOpenModal: boolean;
  setCurrentModal: (currentModal: number) => void;
  setOpenModal: (isOpenModal: boolean) => void;
  onClickModal: () => void; // 함수
  email: string;
}

export default function SignUpLarge3(props: ModalProps) {
  const { currentModal, isOpenModal, setCurrentModal, setOpenModal, onClickModal, email } = props;

  return (
    <Main>
      {isOpenModal && (
        <ModalLarge onClickToggleModal={onClickModal}>
          <CloseButton
            onClick={() => {
              setOpenModal(!isOpenModal);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M38.9142 23.9142C39.6953 23.1332 39.6953 21.8668 38.9142 21.0858C38.1332 20.3047 36.8668 20.3047 36.0858 21.0858L30 27.1716L23.9142 21.0858C23.1332 20.3047 21.8668 20.3047 21.0858 21.0858C20.3047 21.8668 20.3047 23.1332 21.0858 23.9142L27.1716 30L21.0858 36.0858C20.3047 36.8668 20.3047 38.1332 21.0858 38.9142C21.8668 39.6953 23.1332 39.6953 23.9142 38.9142L30 32.8284L36.0858 38.9142C36.8668 39.6953 38.1332 39.6953 38.9142 38.9142C39.6953 38.1332 39.6953 36.8668 38.9142 36.0858L32.8284 30L38.9142 23.9142Z"
                fill="#434343"
              />
            </svg>
          </CloseButton>
          <div style={{ height: '170px' }}></div>
          <AlertIconCheck width="113px" height="113px" />
          <Typography size="largeText" color="#141414" style={{ marginTop: '25px' }}>
            새로운 인증번호를 발송했습니다.
          </Typography>
          <Typography
            size="mediumText"
            color="#141414"
            style={{
              marginTop: '24px',
              textAlign: 'center',
            }}
          >
            {email} 메일함을 다시 확인해주세요.
            <br /> 아직 메일을 받지 못했다면 스팸 메일함을 확인해주세요!
          </Typography>
          <ActionWrapper>
            <LabelButton buttonType="primary" size="medium" onClick={onClickModal}>
              확인
            </LabelButton>
          </ActionWrapper>
        </ModalLarge>
      )}
    </Main>
  );
}

const Main = styled.main`
  width: 100%;
  height: 1px; // 버튼 안눌림 이슈 수정
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  z-index: 1005; // Modal.tsx 와 상이한 stacking context
`;

const CloseButton = styled.button`
  display: flex;
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50px;
  right: 50px;

  cursor: pointer;
`;

const ActionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 83px;
`;
