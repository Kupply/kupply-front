import styled from 'styled-components';
import React, { useState } from 'react';
import TextFieldBox, { StateOptions } from '../../../assets/TextFieldBox';
import PrevButton from '../../../assets/buttons/PrevButton';
import SubmitButton from '../../../assets/buttons/SubmitButton';
import Typography from '../../../assets/Typography';
import ModalLarge from '../../../components/base/ModalLarge';
import EditModalHeaderButton from '../../../assets/myboardpage/EditModalHeaderButton';

/*
수정 필요한 사항
1. 내부 컨텐츠 추가
2. 저장하기 버튼 onClick 이벤트에 DB 로의 데이터 전송 (기존정보 변경요청) 전송
 
 */

export interface ModalProps {
  isOpenModal: boolean;
  setOpenModal: (isOpenModal: boolean) => void;
  onClickModal: () => void; // 함수;
}

export default function EditDefaultModal(props: ModalProps) {
  const { isOpenModal, setOpenModal, onClickModal } = props;

  // 각 버튼의 isClicked 값을 관리하기 위한 변수 선언
  const [headerButtonStates, setHeaderButtonStates] = useState<{
    basicMajor: boolean;
    interestMajor: boolean;
    currentGPA: boolean;
    desiredSemester: boolean;
  }>({
    basicMajor: true,
    interestMajor: false,
    currentGPA: false,
    desiredSemester: false,
  });

  const handleHeaderButtonClick = (buttonName: string) => {
    setHeaderButtonStates((prevState) => {
      const newState = {
        basicMajor: false,
        interestMajor: false,
        currentGPA: false,
        desiredSemester: false,
      };
      newState[buttonName as keyof typeof prevState] = true;
      return newState;
    });
  };

  // 각 헤더 버튼 앞에 아이콘 이미지 삽입 필요
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
                d="M38.2071 23.2071C38.5976 22.8166 38.5976 22.1834 38.2071 21.7929C37.8166 21.4024 37.1834 21.4024 36.7929 21.7929L30 28.5858L23.2071 21.7929C22.8166 21.4024 22.1834 21.4024 21.7929 21.7929C21.4024 22.1834 21.4024 22.8166 21.7929 23.2071L28.5858 30L21.7929 36.7929C21.4024 37.1834 21.4024 37.8166 21.7929 38.2071C22.1834 38.5976 22.8166 38.5976 23.2071 38.2071L30 31.4142L36.7929 38.2071C37.1834 38.5976 37.8166 38.5976 38.2071 38.2071C38.5976 37.8166 38.5976 37.1834 38.2071 36.7929L31.4142 30L38.2071 23.2071Z"
                fill="#141414"
              />
            </svg>
          </CloseButton>
          <Typography size="bodyText" style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '40px' }}>
            프로필 정보 수정하기
          </Typography>
          <div style={{ height: '40px' }}></div>
          <HeaderButtonWrapper>
            <EditModalHeaderButton
              isClicked={headerButtonStates.basicMajor}
              onClick={() => handleHeaderButtonClick('basicMajor')}
            >
              나의 기본전공
            </EditModalHeaderButton>
            <EditModalHeaderButton
              isClicked={headerButtonStates.interestMajor}
              onClick={() => handleHeaderButtonClick('interestMajor')}
            >
              관심 전공
            </EditModalHeaderButton>
            <EditModalHeaderButton
              isClicked={headerButtonStates.currentGPA}
              onClick={() => handleHeaderButtonClick('currentGPA')}
            >
              현재 내 학점
            </EditModalHeaderButton>
            <EditModalHeaderButton
              isClicked={headerButtonStates.desiredSemester}
              onClick={() => handleHeaderButtonClick('desiredSemester')}
            >
              희망 진입학기
            </EditModalHeaderButton>
          </HeaderButtonWrapper>
          <ContentsWrapper>
            <ContentsTitle>프로필 사진 변경하기</ContentsTitle>
            <ContentsTitle>닉네임 변경하기</ContentsTitle>
            <ContentsTitle>학번 변경하기</ContentsTitle>
            <ContentsTitle>본전공 변경하기</ContentsTitle>
          </ContentsWrapper>
          <MoveButtonWrapper>
            <PrevButton
              onClick={() => {
                setOpenModal(!isOpenModal);
              }}
            >
              취소
            </PrevButton>
            <SubmitButton
              onClick={() => {
                setOpenModal(!isOpenModal);
              }}
            >
              저장하기
            </SubmitButton>
          </MoveButtonWrapper>
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

const MoveButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 628px;
  gap: 18px;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-left: auto;
  margin-right: auto;
  margin-top: 58px;
  margin-bottom: 101px;
`;

const ContentsTitle = styled.text`
  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  opacity: 0.8;
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
