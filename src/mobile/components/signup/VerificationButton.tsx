import styled from "styled-components";

type VerificationButtonProps = {
  onSetBlank: () => void;
  onClickToggleSmallModal: () => Promise<void>;
  onClickToggleLargeModal: () => void;
};

export default function VerificationButton({onSetBlank, onClickToggleLargeModal, onClickToggleSmallModal}:VerificationButtonProps){

  return (
    <SubContentsWrapper>
        <TextButton onClick={() => onClickToggleSmallModal()}>
          <div style={{ gap: '1px', display: 'flex'}}>
            <img src={process.env.PUBLIC_URL + `/designImage/VerificationAgain.svg`} alt="인증번호 다시받기 이미지" style={{width: '10px', height: '10px'}}/>
            인증번호 다시받기
          </div>
        </TextButton>
        <TextButton onClick={() => onClickToggleLargeModal()}>아직 인증번호를 받지 못하셨나요?</TextButton>
      </SubContentsWrapper>
  )
}

const SubContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 134px;
`;

const TextButton = styled.button`
  transition: 0.25s ease-in-out;
  display: flex;
  gap: 4.97px;
  color: rgba(216, 88, 136, 0.8);
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
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
