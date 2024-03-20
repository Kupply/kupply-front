import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { text } from 'stream/consumers';
import styled, { css } from 'styled-components';
import EyeIcon from './icons/OldEyeIcon';
import Icon07 from './icons/Icon07';
import Icon08 from './icons/Icon07';

/* 
    Width는 부모 요소(Wrapper)의 width를 따라갑니다.
*/

const baseWrapper = css`
  display: flex;
  width: 100%;
  min-width: 278px;
  max-width: 592px;
  height: 48px;
  padding: 10px 18px;
  gap: 10px;
  border-radius: 10px;

  & > img {
    position: relative;
    right: 10px;
  }

  @media screen and (max-width: 600px) {
    height: 42px;
    box-sizing: border-box;

    padding: 12px 16px;
  }
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
  width: 100%;
  color: #b9b9b9;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
  font-style: normal;
  line-height: 18px;
  opacity: 0.8;
  white-space: nowrap;

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

const MessageBox = styled.div<{ isCheckDuplicated?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 80%;
  height: 100%;
  ${(props) =>
    props.isCheckDuplicated &&
    `
    width: 55%;
  `}
`;

const IconWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  & > img {
    position: relative;
    right: 10px;
  }
`;

const IconBundler = styled.div`
  position: relative;
  right: 10px;
  display: flex;
  flex-direction: row;

  & > button {
    margin-right: 8px;
  }
`;

const HelpMessage = styled.text`
  width: 100%;
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

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

const CorrectText = styled.input<{ type?: string }>`
  width: 70%;
  height: 18px;
  font-size: 18px;
  flex-shrink: 0;
  color: #d85888;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  background: #fff;
  ${(props) => props.type === 'password' && 'color: black;'}
  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

const ErrorText = styled.input`
  width: 70%;
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
  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

const ErrorMessageWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 216px;
  height: 12px;
  padding-top: 5px;
  padding-left: 18px;
  gap: 4px;
  border: none;
  background: none;

  @media screen and (max-width: 600px) {
    width: 100%;

    min-width: 278px;
    display: flex;
    justify-content: end;
    position: relative;
    bottom: 62px;
    right: 0px;
    padding: 0;
  }
`;

const ErrorMessage = styled.text`
  color: #ea0909;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px;
  opacity: 0.8;
`;

const EyeIconWrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  position: relative;
  z-index: 1;
  top: 2px;
  right: 10px;

  & > img {
    margin-left: 10px;
  }

  & > button {
    margin-right: 10px;
  }

  @media screen and (max-width: 600px) {
    right: 0px;
    top: 0px;
    & > img {
      margin-left: 5px;
      width: 15px;
      height: 15px;
    }

    & > svg {
      margin-left: 5px;
      width: 15px;
      height: 15px;
    }

    & > button {
      margin-right: 10px;
    }
  }
`;

const CheckDuplicated = styled.div`
  display: flex;

  min-width: 65px;
  width: 65px;
  height: 24px;
  padding: 4px 5px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: #d85888;

  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  border-radius: 999px;
  border: 1px solid #d85888;
  color: #d85888;

  @media screen and (max-width: 600px) {
    height: 18px;
  }
`;

const CheckDuplicatedValidation = styled.div<{ valid: boolean }>`
  display: flex;
  max-width: 67px;
  min-width: 62px;
  height: 22px;
  width: 25%;
  padding: 8px 10px;
  justify-content: center;
  align-items: center;
  gap: 1px;
  flex-shrink: 0;
  color: white;
  border-radius: 999px;
  background: ${(props) => (props.valid ? '#d85888' : '#F05353')};

  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;

  & > svg {
    margin-right: 4px;
  }

  @media screen and (max-width: 600px) {
    width: 30%;
    font-size: 12px;
    padding: 2px 5px;
    margin-left: -16px;
    margin-bottom: 1px;
    & > svg {
      margin-right: 0px;
    }
  }
`;

export type StateOptions = 'default' | 'hover' | 'focused' | 'typing' | 'filled' | 'error' | 'loading' | 'password';

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

export interface TextFieldBoxProps extends React.ComponentPropsWithoutRef<'input'> {
  state?: StateOptions;
  setState: (state: StateOptions) => void;
  setValue: (value: string) => void;
  errorMessage?: string;
  helpMessage?: string;
  validationMessage?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  isCheckDuplicated?: boolean; // 중복체크 여부
  valid?: boolean; // 입력값 유효성검증 통과여부 -> 부모 컴포넌트에서 onChange와 함께 전달
}

const TextFieldWrapper = styled.div<TextFieldBoxProps>`
  ${baseWrapper}
  ${(props) => stateMapping[props.state || 'default']}
`;

function TextFieldBox(props: TextFieldBoxProps) {
  const {
    state = 'default',
    setState,
    setValue,
    errorMessage = 'Invalid Message',
    helpMessage = '',
    validationMessage = '',
    type,
    value,
    placeholder,
    isCheckDuplicated = false,
    valid = true,
    ...rest
  } = props;

  const ref = useRef<HTMLDivElement | null>(null);

  const [textType, setTextType] = useState<string>('default');

  const onMouseEnter = () => {
    if (state === 'default') {
      setState('hover');
    }
  };

  const onMouseLeave = () => {
    if (state === 'hover') {
      if (value === '') setState('default');
      else {
        if (validationMessage && !valid) {
          setState('error');
        } else {
          setState('filled');
        }
      }
    }
  };

  const onFocus = () => {
    setState('focused');
  };

  const onBlur = () => {
    if (state === 'focused') {
      if (value === '') setState('default');
      else {
        if (validationMessage !== '' && !valid) {
          setState('error');
        } else {
          setState('filled');
        }
      }
    }
  };

  const onCheckDuplicated = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (Math.random() > 0.5) {
      // 중복 아닐 경우
      if (valid) setState('filled');
      else setState('error');
    } else {
      // 증복일 경우
      setState('error');
    }
    alert('중복 체크');
  };

  const changeTextTypeToText = (e: React.MouseEvent<SVGElement, MouseEvent> | React.TouchEvent<SVGElement>) => {
    e.preventDefault();
    setTextType('text');
  };

  const changeTextTypeToPW = (e: React.MouseEvent<SVGElement, MouseEvent> | React.TouchEvent<SVGElement>) => {
    e.preventDefault();
    setTextType('password');
  };

  const XCircle = () => {
    return (
      <img
        src="../../designImage/textField/XCircle.png"
        width="24px"
        height="24px"
        onMouseDown={() => {
          setValue('');
        }}
      />
    );
  };

  useEffect(() => {
    if (type === 'password') setTextType('password');
  }, []);

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
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={ref}
        tabIndex={rest.tabIndex || 0}
      >
        {state === 'default' && (
          <>
            <PlaceHolder>{placeholder}</PlaceHolder>
            {isCheckDuplicated && <CheckDuplicated onMouseDown={onCheckDuplicated}>중복 확인</CheckDuplicated>}
          </>
        )}
        {state === 'hover' && (
          <>
            <PlaceHolder>{placeholder}</PlaceHolder>
            {isCheckDuplicated && <CheckDuplicated onMouseDown={onCheckDuplicated}>중복 확인</CheckDuplicated>}
          </>
        )}
        {state === 'focused' && (
          <>
            <MessageBox isCheckDuplicated={isCheckDuplicated}>
              {helpMessage && <HelpMessage>{helpMessage}</HelpMessage>}
              <Input
                value={value}
                onChange={
                  rest.onChange
                    ? rest.onChange
                    : (e: React.ChangeEvent<HTMLInputElement>) => {
                        setValue(e.target.value);
                      }
                }
                type={textType}
                autoFocus
              />
            </MessageBox>
            {textType === 'password' ? (
              <EyeIconWrapper>
                <EyeIcon onMouseDown={changeTextTypeToText} onTouchStart={changeTextTypeToText} type="on" />
                <XCircle />
              </EyeIconWrapper>
            ) : textType === 'text' ? (
              <EyeIconWrapper>
                {isCheckDuplicated && <CheckDuplicated onMouseDown={onCheckDuplicated}>중복 확인</CheckDuplicated>}
                <EyeIcon onMouseDown={changeTextTypeToPW} onTouchStart={changeTextTypeToPW} type="off" />
                <XCircle />
              </EyeIconWrapper>
            ) : (
              <EyeIconWrapper>
                {isCheckDuplicated && <CheckDuplicated onMouseDown={onCheckDuplicated}>중복 확인</CheckDuplicated>}
                <XCircle />
              </EyeIconWrapper>
            )}
          </>
        )}
        {state === 'typing' && (
          <>
            <MessageBox isCheckDuplicated={isCheckDuplicated}>
              {helpMessage && <HelpMessage>{helpMessage}</HelpMessage>}
              <Input {...rest} />
            </MessageBox>
            <XCircle />
          </>
        )}
        {state === 'filled' && (
          <>
            <IconWrapper>
              <CorrectText type={textType} value={value} disabled></CorrectText>
              {textType === 'password' && (
                <EyeIconWrapper>
                  {isCheckDuplicated && <CheckDuplicated onMouseDown={onCheckDuplicated}>중복 확인</CheckDuplicated>}
                  <EyeIcon onMouseDown={changeTextTypeToText} onTouchStart={changeTextTypeToText} type="on" />
                  {!isCheckDuplicated && valid ? (
                    <img src="../../designImage/textField/CheckCircle96.png" width="24px" height="24px" />
                  ) : (
                    <img src="../../designImage/textField/AlertCircle.png" width="24px" height="24px" />
                  )}
                </EyeIconWrapper>
              )}
              {textType === 'text' && (
                <EyeIconWrapper>
                  {isCheckDuplicated && <CheckDuplicated onMouseDown={onCheckDuplicated}>중복 확인</CheckDuplicated>}
                  <EyeIcon onMouseDown={changeTextTypeToPW} onTouchStart={changeTextTypeToPW} type="off" />
                  {!isCheckDuplicated && valid ? (
                    <img src="../../designImage/textField/CheckCircle96.png" width="24px" height="24px" />
                  ) : (
                    <img src="../../designImage/textField/AlertCircle.png" width="24px" height="24px" />
                  )}
                  {isCheckDuplicated && valid && (
                    <CheckDuplicatedValidation valid={true} onMouseDown={onCheckDuplicated}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                        <path
                          d="M8 15C12.1421 15 15.5 11.6421 15.5 7.5C15.5 3.35786 12.1421 0 8 0C3.85786 0 0.5 3.35786 0.5 7.5C0.5 11.6421 3.85786 15 8 15Z"
                          fill="white"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M10.8536 5.77145C11.0488 5.96671 11.0488 6.28329 10.8536 6.47855L7.41605 9.91605C7.22079 10.1113 6.90421 10.1113 6.70895 9.91605L5.14645 8.35355C4.95118 8.15829 4.95118 7.84171 5.14645 7.64645C5.34171 7.45118 5.65829 7.45118 5.85355 7.64645L7.0625 8.85539L10.1464 5.77145C10.3417 5.57618 10.6583 5.57618 10.8536 5.77145Z"
                          fill="#D85888"
                        />
                      </svg>
                      중복 확인
                    </CheckDuplicatedValidation>
                  )}
                  {isCheckDuplicated && !valid && (
                    <CheckDuplicatedValidation valid={false} onMouseDown={onCheckDuplicated}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M8 15.5C12.1421 15.5 15.5 12.1421 15.5 8C15.5 3.85786 12.1421 0.5 8 0.5C3.85786 0.5 0.5 3.85786 0.5 8C0.5 12.1421 3.85786 15.5 8 15.5Z"
                          fill="white"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.5 11C7.5 10.7239 7.72219 10.5 7.99628 10.5H8.00372C8.27781 10.5 8.5 10.7239 8.5 11C8.5 11.2761 8.27781 11.5 8.00372 11.5H7.99628C7.72219 11.5 7.5 11.2761 7.5 11Z"
                          fill="#EA0909"
                          fill-opacity="0.7"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M8 4.5C8.27614 4.5 8.5 4.72386 8.5 5V8C8.5 8.27614 8.27614 8.5 8 8.5C7.72386 8.5 7.5 8.27614 7.5 8V5C7.5 4.72386 7.72386 4.5 8 4.5Z"
                          fill="#EA0909"
                          fill-opacity="0.7"
                        />
                      </svg>
                      중복 확인
                    </CheckDuplicatedValidation>
                  )}
                </EyeIconWrapper>
              )}

              {textType === 'default' && (
                <>
                  {!isCheckDuplicated && valid && (
                    <img src="../../designImage/textField/CheckCircle96.png" width="24px" height="24px" />
                  )}
                  {!isCheckDuplicated && !valid && (
                    <img src="../../designImage/textField/AlertCircle.png" width="24px" height="24px" />
                  )}
                  {isCheckDuplicated && valid && (
                    <CheckDuplicatedValidation valid={true} onMouseDown={onCheckDuplicated}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                        <path
                          d="M8 15C12.1421 15 15.5 11.6421 15.5 7.5C15.5 3.35786 12.1421 0 8 0C3.85786 0 0.5 3.35786 0.5 7.5C0.5 11.6421 3.85786 15 8 15Z"
                          fill="white"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M10.8536 5.77145C11.0488 5.96671 11.0488 6.28329 10.8536 6.47855L7.41605 9.91605C7.22079 10.1113 6.90421 10.1113 6.70895 9.91605L5.14645 8.35355C4.95118 8.15829 4.95118 7.84171 5.14645 7.64645C5.34171 7.45118 5.65829 7.45118 5.85355 7.64645L7.0625 8.85539L10.1464 5.77145C10.3417 5.57618 10.6583 5.57618 10.8536 5.77145Z"
                          fill="#D85888"
                        />
                      </svg>
                      중복 확인
                    </CheckDuplicatedValidation>
                  )}
                  {isCheckDuplicated && !valid && (
                    <CheckDuplicatedValidation valid={false} onMouseDown={onCheckDuplicated}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M8 15.5C12.1421 15.5 15.5 12.1421 15.5 8C15.5 3.85786 12.1421 0.5 8 0.5C3.85786 0.5 0.5 3.85786 0.5 8C0.5 12.1421 3.85786 15.5 8 15.5Z"
                          fill="white"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.5 11C7.5 10.7239 7.72219 10.5 7.99628 10.5H8.00372C8.27781 10.5 8.5 10.7239 8.5 11C8.5 11.2761 8.27781 11.5 8.00372 11.5H7.99628C7.72219 11.5 7.5 11.2761 7.5 11Z"
                          fill="#EA0909"
                          fill-opacity="0.7"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M8 4.5C8.27614 4.5 8.5 4.72386 8.5 5V8C8.5 8.27614 8.27614 8.5 8 8.5C7.72386 8.5 7.5 8.27614 7.5 8V5C7.5 4.72386 7.72386 4.5 8 4.5Z"
                          fill="#EA0909"
                          fill-opacity="0.7"
                        />
                      </svg>
                      중복 확인
                    </CheckDuplicatedValidation>
                  )}
                </>
              )}
            </IconWrapper>
          </>
        )}
        {state === 'error' && (
          <>
            <ErrorText type={textType} value={value} disabled></ErrorText>
            {textType === 'password' && (
              <EyeIconWrapper>
                <EyeIcon onMouseDown={changeTextTypeToText} onTouchStart={changeTextTypeToText} type="on" />
                <img src="../../designImage/textField/AlertCircle.png" width="24px" height="24px" />
              </EyeIconWrapper>
            )}
            {textType === 'text' && (
              <EyeIconWrapper>
                <EyeIcon onMouseDown={changeTextTypeToPW} onTouchStart={changeTextTypeToPW} type="off" />
                <img src="../../designImage/textField/AlertCircle.png" width="24px" height="24px" />
              </EyeIconWrapper>
            )}
            {textType === 'default' && !isCheckDuplicated && (
              <img src="../../designImage/textField/AlertCircle.png" width="24px" height="24px" />
            )}
            {textType === 'default' && isCheckDuplicated && (
              <CheckDuplicatedValidation valid={false} onMouseDown={onCheckDuplicated}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 15.5C12.1421 15.5 15.5 12.1421 15.5 8C15.5 3.85786 12.1421 0.5 8 0.5C3.85786 0.5 0.5 3.85786 0.5 8C0.5 12.1421 3.85786 15.5 8 15.5Z"
                    fill="white"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.5 11C7.5 10.7239 7.72219 10.5 7.99628 10.5H8.00372C8.27781 10.5 8.5 10.7239 8.5 11C8.5 11.2761 8.27781 11.5 8.00372 11.5H7.99628C7.72219 11.5 7.5 11.2761 7.5 11Z"
                    fill="#EA0909"
                    fill-opacity="0.7"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8 4.5C8.27614 4.5 8.5 4.72386 8.5 5V8C8.5 8.27614 8.27614 8.5 8 8.5C7.72386 8.5 7.5 8.27614 7.5 8V5C7.5 4.72386 7.72386 4.5 8 4.5Z"
                    fill="#EA0909"
                    fill-opacity="0.7"
                  />
                </svg>
                중복 확인
              </CheckDuplicatedValidation>
            )}
          </>
        )}

        {state === 'loading' && (
          <>
            <CorrectText>{value}</CorrectText>
            <img src="../../designImage/textField/Loading.png" width="28px" height="28px" />
          </>
        )}
      </TextFieldWrapper>

      {state === 'error' && (
        <ErrorMessageWrapper>
          <img src="../../designImage/textField/X.png" width="12px" height="12px" />
          <ErrorMessage>{errorMessage}</ErrorMessage>
        </ErrorMessageWrapper>
      )}
      {state === 'focused' && !valid && (
        <ErrorMessageWrapper>
          <img src="../../designImage/textField/AlertCircle.png" width="12px" height="12px" />
          <ErrorMessage>{validationMessage}</ErrorMessage>
        </ErrorMessageWrapper>
      )}
    </>
  );
}

export default TextFieldBox;