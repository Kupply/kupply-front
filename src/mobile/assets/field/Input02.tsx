import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { text } from 'stream/consumers';
import styled, { css } from 'styled-components';

//import EyeIcon from '../../../assets/icons/EyeIcon';
//import EyeIcon from '../../../assets/icons/NewEyeIcon';

/* 
    Width는 부모 요소(Wrapper)의 width를 따라갑니다.
*/

const baseWrapper = css`
  display: flex;
  width: 100%;
  align-items: center;
  //max-width: 328px;
  min-width: 250px;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid #d85888;
  & > img {
    position: relative;
    right: 0.521vw; //10px;
  }

  //height: 42px;
  height: 100%;
  box-sizing: border-box;

  padding: 12px 16px;
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

const PlaceHolder = styled.text`
  width: 100%;
  color: #b9b9b9;
  font-family: Pretendard;
  font-size: 13px;
  font-weight: 500;
  font-style: normal;
  line-height: 18px;
  opacity: 0.8;
  white-space: nowrap;
`;

const Input = styled.input`
  color: #141414;
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  opacity: 0.8;
  border: none;
  outline: none;
  background: none;
  caret-color: #d85888;
`;

const FilledText = styled.span`
  color: #d85888;

  text-align: center;
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
`;

export type StateOptions = 'default' | 'filled' | 'focused' | 'typing';

const stateMapping = {
  focused: focusedWrapper,
  typing: typingWrapper,
  filled: filledWrapper,
  default: baseWrapper,
};

export interface TextFieldBoxProps extends React.ComponentPropsWithoutRef<'input'> {
  state?: StateOptions;
  setState: (state: StateOptions) => void;
  setValue: (value: string) => void;
  value?: string;
  placeholder?: string;
}

const TextFieldWrapper = styled.div<TextFieldBoxProps>`
  ${baseWrapper}
  ${(props) => stateMapping[props.state || 'default']}
`;

function Input02(props: TextFieldBoxProps) {
  const { state = 'default', setState, setValue, type, value, placeholder, ...rest } = props;

  const ref = useRef<HTMLDivElement | null>(null);

  const onFocus = () => {
    setState('focused');
  };

  const onBlur = () => {
    if (state === 'focused') {
      if (value === '') setState('default');
      else {
        setState('filled');
      }
    }
  };

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (ref.current !== null && !ref.current.contains(e.target as Node) && state === 'focused') {
        if (value === '') setState('default');
        else setState('filled');
      }
    };

    window.addEventListener('click', handleDocumentClick);

    return () => {
      window.removeEventListener('click', handleDocumentClick);
    };
  }, [value, state, setState]);

  return (
    <>
      <TextFieldWrapper
        state={state}
        setState={setState}
        setValue={setValue}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={ref}
        tabIndex={rest.tabIndex || 0}
      >
        {state === 'default' && (
          <>
            <PlaceHolder>{placeholder}</PlaceHolder>
          </>
        )}
        {state === 'focused' && (
          <>
            <Input
              value={value}
              onChange={
                rest.onChange
                  ? rest.onChange
                  : (e: React.ChangeEvent<HTMLInputElement>) => {
                      setValue(e.target.value);
                    }
              }
              autoFocus
            />
          </>
        )}
        {state === 'filled' && <FilledText>{value}</FilledText>}
      </TextFieldWrapper>
    </>
  );
}

export default Input02;
