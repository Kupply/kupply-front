import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";

// 자동 넘어가기 구현 필요

export interface VerificationBoxProps
  extends React.ComponentPropsWithoutRef<"input"> {
  value: string;
  setValue: (arg0: string) => void;
}

const InputWrapper = styled.input<{ isEntered?: boolean }>`
  width: 75px;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: ${(props) =>
    props.isEntered ? "1px solid #D85888" : "1px solid #b9b9b9"};
  box-shadow: ${(props) =>
    props.isEntered ? "0px 4px 12px 0px rgba(216, 88, 136, 0.2)" : "null"};
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

export default function VerificationBox({
  setValue,
  value,
}: VerificationBoxProps) {
  const [isEntered, setIsEntered] = useState<boolean>(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") setIsEntered(false);
    else {
      setIsEntered(true);
      setValue(e.target.value);
    }
  };

  return (
    <InputWrapper onChange={handleChange} maxLength={1} isEntered={isEntered}>
      {value}
    </InputWrapper>
  );
}
