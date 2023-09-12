import React from "react";
import styled, { css } from "styled-components";
import { useState } from "react";

const CheckButtonWrapper = styled.button<{ isChecked: boolean }>`
  width: 28px;
  height: 28px;
  transition: 0.25s ease-in-out;
  justify-content: center;
  align-items: center;

  & > svg {
    width: 28px;
    height: 28px;
    transition: 0.25s ease-in-out;
    stroke: #a8a8a8;
    fill: ffffff;
  }

  /*
  &:active > svg > path {
    stroke: #ffffff;
    fill: rgba(216, 88, 136, 0.75);
    border: none;
  }
 */

  ${(props) =>
    props.isChecked &&
    css`
      & > svg > path {
        stroke: #ffffff;
        fill: rgba(216, 88, 136, 0.75);
        border: none;
      }
    `}
`;

export interface CheckButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {
  isChecked: boolean;
}

export default function CheckButton() {
  const [isChekced, setIsChecked] = useState(false);

  return (
    <CheckButtonWrapper
      isChecked={isChekced}
      onClick={() => {
        setIsChecked(!isChekced);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
      >
        <path
          d="M14.0002 25.6666C20.4435 25.6666 25.6668 20.4432 25.6668 13.9999C25.6668 7.5566 20.4435 2.33325 14.0002 2.33325C7.55684 2.33325 2.3335 7.5566 2.3335 13.9999C2.3335 20.4432 7.55684 25.6666 14.0002 25.6666Z"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M17.8891 11.0833L12.5419 16.4305L10.1113 13.9999"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </CheckButtonWrapper>
  );
}
