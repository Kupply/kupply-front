import styled from 'styled-components';
import React, { useState } from 'react';
import TextFieldBox, { StateOptions } from '../../../assets/TextFieldBox';
import PrevButton from '../../../assets/buttons/PrevButton';
import SubmitButton from '../../../assets/buttons/SubmitButton';
import Typography from '../../../assets/Typography';
import ModalLarge from '../../../components/base/ModalLarge';
import DropDown from '../../../assets/dropdown/dropDown';
import VerificationBox from '../../../assets/VerificationBox';
import MultiStepProgressBar from '../../../assets/MultiStepProgressBar';
import AlertIconExclamation from '../../../assets/icons/AlertIconExclamation';
import LabelButton from '../../../assets/buttons/LabelButton';
import MockApplicationButton from '../../../assets/myboardpage/MockApplication';
import AlertIconCheck from '../../../assets/icons/AlertIconCheck';

export interface ModalProps {
  isOpenModal: boolean;
  setOpenModal: (isOpenModal: boolean) => void;
  onClickModal: () => void; // 함수;
}

/*
  모달창 고유번호
  0 : STEP 1 기존 정보 확인하기
  1 : STEP 2 지원 학기 입력하기
  2 : STEP 3 자기소개서 첨부하기
  3 : 모의지원 제출 확인
  4 : 모의지원 완료 안내
  */

export default function ApplicationModal(props: ModalProps) {
  const { isOpenModal, setOpenModal, onClickModal } = props;
  const [currentModal, setCurrentModal] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  return (
    <Main>
      {isOpenModal && // 모달 오픈
        (isSubmitted ? ( // 프로그래스바가 있는 창과 없는 창 구분 (모달번호 0, 1, 2,  vs. 3, 4)
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
            {currentModal === 3 ? ( // 모달 3 vs. 모달 4
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
                    onClick={() => {
                      setCurrentModal(4); // 다음 창으로 이동
                    }}
                    style={{ width: '627.232px', height: '68px', fontSize: '20px' }}
                    // 글자 디자인 수정 필요
                  >
                    모의지원 완료하기
                  </MockApplicationButton>
                </div>
              </AlertWrapper>
            ) : (
              <AlertWrapper>
                <AlertIconCheck width="113px" height="113px" />
                <Typography size="largeText" bold="700" style={{ marginTop: '25px' }}>
                  모의지원이 완료되었습니다.
                </Typography>
                <Typography size="mediumText" bold="500" style={{ marginTop: '10px', lineHeight: '136.111%' }}>
                  고대빵 님의 이중전공 합격을 기원합니다.
                </Typography>
                <SubmitButton
                  onClick={() => {
                    setOpenModal(!isOpenModal);
                  }}
                  style={{ marginTop: '107px' }}
                >
                  확인
                </SubmitButton>
              </AlertWrapper>
            )}
          </ModalLarge>
        ) : (
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
            <ModalTiteWrapper>
              <Typography size="largeText">실지원 정보 확인하기</Typography>
              <Typography size="mediumText" style={{ lineHeight: ' 136.111% ' }}>
                실제 이중전공 지원 시 입력한 정보와 달라진 정보를 수정해주세요.
              </Typography>
            </ModalTiteWrapper>
            {currentModal === 0 && ( // 기존 정보 확인하기 단계
              <div>
                <ProgressBarWrapper>
                  <MultiStepProgressBar numberOfSteps={3} currentStep={1} complete={true} />
                  <ProgressBarTtitle style={{ paddingLeft: '135px' }}>
                    STEP1
                    <br />
                    기존 정보 확인하기
                  </ProgressBarTtitle>
                  <ProgressBarTtitle style={{ color: '#DFDFDF' }}>STEP2</ProgressBarTtitle>
                  <ProgressBarTtitle style={{ paddingLeft: '135px' }}>STEP3</ProgressBarTtitle>
                </ProgressBarWrapper>
              </div>
            )}
            {currentModal === 1 && ( // 지원학기 입력하기 단계
              <div>
                <ProgressBarWrapper>
                  <MultiStepProgressBar numberOfSteps={3} currentStep={1} complete={true} />
                  <ProgressBarTtitle>
                    STEP2
                    <br />
                    지원학기 입력하기
                  </ProgressBarTtitle>
                </ProgressBarWrapper>
              </div>
            )}
            {currentModal === 2 && ( // 자기소개서 첨부하기 단계
              <div>
                <ProgressBarWrapper>
                  <MultiStepProgressBar numberOfSteps={3} currentStep={1} complete={true} />
                  <ProgressBarTtitle>
                    STEP3
                    <br />
                    자기소개서 첨부하기
                  </ProgressBarTtitle>
                </ProgressBarWrapper>
              </div>
            )}
          </ModalLarge>
        ))}
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

const ModalTiteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  margin-top: 55px;
  margin-bottom: 18px;
`;

const ProgressBarTtitle = styled.text`
  color: #e57c90;
  text-align: left;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 136.111%;
  margin-top: 8px;
`;

const ProgressBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
