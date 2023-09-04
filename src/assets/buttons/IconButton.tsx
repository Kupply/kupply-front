// 수정 필요 (svg - children 으로 받아오기)

import React from "react";
import styled, { css } from "styled-components";

const paddingMapping = {
  small: "9px",
  medium: "16px",
  large: "22px",
};

const imageSizeMapping = {
  small: "18px",
  medium: "20px",
  large: "24px",
};

const colorMapping = {
  primary: css`
    color: white;
    background-color: #d85888;

    &:hover:not(:disabled) {
      background: rgba(216, 88, 136, 0.75);
      box-shadow: 0px 4px 12px 0px rgba(216, 88, 136, 0.25);
    }

    &:hover:not(:disabled) {
      background: rgba(216, 88, 136, 0.75);
      box-shadow: 0px 4px 12px 0px rgba(216, 88, 136, 0.25);
    }

    &:active:not(:disabled) {
      color: #d85888;
      background-color: rgba(216, 88, 136, 0.1);
    }

    &:active:not(:disabled) > svg > path {
      fill: #d85888;
    }
  `,
  secondary: css`
    color: #d85888;
    border: 1px solid #d85888;

    &:hover:not(:disabled) {
      background: rgba(216, 88, 136, 0.1);
      border: none;
    }

    &:hover:not(:disabled) > svg > path {
      fill: #d85888;
    }

    &:active:not(:disabled) {
      color: white;
      border: none;
      background: #d85888;
    }

    &:disabled > svg > path {
      fill: #d85888;
    }
  `,
};

const ButtonWrapper = styled.button<{
  size: "small" | "medium" | "large";
  buttonType: "primary" | "secondary";
}>`
  transition: 0.25s ease-in-out;
  justify-content: center;
  align-items: center;
  border-radius: 999px;
  padding: ${(props) => paddingMapping[props.size]};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }

  ${(props) => colorMapping[props.buttonType]};

  & > svg {
    width: ${(props) => imageSizeMapping[props.size]};
    height: ${(props) => imageSizeMapping[props.size]};
    transition: 0.25s ease-in-out;
    stroke: d85888;
  }
`;

export interface IconButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {
  buttonType: "primary" | "secondary";
  size: "small" | "medium" | "large";
}

// 수정 필요
export default function IconButton(props: IconButtonProps) {
  return <ButtonWrapper {...props}>{props.children}</ButtonWrapper>;
}
