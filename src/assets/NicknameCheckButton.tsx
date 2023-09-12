import { hover } from "@testing-library/user-event/dist/hover";
import React from "react";
import { useState, useEffect, useRef } from "react";
import styled, { css, keyframes } from "styled-components";

const baseButton = css`
  height: 24px;
  gap: 2px;
  padding: 8px 10px;
  justify-content: center;
  align-items: center;
  border-radius: 999px;
`;
const defaultButtonStyle = css`
  display: flex;
  border: 1px solid #d85888;
  width: 67px;
`;

const hoverButtonStyle = css`
  display: flex;
  background: rgba(216, 88, 136, 0.1);
  width: 65px;
`;

const filledButtonStyle = css`
  display: flex;
  width: 87px;
  background: #d85888;
  color: white;
  transition: all 0.3s ease 0s;
`;

const errorButtonStyle = css`
  display: flex;
  width: 87px;
  background: rgba(234, 9, 9, 0.7);
  color: white;
  transition: all 0.3s ease 0s;
`;

const loadingButtonStyle = css`
  display: flex;
  background: rgba(216, 88, 136, 0.1);
  width: 87px;
  transition: width 0.25s ease 0s;
`;

const loadingMove = keyframes`
    0% {
        transform: translateX(20px) rotate(0deg);
    }
    100% {
        transform: translateX(0) rotate(90deg);
    }
`;

const loadingRotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const LoadingImage = styled.svg`
  position: relative;
  z-index: 1;
  animation: ${loadingMove} 0.25s ease, ${loadingRotate} 1s linear infinite,
    forwards;
`;

const ButtonText = css`
  position: relative;
  width: 48px;
  z-index: 999;
  color: #d85888;
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  white-space: nowrap;
`;

const CompleteButtonText = css`
  color: white;
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
`;

type StateOptions = "default" | "hover" | "loading" | "filled" | "error";

const stateMapping = {
  default: defaultButtonStyle,
  hover: hoverButtonStyle,
  filled: filledButtonStyle,
  error: errorButtonStyle,
  loading: loadingButtonStyle,
};

const textStateMapping = {
  default: ButtonText,
  hover: ButtonText,
  filled: CompleteButtonText,
  error: CompleteButtonText,
  loading: ButtonText,
};

export interface NicknameCheckButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {
  state: StateOptions;
  setState: (value: StateOptions) => void;
}

export interface NicknameCheckButtonTextProps
  extends React.ComponentPropsWithoutRef<"div"> {
  children: string;
  state: StateOptions;
}

const NicknameCheckButtonComponent = styled.button<NicknameCheckButtonProps>`
  ${baseButton}
  ${(props) => stateMapping[props.state || "default"]}
`;

const NicknameCheckButtonTextComponent = styled.div<NicknameCheckButtonTextProps>`
  ${(props) => textStateMapping[props.state || "default"]}
`;

function NicknameCheckButton(props: NicknameCheckButtonProps) {
  const { state = "default", setState } = props;

  const onMouseEnter = () => {
    if (state === "default") {
      setState("hover");
    }
  };

  const onMouseLeave = () => {
    if (state === "hover") {
      setState("default");
    }
  };

  const onMouseDown = async () => {
    if (state === "hover" || state === "default") {
      await setState("loading");

      await setTimeout(() => {
        setState("filled");
      }, 2000);

      // await setTimeout(() => {
      //   setState("error");
      // }, 2000);
    }
  };

  return (
    <>
      <NicknameCheckButtonComponent
        state={state}
        setState={setState}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseDown={onMouseDown}
      >
        {state === "loading" ? (
          <LoadingImage
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10 3.75C8.3424 3.75 6.75269 4.40848 5.58058 5.58058C4.40848 6.75269 3.75 8.3424 3.75 10C3.75 11.6576 4.40848 13.2473 5.58058 14.4194C6.75269 15.5915 8.3424 16.25 10 16.25C11.6576 16.25 13.2473 15.5915 14.4194 14.4194C15.5915 13.2473 16.25 11.6576 16.25 10C16.25 8.3424 15.5915 6.75269 14.4194 5.58058C13.2473 4.40848 11.6576 3.75 10 3.75ZM1.25 10C1.25 5.1675 5.1675 1.25 10 1.25C14.8325 1.25 18.75 5.1675 18.75 10C18.75 14.8325 14.8325 18.75 10 18.75C5.1675 18.75 1.25 14.8325 1.25 10Z"
              fill="#D85888"
              fill-opacity="0.2"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.99972 3.75001C8.38834 3.74639 6.83855 4.36876 5.67722 5.48584C5.43662 5.70831 5.11828 5.82739 4.79074 5.81747C4.4632 5.80754 4.15266 5.66939 3.92597 5.43276C3.69928 5.19613 3.57458 4.87995 3.57871 4.55228C3.58284 4.22462 3.71548 3.91168 3.94805 3.68084C5.57465 2.11789 7.74392 1.24654 9.99972 1.25001C10.3312 1.25001 10.6492 1.38171 10.8836 1.61613C11.118 1.85055 11.2497 2.16849 11.2497 2.50001C11.2497 2.83153 11.118 3.14947 10.8836 3.38389C10.6492 3.61831 10.3312 3.75001 9.99972 3.75001Z"
              fill="#D85888"
            />
          </LoadingImage>
        ) : state === "filled" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M9.99984 18.3334C14.6022 18.3334 18.3332 14.6024 18.3332 10C18.3332 5.39765 14.6022 1.66669 9.99984 1.66669C5.39746 1.66669 1.6665 5.39765 1.6665 10C1.6665 14.6024 5.39746 18.3334 9.99984 18.3334Z"
              fill="white"
            />
            <path
              d="M12.7777 7.91669L8.95828 11.7361L7.22217 10"
              stroke="#D85888"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        ) : state === "error" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M9.99984 18.3334C14.6022 18.3334 18.3332 14.6024 18.3332 10C18.3332 5.39765 14.6022 1.66669 9.99984 1.66669C5.39746 1.66669 1.6665 5.39765 1.6665 10C1.6665 14.6024 5.39746 18.3334 9.99984 18.3334Z"
              fill="white"
            />
            <path
              d="M10 13.3333H10.0083"
              stroke="#EA0909"
              stroke-opacity="0.7"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10 6.66669V10"
              stroke="#EA0909"
              stroke-opacity="0.7"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        ) : (
          <></>
        )}
        <NicknameCheckButtonTextComponent state={state}>
          중복 확인
        </NicknameCheckButtonTextComponent>
      </NicknameCheckButtonComponent>
    </>
  );
}

export default NicknameCheckButton;
