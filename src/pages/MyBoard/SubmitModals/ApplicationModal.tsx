import styled from 'styled-components';
import React, { useState } from 'react';
import TextFieldBox, { StateOptions } from '../../../assets/TextFieldBox';
import PrevButton from '../../../assets/buttons/PrevButton';
import SubmitButton from '../../../assets/buttons/SubmitButton';
import Typography from '../../../assets/Typography';
import ModalLarge from '../../../components/base/ModalLarge';
import EditModalHeaderButton from '../../../assets/myboardpage/EditModalHeaderButton';
import ImgCtrlButton from '../../../assets/myboardpage/ImgCtrlButton';
import DropDown from '../../../assets/dropdown/dropDown';
import VerificationBox from '../../../assets/VerificationBox';
import AlertIconExclamation from '../../../assets/icons/AlertIconExclamation';
import LabelButton from '../../../assets/buttons/LabelButton';
import MockApplicationButton from '../../../assets/myboardpage/MockApplication';

export interface ModalProps {
  isOpenModal: boolean;
  setOpenModal: (isOpenModal: boolean) => void;
  onClickModal: () => void; // 함수;
}

export default function ApplicationModal(props: ModalProps) {
  const { isOpenModal, setOpenModal, onClickModal } = props;
  const [currentModal, setCurrentModal] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(true);

  return (
    <Main>
      {isOpenModal && isSubmitted && (
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
                d="M38.2071 23.2071C38.5976 22.8166 38.5976 22.1834 38.2071 21.7929C37.8166 21.4024 37.1834 21.4024 36.7929 21.7929L30 28.5858L23.2071 21.7929C22.8166 21.4024 22.1834 21.4024 21.7929 21.7929C21.4024 22.1834 21.4024 22.8166 21.7929 23.2071L28.5858 30L21.7929 36.7929C21.4024 37.1834 21.4024 37.8166 21.7929 38.2071C22.1834 38.5976 22.8166 38.5976 23.2071 38.2071L30 31.4142L36.7929 38.2071C37.1834 38.5976 37.8166 38.5976 38.2071 38.2071C38.5976 37.8166 38.5976 37.1834 38.2071 36.7929L31.4142 30L38.2071 23.2071Z"
                fill="#141414"
              />
            </svg>
          </CloseButton>
          <AlertWrapper>
            <AlertIconExclamation width="113px" height="113px" />
            <Typography size="largeText" bold="700" style={{ marginTop: '25px' }}>
              모의지원을 완료 하시겠습니까?
            </Typography>
            <Typography size="mediumText" bold="500" style={{ marginTop: '10px', lineHeight: '136.111%' }}>
              모의지원을 완료한 후에는 철회가 불가능합니다.
            </Typography>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '22px',
                marginTop: '50px',
              }}
            >
              <LabelButton buttonType="secondary" size="medium" style={{ width: '627.232px', height: '68px' }}>
                취소하기
              </LabelButton>
              <MockApplicationButton
                style={{ width: '627.232px', height: '68px' }}
                // 글자 디자인 수정 필요
              >
                모의지원 완료하기
              </MockApplicationButton>
            </div>
          </AlertWrapper>
        </ModalLarge>
      )}
    </Main>
  );
}

const Main = styled.main`
  width: 100%;
  height: 1px;
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
  top: 32px;
  right: 40px;
  cursor: pointer;
`;

const AlertWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 628px;
  align-items: center;
  text-align: center;
  margin: auto auto;
`;
