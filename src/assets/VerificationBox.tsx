import React, { useState, ChangeEvent, KeyboardEvent, useRef } from "react";
import styled from "styled-components";

export interface VerificationBoxProps extends React.ComponentPropsWithoutRef<"input"> {
  isEntered?: boolean;
  value?: string;
  setValue?: (value: string) => void;
  name: string;
}

const InputWrapper = styled.input<VerificationBoxProps>`
  width: 75px;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: ${(props) => (props.isEntered ? "1px solid #D85888" : "1px solid #b9b9b9")};
  box-shadow: ${(props) => (props.isEntered ? "0px 4px 12px 0px rgba(216, 88, 136, 0.2)" : "null")};
  background: var(--white, #fff);
  color: var(--main-black, #141414);
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
  text-align: center;
  &:focus {
    border-color: #d85888;
    outline: none;
    box-shadow: 0px 4px 12px 0px rgba(216, 88, 136, 0.2);
  }
`;

export default function VerificationBox(props: VerificationBoxProps) {
  const { value, setValue, name } = props;
  const [fieldName, fieldIndex] = name.split("-");

  const [isEntered, setIsEntered] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(value || "");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^0-9]/g, "");
    setInputValue(newValue);

    if (newValue === "") {
      setIsEntered(false);
    } else {
      setIsEntered(true);
    }

    if (setValue) {
      setValue(newValue);
    }

    const nextSibling = document.querySelector(
      `input[name="${fieldName}-${parseInt(fieldIndex, 10) + 1}"]`
    ) as HTMLInputElement;

    if (newValue !== "" && nextSibling) {
      nextSibling.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !inputValue) {
      const prevSibling = document.querySelector(
        `input[name="${fieldName}-${parseInt(fieldIndex, 10) - 1}"]`
      ) as HTMLInputElement;

      if (prevSibling) {
        prevSibling.focus();
      }
    }
  };

  return (
    <InputWrapper
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      maxLength={1}
      isEntered={isEntered}
      value={inputValue}
      name={name}
      ref={inputRef}
    />
  );
}
