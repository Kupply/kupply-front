import React, { useState } from "react";
import styled, { css, CSSProp } from "styled-components";

/*  
Primary 버튼들 중, 아래 두 가지의 변수 (props)에 따라 버튼 컴포넌트 생성
1) Button State 
2) Button Size 
(다만 이때 Large-Wide 타입의 경우, 이미지 삽입이 필요하여 별도의 파일로 분리 - LabelPriWideButton.tsx)
*/

/* 버튼 사이즈(size) 지정 */
const buttonSizeStyles = {
  small: css`
    width: 92px;
    height: 36px;
    // padding: 8px 26px;
    text-align: center;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;

    border-radius: 8px;
  `,

  medium: css`
    width: 108px;
    height: 52px;
    // padding: 16px 32px;
    text-align: center;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;

    border-radius: 10px;
  `,

  large: css`
    width: 112px;
    height: 68px;
    // padding: 24px 34px;
    text-align: center;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;

    border-radius: 10px;
  `,
};

/* 버튼 상태(state) 지정 */
const DefaultButton = styled.div<{ buttonSize: CSSProp }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  background: var(--primary-color, #d85888);
  color: var(--white, #fff);
  ${({ buttonSize }) => buttonSize}
`;

const HoverButton = styled.div<{ buttonSize: CSSProp }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: var(--white, #fff);
  background: rgba(216, 88, 136, 0.75);
  ${({ buttonSize }) => buttonSize};

  /* Hover interaction */
  box-shadow: 0px 4px 12px 0px rgba(216, 88, 136, 0.25);
`;

const ActiveButton = styled.div<{ buttonSize: CSSProp }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: #d85888; // 유일하게 폰트 색상 상이
  background: var(--primary-clolr-10, rgba(216, 88, 136, 0.1));
  ${({ buttonSize }) => buttonSize};
`;

const DisabledButton = styled.div<{ buttonSize: CSSProp }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: var(--white, #fff);
  opacity: 0.44999998807907104;
  background: var(--primary-color, #d85888);

  ${({ buttonSize }) => buttonSize};
`;

const ButtonContainer = styled.div`
  display: inline-block;
`;

interface LabelPrimaryButtonProps {
  buttonSize?: "small" | "medium" | "large";
  controlActive?: boolean;
  // props 를 optional 하게 설정
}

function LabelPrimaryButton({
  buttonSize = "medium", // default size 를 medium 으로 설정
  controlActive = true, // default
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
        buttonSize={buttonSizeStyles[buttonSize]}
      >
        Join!
      </StyledButton>
    </ButtonContainer>
  );
}

export default LabelPrimaryButton;
