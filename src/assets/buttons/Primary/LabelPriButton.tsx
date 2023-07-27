import React, { useState } from "react";
import styled, { css } from "styled-components";

/* 
총 세 가지의 변수 (props)
1) Button Style - 파일 분리 
2) Button State 
3) Button Size 
*/

/* 버튼 사이즈(size) 지정 */
const buttonSize = {
  small: css`
    padding: 8px 26px;
    text-align: center;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;

    border-radius: 8px;
  `,

  medium: css`
    padding: 16px 32px;
    text-align: center;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;

    border-radius: 10px;
  `,

  large: css`
    padding: 24px 34px;
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
const DefaultButton = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  background: var(--primary-color, #d85888);
`;

const HoverButton = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  background: rgba(216, 88, 136, 0.75);

  /* Hover interaction */
  box-shadow: 0px 4px 12px 0px rgba(216, 88, 136, 0.25);
`;

const ActiveButton = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  background: var(--primary-clolr-10, rgba(216, 88, 136, 0.1));
`;

const DisabledButton = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  background: var(--primary-color, #d85888);
`;

const ButtonContainer = styled.div`
  display: inline-block;
`;

interface LabelPrimaryButtonProps {
  buttonSize?: "small" | "medium" | "large";
  // props 를 optional 하게 만듦
}

function LabelPrimaryButton({
  buttonSize = "medium", // default size 를 medium 으로 설정
}: LabelPrimaryButtonProps): JSX.Element {
  const [buttonState, setButtonState] = useState<
    "default" | "hover" | "active" | "disabled"
  >("default");

  const handleClick = () => {
    /* 구체적인 함수 내부는 추후 수정*/
    setButtonState("active");
  };

  const getButtonStyle = () => {
    switch (buttonState) {
      case "default":
        return DefaultButton;
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
      <StyledButton onClick={handleClick} buttonSize={buttonSize}>
        Join!
      </StyledButton>
    </ButtonContainer>
  );
}

export default LabelPrimaryButton;
