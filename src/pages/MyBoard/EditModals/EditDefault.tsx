import styled from 'styled-components';
import TextFieldBox, { StateOptions } from '../../../assets/TextFieldBox';
import SubmitButton from '../../../assets/buttons/SubmitButton';
import Typography from '../../../assets/Typography';
import ModalLarge from '../../../components/base/ModalLarge';
import EditModalHeaderButton from '../../../assets/myboardpage/EditModalHeaderButton';

export interface ModalProps {
  currentModal: number;
  isOpenModal: boolean;
  setCurrentModal: (currentModal: number) => void;
  setOpenModal: (isOpenModal: boolean) => void;
  onClickModal: () => void; // 함수;
}

/*
export default function EditDefaultModal(props: ModalProps) {
  const { currentModal, isOpenModal, setCurrentModal, setOpenModal, onClickModal } = props;

  return (
    <Main>
      {isOpenModal && (
        <ModalLarge onClickToggleModal={onClickModal}>
          <Typography size="bodyText">프로필 정보 수정하기</Typography>
          <div style={{ height: '40px' }}></div>
          <EditModalHeaderButton isClicked={true}>나의 기본전공</EditModalHeaderButton>

        
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
*/
