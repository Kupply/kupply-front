import React from 'react';
import styled, { css } from 'styled-components';

const paddingMapping = {
  small: '8px 26px',
  medium: '16px 1.66vw',
  large: '24px 34px',
};

const colorMapping = {
  primary: css`
    color: white;
    background-color: #d85888;

    // not in disabled state && hovering
    &:hover:not(:disabled) {
      background: rgba(216, 88, 136, 0.75);
      box-shadow: 0px 4px 12px 0px rgba(216, 88, 136, 0.25);
    }

    // not in disabled state && being activated or clicked (after pressing a button)
    &:active:not(:disabled) {
      color: #d85888;
      background-color: rgba(216, 88, 136, 0.1);
    }
  `,
  secondary: css`
    color: #d85888;
    border: 1px solid #d85888;

    &:hover:not(:disabled) {
      background: rgba(216, 88, 136, 0.1);

      border: none;
    }

    &:active:not(:disabled) {
      color: white;
      border: none;
      background: #d85888;
    }
  `,
};

const ButtonWrapper = styled.button<{
  size: 'small' | 'medium' | 'large';
  buttonType: 'primary' | 'secondary';
}>`
  transition: 0.25s ease-in-out;
  justify-content: center;
  align-items: center;
  padding: ${(props) => paddingMapping[props.size]};
  border-radius: ${(props) => (props.size === 'small' ? '6px' : '10px')};

  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 100% */

  &:disabled {
    cursor: not-allowed;
    opacity: 0.445;
  }

  ${(props) => colorMapping[props.buttonType]};
`;
export interface LabelButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  buttonType: 'primary' | 'secondary';
  size: 'small' | 'medium' | 'large';
}
export default function LabelButton(props: LabelButtonProps) {
  return <ButtonWrapper {...props}>{props.children}</ButtonWrapper>;
}
