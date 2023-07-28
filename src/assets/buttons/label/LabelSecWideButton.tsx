import React, { useState } from "react";
import styled from "styled-components";

// Secondary 버튼들 중, {Large - Wide} 타입에 대한 버튼 컴포넌트 생성

/* 버튼 상태(state) 지정 */
const DefaultButton = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border: 1px solid #d85888;
  color: #d85888;

  width: 140px;
  height: 68px;
  // padding: 24px 34px;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;

  border-radius: 10px;
`;

const HoverButton = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: #d85888;
  background: rgba(216, 88, 136, 0.1);

  width: 140px; // 변경
  height: 68px;
  // padding: 24px 34px;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;

  border-radius: 10px;
`;

const ActiveButton = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: #fff; // 유일하게 폰트 색상 상이
  background: var(--primary-color, #d85888);

  width: 140px; // 변경
  height: 68px;
  // padding: 24px 34px;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;

  border-radius: 10px;
`;

const DisabledButton = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: #d85888;
  border: 1px solid #d85888;
  opacity: 0.44999998807907104;

  width: 140px; // 변경
  height: 68px;
  // padding: 24px 34px;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;

  border-radius: 10px;
`;

const ButtonContainer = styled.div`
  display: inline-block;
`;

const ButtonContentContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonImage = styled.img`
  margin-right: 8px;
  vertical-align: middle;
`;

// Active Button 으로 변경 시, svg 이미지 색깔 변화 위해서 추가
const ActiveButtonImage = styled.img`
  margin-right: 8px;
  vertical-align: middle;
  filter: invert(55%) sepia(60%) saturate(3485%) hue-rotate(337deg)
    brightness(95%) contrast(81%);
`;

interface LabelPrimaryButtonProps {
  controlActive?: boolean;
  // props 를 optional 하게 설정
}

function LabelPrimaryWideButton({
  controlActive = true,
}: LabelPrimaryButtonProps): JSX.Element {
  const [buttonState, setButtonState] = useState<
    "default" | "hover" | "active" | "disabled"
  >(controlActive ? "default" : "disabled");

  const handleClick = () => {
    /* 구체적인 함수 내부는 추후 수정*/
    setButtonState("active");
  };

  const handleMouseEnter = () => {
    setButtonState("hover");
  };

  const handleMouseLeave = () => {
    setButtonState(controlActive ? "default" : "disabled");
  };

  const getButtonStyle = () => {
    switch (buttonState) {
      case "hover":
        return HoverButton;
      case "active":
        return ActiveButton;
      case "disabled":
        return DisabledButton;
      default:
        return DefaultButton;
    }
  };

  const StyledButton = getButtonStyle();

  // 실제 이식 부분 (컴포넌트 이식 때마다 buttonSize 지정 필요)
  return (
    <ButtonContainer>
      <StyledButton
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ButtonContentContainer>
          {buttonState === "active" ? (
            <ActiveButtonImage
              src={"../../design_image/fi_send.svg"}
              alt="오류"
            />
          ) : (
            <ButtonImage src={"../../design_image/fi_send.svg"} alt="오류" />
          )}
          Join!
        </ButtonContentContainer>
      </StyledButton>
    </ButtonContainer>
  );
}

export default LabelPrimaryWideButton;
