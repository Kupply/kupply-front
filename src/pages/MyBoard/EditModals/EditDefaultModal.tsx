import styled from 'styled-components';
import TextFieldBox, { StateOptions } from '../../../assets/TextFieldBox';
import PrevButton from '../../../assets/buttons/PrevButton';
import SubmitButton from '../../../assets/buttons/SubmitButton';
import Typography from '../../../assets/Typography';
import ModalLarge from '../../../components/base/ModalLarge';
import EditModalHeaderButton from '../../../assets/myboardpage/EditModalHeaderButton';

export interface ModalProps {
  isOpenModal: boolean;
  setOpenModal: (isOpenModal: boolean) => void;
  onClickModal: () => void; // 함수;
}

export default function EditDefaultModal(props: ModalProps) {
  const { isOpenModal, setOpenModal, onClickModal } = props;

  // 각 헤더 버튼 앞에 아이콘 이미지 삽입 필요
  return (
    <Main>
      {isOpenModal && (
        <ModalLarge onClickToggleModal={onClickModal}>
          <Typography size="bodyText" style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '40px' }}>
            프로필 정보 수정하기
          </Typography>
          <div style={{ height: '40px' }}></div>
          <HeaderButtonWrapper>
            <EditModalHeaderButton isClicked={true}>나의 기본전공</EditModalHeaderButton>
            <EditModalHeaderButton isClicked={true}>관심 전공</EditModalHeaderButton>
            <EditModalHeaderButton isClicked={true}>현재 내 학점</EditModalHeaderButton>
            <EditModalHeaderButton isClicked={true}>희망 진입학기</EditModalHeaderButton>
          </HeaderButtonWrapper>
          <PrevButton>취소</PrevButton>
          <SubmitButton>저장하기</SubmitButton>
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

const HeaderButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
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

const ActionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 72px;
`;
