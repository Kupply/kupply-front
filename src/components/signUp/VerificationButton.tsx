import styled from "styled-components";
import { useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import { currentModalState, isOpenModalState, sendNumState } from "../../store/atom";
import { sendEmail } from "../../utils/SignUpFunctions";

type VerificationButtonProps = {
  onSetBlank: () => void;
};

export default function VerificationButton({onSetBlank}:VerificationButtonProps){
  const [currentModal, setCurrentModal] = useRecoilState(currentModalState);
  const [isOpenModal, setOpenModal] = useRecoilState(isOpenModalState);
  const [sendNum, setSendNum] = useRecoilState(sendNumState);

  const onClickToggleSmallModal = useCallback(async () => {
    setOpenModal(!isOpenModal);
    setCurrentModal(0);
    console.log(isOpenModal);
    //setState가 마지막에 실행되므로, 첫 번째 재전송 시엔 email 값이 빈 문자열이 된다.
    if (!isOpenModal) {
      setSendNum(sendNum + 1);
      await sendEmail(sessionStorage.getItem('kuEmail') || '');
    }
    onSetBlank();
  }, [isOpenModal]);

  const onClickToggleLargeModal = useCallback(() => {
    setOpenModal(!isOpenModal);
    setCurrentModal(1); // 현재 모달창 (step) 초기화
    console.log(isOpenModal); // 디버그 목적
  }, [isOpenModal]);

  return (
    <SubContentsWrapper>
        <TextButton onClick={onClickToggleSmallModal}>
          <div style={{ gap: '0.2588vw', display: 'flex'}}>
            <img src={process.env.PUBLIC_URL + `/designImage/VerificationAgain.svg`} alt="인증번호 다시받기 이미지" style={{width: '0.729vw', height: '0.729vw'}}/>
            인증번호 다시받기
          </div>
        </TextButton>
        <TextButton onClick={onClickToggleLargeModal}>아직 인증번호를 받지 못하셨나요?</TextButton>
      </SubContentsWrapper>
  )
}

const SubContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.78125vw; //15px;
  margin-top: 5.677vw; //109px; // 159.24px;
  margin-bottom: 6.302vw; //121px; //171px;
`;

const TextButton = styled.button`
  transition: 0.25s ease-in-out;
  display: flex;
  gap: 4.97px;
  color: rgba(216, 88, 136, 0.8);
  font-family: Pretendard;
  font-size: 0.729vw;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  text-decoration-line: underline;

  cursor: pointer;

  &:hover {
    color: black;
  }

  // 도형 아이콘 색깔 변경 고려
  &:hover svg g path {
    stroke: black;
  }
`;
