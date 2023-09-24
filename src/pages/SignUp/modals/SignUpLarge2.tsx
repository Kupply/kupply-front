import { useState, useCallback } from 'react';
import styled from 'styled-components';
import AlertIconExclamation from '../../../assets/icons/AlertIconExclamation';
import TextFieldBox, { StateOptions } from '../../../assets/TextFieldBox';
import SubmitButton from '../../../assets/buttons/SubmitButton';
import Typography from '../../../assets/Typography';
import ModalLarge from '../../../components/base/ModalLarge';
import { sendEmail } from '../SignUp1Page';

export interface ModalProps {
  currentModal: number;
  isOpenModal: boolean;
  setCurrentModal: (currentModal: number) => void;
  setOpenModal: (isOpenModal: boolean) => void;
  onClickModal: () => void; // 함수;
  email: string;
  emailState: StateOptions;
  setEmail: (email: string) => void;
  setEmailState: (emailState: StateOptions) => void;
}

export default function SignUpLarge2(props: ModalProps) {
  /* 각 input들의 값을 state를 사용하여 관리 */
  // const [email, setEmail] = useState<string>("");
  // const [emailState, setEmailState] = useState<StateOptions>("default");

  const {
    currentModal,
    isOpenModal,
    setCurrentModal,
    setOpenModal,
    onClickModal,
    email,
    emailState,
    setEmail,
    setEmailState,
  } = props;

  return (
    <Main>
      {isOpenModal && (
        <ModalLarge onClickToggleModal={onClickModal}>
          <PrevButton
            onClick={() => {
              setCurrentModal(currentModal - 1);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
              <path d="M34 23L26 30" stroke="#434343" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M26 30L34 38" stroke="#434343" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </PrevButton>
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
          <div style={{ height: '20.15%' }}></div>
          <AlertIconExclamation width="113px" height="113px" />
          <Typography size="largeText" color="#141414" style={{ marginTop: '25px' }}>
            인증번호를 받을 고려대 이메일 주소를 입력해주세요!
          </Typography>
          <Typography size="mediumText" color="#141414" style={{ marginTop: '24px' }}>
            고려대학교 이메일 주소를 정확히 기입해주세요.
          </Typography>
          <ActionWrapper>
            <TextFieldBox
              placeholder="bright@korea.ac.kr"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
              state={emailState}
              setState={setEmailState}
              setValue={setEmail}
            />
            <SubmitButton
              onClick={async () => {
                const IDPattern = /.+@korea\.ac\.kr$/;
                if (IDPattern.test(email)) {
                  setCurrentModal(currentModal + 1);
                  await sendEmail(email);
                } else {
                  alert('형식에 맞지 않는 이메일 주소입니다.');
                }
              }}
            />
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
  z-index: 20; // Modal.tsx 와 상이한 stacking context
`;

const CloseButton = styled.button`
  display: flex;
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 70px;
  right: 50px;

  cursor: pointer;
`;

const PrevButton = styled.button`
  display: flex;
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 70px;
  left: 50px;

  cursor: pointer;
`;

const ActionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 72px;
`;
