import React, { useState, ChangeEvent, KeyboardEvent, useRef, useEffect } from 'react';
import styled from 'styled-components';

export interface TextAreaBoxProps extends React.ComponentPropsWithRef<'input'> {
  isEntered?: boolean;
  value?: string;
  setValue: (value: string) => void;
  name: string;
  setRef?: (ref: React.Ref<HTMLInputElement>) => void;
}


export default function TextAreaBox(props: TextAreaBoxProps) {
  const { value, setValue, name, isEntered: initIsEntered, setRef, onPaste = undefined } = props;
  const [fieldName, fieldIndex] = name.split('-');

  const [isEntered, setIsEntered] = useState<boolean>(initIsEntered || false);

  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (setRef) setRef(inputRef);
  }, []);

  useEffect(() => {
    if (value === '') setIsEntered(false);
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^0-9]/g, '');
    setValue(newValue);
    console.log(value);
    if (newValue === '') {
      setIsEntered(false);
    } else {
      setIsEntered(true);
    }

    const nextSibling = document.querySelector(
      `input[name="${fieldName}-${parseInt(fieldIndex, 10) + 1}"]`,
    ) as HTMLInputElement;

    if (newValue !== '' && nextSibling && nextSibling.value === '') {
      nextSibling.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value) {
      const prevSibling = document.querySelector(
        `input[name="${fieldName}-${parseInt(fieldIndex, 10) - 1}"]`,
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
      onPaste={onPaste}
      maxLength={1}
      isEntered={isEntered}
      value={value}
      setValue={setValue}
      name={name}
      ref={inputRef}
    />
  );
}

// 그냥 inputWrapper안에 
const InputWrapper = styled.input<TextAreaBoxProps>`
  width: 3.91vw;
  height: 3.91vw;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.26vw;
  border: ${(props) => (props.isEntered ? '0.052vw solid #D85888' : '0.052vw solid #b9b9b9')};
  box-shadow: ${(props) => (props.isEntered ? '0px 0.208vw 0.625vw 0px rgba(216, 88, 136, 0.2)' : 'null')};
  background: var(--white, #fff);
  color: var(--main-black, #141414);
  font-family: Pretendard;
  font-size: 1.25vw;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
  text-align: center;
  &:focus {
    border-color: #d85888;
    outline: none;
    box-shadow: 0px 0.208vw 0.625vw 0px rgba(216, 88, 136, 0.2);
  }
`;

