import React, { useState } from 'react';
import styled, { css, CSSProp } from 'styled-components';

/*  
Primary 버튼들 중, 아래 두 가지의 변수 (props)에 따라 버튼 컴포넌트 생성
1) Button State 
2) Button Size 
*/

/* 1. 버튼 사이즈(size) 지정 */
const buttonSizeStyles = {
  small: css`
    width: 36px;
    height: 36px;
  `,

  medium: css`
    width: 52px;
    height: 52px;
  `,

  large: css`
    width: 68px;
    height: 68px;
  `,
};

/* 2. 버튼 내 벡터 이미지 사이즈 지정 */
const imageSizeStyles = {
  small: css`
    width: 18px;
    height: 18px;
    vertical-align: middle;
  `,

  medium: css`
    width: 20px;
    height: 20px;
    vertical-align: middle;
  `,

  large: css`
    width: 24px;
    height: 24px;
    vertical-align: middle;
  `,
};

/* 3. 버튼 상태(state) 지정 */
const DefaultButton = styled.div<{ buttonSize: CSSProp; imageSize: CSSProp }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 999px;
  background: #d85888;
  ${({ buttonSize }) => buttonSize};

  & ButtonImage {
    ${({ imageSize }) => imageSize};
  }
  & ActiveButtonImage {
    ${({ imageSize }) => imageSize};
  }
`;

const HoverButton = styled.div<{ buttonSize: CSSProp; imageSize: CSSProp }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 999px;
  background: var(--primary-85, rgba(216, 88, 136, 0.85));
  ${({ buttonSize }) => buttonSize};

  /* Hover interaction */
  box-shadow: 0px 4px 12px 0px rgba(216, 88, 136, 0.25);

  & ButtonImage {
    ${({ imageSize }) => imageSize};
  }
  & ActiveButtonImage {
    ${({ imageSize }) => imageSize};
  }
`;

const ActiveButton = styled.div<{ buttonSize: CSSProp; imageSize: CSSProp }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 999px;
  background: var(--primary-clolr-10, rgba(216, 88, 136, 0.1));
  ${({ buttonSize }) => buttonSize};

  & ButtonImage {
    ${({ imageSize }) => imageSize};
  }
  & ActiveButtonImage {
    ${({ imageSize }) => imageSize};
  }
`;

const DisabledButton = styled.div<{ buttonSize: CSSProp; imageSize: CSSProp }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 999px;
  opacity: 0.44999998807907104;
  background: var(--primary-color, #d85888);
  ${({ buttonSize }) => buttonSize};

  & ButtonImage {
    ${({ imageSize }) => imageSize};
  }
  & ActiveButtonImage {
    ${({ imageSize }) => imageSize};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonImage = styled.img<{ imageSize: CSSProp }>`
  vertical-align: middle;
  ${({ imageSize }) => imageSize};
`;

const ActiveButtonImage = styled.img<{ imageSize: CSSProp }>`
  vertical-align: middle;
  filter: invert(55%) sepia(60%) saturate(3485%) hue-rotate(337deg) brightness(95%) contrast(81%);
  ${({ imageSize }) => imageSize};
`;

interface IconPrimaryButtonProps {
  buttonSize?: 'small' | 'medium' | 'large';
  imageSize?: 'small' | 'medium' | 'large';
  controlActive?: boolean;
}

// 주목
function IconPrimaryButton({
  buttonSize = 'medium', // default
  imageSize = 'medium', //default
  controlActive = true, // default
}: IconPrimaryButtonProps): JSX.Element {
  const [buttonState, setButtonState] = useState<'default' | 'hover' | 'active' | 'disabled'>(
    controlActive ? 'default' : 'disabled',
  ); // 수정 필요

  const handleClick = () => {
    /* 구체적인 함수 내부는 추후 수정*/
    setButtonState('active');
  };

  const handleMouseEnter = () => {
    setButtonState('hover');
  };

  const handleMouseLeave = () => {
    setButtonState(controlActive ? 'default' : 'disabled');
  };

  interface StyledButtonProps {
    buttonSize?: CSSProp;
    imageSize?: CSSProp;
  }

  const getButtonStyle = () => {
    switch (buttonState) {
      case 'hover':
        return styled(HoverButton)<StyledButtonProps>``;
      case 'active':
        return styled(ActiveButton)<StyledButtonProps>``;
      case 'disabled':
        return styled(DisabledButton)<StyledButtonProps>``;
      default:
        return styled(DefaultButton)<StyledButtonProps>``;
    }
  };

  const StyledButton = getButtonStyle();

  // 실제 이식되는 부분 (컴포넌트 이식 때마다 props 지정 필요)
  return (
    <ButtonContainer>
      <StyledButton
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        buttonSize={buttonSizeStyles[buttonSize]}
      >
        {buttonState === 'active' ? (
          // Active
          buttonSize === 'small' ? (
            <ActiveButtonImage src={'../../designImage/UserD.svg'} alt="오류" imageSize={imageSizeStyles[imageSize]} />
          ) : buttonSize === 'medium' ? (
            <ActiveButtonImage src={'../../designImage/UserD.svg'} alt="오류" imageSize={imageSizeStyles[imageSize]} />
          ) : (
            <ActiveButtonImage src={'../../designImage/UserD.svg'} alt="오류" imageSize={imageSizeStyles[imageSize]} />
          )
        ) : // Default
        buttonSize === 'small' ? (
          <ButtonImage src={'../../designImage/UserD.svg'} alt="오류" imageSize={imageSizeStyles[imageSize]} />
        ) : buttonSize === 'medium' ? (
          <ButtonImage src={'../../designImage/UserD.svg'} alt="오류" imageSize={imageSizeStyles[imageSize]} />
        ) : (
          <ButtonImage src={'../../designImage/UserD.svg'} alt="오류" imageSize={imageSizeStyles[imageSize]} />
        )}
      </StyledButton>
    </ButtonContainer>
  );
}

export default IconPrimaryButton;
