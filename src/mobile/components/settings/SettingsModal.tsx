import React from "react";
import styled from "styled-components";
import ModalLarge from "../base/ModalLarge";
import Icon02 from "../../../assets/icons/Icon02";
import AlertIconExclamation from "../../../assets/icons/AlertIconExclamation";
import Typography from "../../../assets/Typography";
import Button04 from "../../assets/buttons/Button04";
import Button03 from "../../assets/buttons/Button03";

interface SettingsModalProps{
  isOpenModal: boolean;
  setOpenModal: (isOpenModal: boolean) => void;
  onClickModal: () => void; // 함수;
  thirdSubmit: () => Promise<void>;
}

export default function SettingsModal(props:SettingsModalProps){
  const {isOpenModal, setOpenModal, onClickModal, thirdSubmit} = props;

return(
  <Main>
    <ModalLarge onClickToggleModal={onClickModal}>
      <ButtonWrapper>
        <TopButton
          onClick={() => {
            setOpenModal(!isOpenModal);
          }}
        >
          <Icon02 size='100%'/>
        </TopButton>
      </ButtonWrapper>
      <div style={{ height: '20.833vw' }}></div>
      <AlertIconExclamation width="22.22vw" height="22.22vw" />
      <Typography size={'4.44vw'} bold={'700'} color="#141414" style={{ marginTop: '4.44vw' }}>
        변경한 학점을 저장하시겠습니까?
      </Typography>
      <div style={{width: '60.6vw', textAlign: 'center', marginTop: '4.44vw'}}>
      <Typography size={'3.33vw'} color="#141414">
      이중전공 지원 기간 동안에는 학점 수정이 최대 두 번까지만 가능해요.
      </Typography>
      </div>
      <ActionWrapper>
        <Button04 
          onClick={() => {
            setOpenModal(!isOpenModal);
          }}
          style={{width: '39.17vw', height: '11.67vw'}}>취소</Button04>
        <Button03
          onClick={() => {
            thirdSubmit(); 
            setOpenModal(false);
          }}
          style={{width: '39.17vw', height: '11.67vw'}}>확인</Button03>
      </ActionWrapper>
    </ModalLarge>
  </Main>
)
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

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TopButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

const ActionWrapper = styled.div`
  width: 290px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  margin-top: 51px;
`;