import styled from 'styled-components';

type VerificationButtonProps = {
  onSetBlank: () => void;
  onClickToggleSmallModal: () => Promise<void>;
  onClickToggleLargeModal: () => void;
};

export default function VerificationButton({
  onSetBlank,
  onClickToggleLargeModal,
  onClickToggleSmallModal,
}: VerificationButtonProps) {
  return (
    <SubContentsWrapper>
      <TextButton onClick={() => onClickToggleSmallModal()}>
        <div style={{ gap: '0.277vw', display: 'flex' }}>
          <img
            src={process.env.PUBLIC_URL + `/designImage/VerificationAgain.svg`}
            alt="인증번호 다시받기 이미지"
            style={{ width: '2.78vw', height: '2.78vw' }}
          />
          인증번호 다시 받기
        </div>
      </TextButton>
      <TextButton onClick={() => onClickToggleLargeModal()}>아직 인증번호를 받지 못하셨나요?</TextButton>
    </SubContentsWrapper>
  );
}

const SubContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.222vw; /* 8px */
  margin-bottom: 37.222vw; /* 134px */
`;

const TextButton = styled.button`
  transition: 0.25s ease-in-out;
  display: flex;
  gap: 0.0138vw; /* approximately 0.05vw for 4.97px */
  color: rgba(216, 88, 136, 0.8);
  font-family: Pretendard;
  font-size: 2.778vw; /* 10px */
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
