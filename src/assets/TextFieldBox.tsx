import React from "react";
import { useState, useEffect, useRef } from "react";
import { text } from "stream/consumers";
import styled, { css } from "styled-components";

const baseWrapper = css`
  display: flex;
  width: 592px;
  height: 48px;
  padding: 10px 18px;
  gap: 10px;
  border-radius: 10px;
`;

const defaultWrapper = css`
  align-items: center;
  background: none;
  border: 1px solid #b9b9b9;
`;

const hoverWrapper = css`
  align-items: center;
  border: 1px solid #eee;
  background: #fff;
  box-shadow: 0px 0px 12px 0px rgba(216, 88, 136, 0.1);
`;

const focusedWrapper = css`
  justify-content: space-between;
  align-items: center;
  border: 1px solid #d85888;
  background: rgba(216, 88, 136, 0.05);
`;

const typingWrapper = css`
  align-items: center;
  border: 1px solid #d85888;
  background: rgba(216, 88, 136, 0.05);
`;

const filledWrapper = css`
  justify-content: space-between;
  align-items: center;
  border: 1px solid #d85888;
  background: none;
`;

const errorWrapper = css`
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ea0909;
  background: none;
`;

const loadingWrapper = css`
  justify-content: space-between;
  align-items: center;
  border: 1px solid #d85888;
  background: none;
`;

const passwordWrapper = css`
  align-items: center;
  border: 1px solid #d85888;
  background: rgba(216, 88, 136, 0.05);
`;

const PlaceHolder = styled.text`
  color: #b9b9b9;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
  font-style: normal;
  line-height: 18px;
  opacity: 0.8;
`;

const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 520px;
  height: 100%;
`;

const HelpMessage = styled.text`
  width: 550.62px;
  height: 12px;
  color: #d85888;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px;
`;

const Input = styled.input`
  color: #141414;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  opacity: 0.8;
  border: none;
  outline: none;
  background: none;
  caret-color: #d85888;
`;

const CorrectText = styled.input`
  width: 546px;
  height: 18px;
  font-size: 18px;
  flex-shrink: 0;
  color: #d85888;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  background: #fff;
  ${(props) => props.type === "password" && "color: black;"}
`;

const ErrorText = styled.input`
  width: 500px;
  height: 18px;
  font-size: 18px;
  flex-shrink: 0;
  color: #141414;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  opacity: 0.8;
  background: #fff;
`;

const ErrorMessageWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 592px;
  height: 12px;
  padding-top: 5px;
  padding-left: 18px;
  gap: 4px;
  border: none;
  background: none;
`;

const ErrorMessage = styled.text`
  width: 550.62px;
  color: #ea0909;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px;
  opacity: 0.8;
`;

const EyeIcon = styled.div<{ state: string }>`
  position: relative;
  z-index: 1;
  top: 2px;
  ${(props) =>
    props.state === "error" &&
    css`
      left: 10px;
    `}
`;

export type StateOptions =
  | "default"
  | "hover"
  | "focused"
  | "typing"
  | "filled"
  | "error"
  | "loading"
  | "password";

const stateMapping = {
  default: defaultWrapper,
  hover: hoverWrapper,
  focused: focusedWrapper,
  typing: typingWrapper,
  filled: filledWrapper,
  error: errorWrapper,
  loading: loadingWrapper,
  password: passwordWrapper,
};

export interface TextFieldBoxProps
  extends React.ComponentPropsWithoutRef<"input"> {
  state?: StateOptions;
  setState: (state: StateOptions) => void;
  setValue: (value: string) => void;
  errorMessage?: string;
  helpMessage?: string;
}

const TextFieldWrapper = styled.div<TextFieldBoxProps>`
  ${baseWrapper}
  ${(props) => stateMapping[props.state || "default"]}
`;

function TextFieldBox(props: TextFieldBoxProps) {
  const {
    state = "default",
    setState,
    setValue,
    errorMessage = "Invalid Message",
    helpMessage = "",
    ...rest
  } = props;

  const ref = useRef<HTMLDivElement | null>(null);

  const [textType, setTextType] = useState<string>("default");

  const onMouseEnter = () => {
    if (state === "default") {
      setState("hover");
    }
  };

  const onMouseLeave = () => {
    if (state === "hover") {
      if (rest.value === "") setState("default");
      else setState("filled");
    }
  };

  const onFocus = () => {
    setState("focused");
  };

  const onBlur = () => {
    if (state === "focused") {
      if (rest.value === "") setState("default");
      else setState("filled");
    }
  };

  useEffect(() => {
    if (rest.type === "password") setTextType("password");
  }, []);

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (
        ref.current !== null &&
        !ref.current.contains(e.target as Node) &&
        state === "focused"
      ) {
        if (rest.value === "") setState("default");
        else setState("filled");
      }
    };

    window.addEventListener("click", handleDocumentClick);

    return () => {
      window.removeEventListener("click", handleDocumentClick);
    };
  }, [rest.value, state, setState]);

  return (
    <>
      <TextFieldWrapper
        state={state}
        setState={setState}
        setValue={setValue}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={ref}
        tabIndex={rest.tabIndex || 0}
      >
        {state === "default" || state === "hover" ? (
          <PlaceHolder>{rest.placeholder}</PlaceHolder>
        ) : state === "focused" ? (
          <>
            <MessageBox>
              <HelpMessage>{helpMessage}</HelpMessage>
              <Input
                value={rest.value}
                onChange={rest.onChange}
                type={textType}
                autoFocus
              />
            </MessageBox>
            {textType === "password" ? (
              <EyeIcon
                onMouseDown={(e) => {
                  e.preventDefault();
                  setTextType("text");
                }}
                state={state}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                    stroke="#A8A8A8"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                    stroke="#A8A8A8"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </EyeIcon>
            ) : textType === "text" ? (
              <EyeIcon
                onMouseDown={(e) => {
                  e.preventDefault();
                  setTextType("password");
                }}
                state={state}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="23"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clip-path="url(#clip0_2389_1254)">
                    <path
                      d="M9.9 4.24002C10.5883 4.0789 11.2931 3.99836 12 4.00003C19 4.00003 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19M14.12 14.12C13.8454 14.4148 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.4811 9.80385 14.1962C9.51897 13.9113 9.29439 13.572 9.14351 13.1984C8.99262 12.8249 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2219 9.18488 10.8539C9.34884 10.4859 9.58525 10.1547 9.88 9.88003M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 3.96914 7.65663 6.06 6.06003L17.94 17.94Z"
                      stroke="#A8A8A8"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M1 1L23 23"
                      stroke="#A8A8A8"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2389_1254">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </EyeIcon>
            ) : (
              <></>
            )}
            <img
              src="../../design_image/text_field/x_circle.png"
              width="24px"
              height="24px"
              onMouseDown={() => {
                setValue("");
              }}
            />
          </>
        ) : state === "typing" ? (
          <>
            <MessageBox>
              <HelpMessage>{helpMessage}</HelpMessage>
              <Input {...rest} />
            </MessageBox>
            <img
              src="../../design_image/text_field/x_circle.png"
              width="28px"
              height="28px"
            />
          </>
        ) : state === "filled" ? (
          <>
            <CorrectText
              type={rest.type}
              value={rest.value}
              disabled
            ></CorrectText>
            <img
              src="../../design_image/text_field/check_circle.png"
              width="28px"
              height="28px"
            />
          </>
        ) : state === "error" ? (
          <>
            <ErrorText type={textType} value={rest.value} disabled></ErrorText>
            {textType === "password" ? (
              <EyeIcon
                onMouseDown={(e) => {
                  e.preventDefault();
                  setTextType("text");
                }}
                state={state}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                    stroke="#A8A8A8"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                    stroke="#A8A8A8"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </EyeIcon>
            ) : textType === "text" ? (
              <EyeIcon
                onMouseDown={(e) => {
                  e.preventDefault();
                  setTextType("password");
                }}
                state={state}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="23"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clip-path="url(#clip0_2389_1254)">
                    <path
                      d="M9.9 4.24002C10.5883 4.0789 11.2931 3.99836 12 4.00003C19 4.00003 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19M14.12 14.12C13.8454 14.4148 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.4811 9.80385 14.1962C9.51897 13.9113 9.29439 13.572 9.14351 13.1984C8.99262 12.8249 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2219 9.18488 10.8539C9.34884 10.4859 9.58525 10.1547 9.88 9.88003M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 3.96914 7.65663 6.06 6.06003L17.94 17.94Z"
                      stroke="#A8A8A8"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M1 1L23 23"
                      stroke="#A8A8A8"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2389_1254">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </EyeIcon>
            ) : (
              <></>
            )}
            <img
              src="../../design_image/text_field/alert_circle.png"
              width="28px"
              height="28px"
            />
          </>
        ) : state === "loading" ? (
          <>
            <CorrectText>{rest.value}</CorrectText>
            <img
              src="../../design_image/text_field/loading.png"
              width="28px"
              height="28px"
            />
          </>
        ) : (
          <></>
        )}
      </TextFieldWrapper>
      {state === "error" ? (
        <ErrorMessageWrapper>
          <img
            src="../../design_image/text_field/x.png"
            width="12px"
            height="12px"
          />
          <ErrorMessage>{errorMessage}</ErrorMessage>
        </ErrorMessageWrapper>
      ) : (
        <></>
      )}
    </>
  );
}

export default TextFieldBox;
