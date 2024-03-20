import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import EyeIcon from './icons/NewEyeIcon';

interface TextFieldBoxProps {
  placeholder?: string;
  helpMessage?: string;
  errorMessage?: string;
  typingInvalidMessage?: string;
  duplicatedMessage?: string;
  type?: 'password' | 'text' | '';
  value: string;
  setValue: (value: string) => void;
  validateInput: (value: string) => boolean; // input value를 받아서 값 유효 여부를 반환하는 함수
  checkDuplicateInput?: ((value: string) => boolean) | null; // input value를 받아서 값 중복 여부를 반환하는 함수
}

function NewTextFieldBox({
  placeholder = '',
  helpMessage = '',
  errorMessage = '',
  typingInvalidMessage = '',
  duplicatedMessage = '',
  type = '',
  value,
  setValue,
  validateInput,
  checkDuplicateInput = null,
}: TextFieldBoxProps) {
  const [inputState, setInputState] = useState<'invalid' | 'duplicated' | 'validInputUnchecked' | 'valid' | 'default'>(
    'default',
  );
  const [textFieldState, setTextFieldState] = useState<('focused' | 'default' | 'valid' | 'invalid')[]>(['default']);
  const [showHelpMessage, setShowHelpMessage] = useState<boolean>(false);
  const [inputType, setInputType] = useState<'password' | 'text' | ''>(type);

  const inputRef = useRef<HTMLInputElement>(null);
  const checkState = (val: string, isChange: boolean = false) => {
    if (validateInput(val)) {
      // input 값은 유효하지만 중복체크를 하지 않은 상태
      if (checkDuplicateInput && inputState !== 'duplicated') {
        setInputState('validInputUnchecked');
      } else if (inputState === 'duplicated') {
        if (isChange) setInputState('validInputUnchecked');
      }
      // input 값이 유효하고, 중복체크할 필요가 없는 상태
      else {
        setInputState('valid');
        setTextFieldState([...textFieldState.filter((el: string) => el !== 'valid' && el !== 'invalid'), 'valid']);
      }
    }
    // input 값이 유효하지 않은 상태
    else {
      setInputState('invalid');
      setTextFieldState([...textFieldState.filter((el: string) => el !== 'invalid' && el !== 'valid'), 'invalid']);
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    checkState(e.target.value, true);
  };

  const toggleClick = () => {
    if (inputType === 'password') setInputType('text');
    else if (inputType === 'text') setInputType('password');
  };

  const onCheckDuplicated = (value: string) => {
    if (checkDuplicateInput && inputState === 'validInputUnchecked') {
      const isDuplicated = checkDuplicateInput(value);
      if (isDuplicated) {
        setInputState('duplicated');
        setTextFieldState([...textFieldState.filter((el: string) => el !== 'invalid' && el !== 'valid'), 'invalid']);
      } else {
        setInputState('valid');
        setTextFieldState([...textFieldState.filter((el: string) => el !== 'invalid' && el !== 'valid'), 'valid']);
      }
    }
  };

  useEffect(() => {
    // 최초 로딩시 값 유효성 여부에 따라 TextField 상태 지정
    if (value) {
      checkState(value);
    }
  }, []);

  return (
    <TextFieldBoxContainer>
      <TextFieldBoxWrapper className={textFieldState.join(' ')}>
        <TextField>
          {showHelpMessage && <span>{helpMessage}</span>}
          <input
            ref={inputRef}
            type={inputType}
            placeholder={placeholder}
            value={value}
            onFocus={() => {
              setTextFieldState([
                ...textFieldState.filter((el: string) => el !== 'focused' && el !== 'default'),
                'focused',
              ]);
              setShowHelpMessage(true);
            }}
            onBlur={() => {
              setShowHelpMessage(false);
              checkState(value);
              setTextFieldState([
                ...textFieldState.filter((el: string) => el !== 'default' && el !== 'focused'),
                'default',
              ]);
            }}
            onChange={onInputChange}
          />
        </TextField>
        <ButtonField>
          {checkDuplicateInput !== null && (
            <CheckDuplicated
              onMouseDown={() => {
                onCheckDuplicated(value);
              }}
            >
              중복 확인
            </CheckDuplicated>
          )}
          {inputType !== '' && type === 'password' && <EyeIcon inputType={inputType} toggleClick={toggleClick} />}

          {inputState === 'valid' && <img src="../../designImage/textField/CheckCircle96.png" />}
          {inputState === 'invalid' && <img src="../../designImage/textField/AlertCircle.png" />}
          {textFieldState.includes('focused') && (
            <img
              src="../../designImage/textField/XCircle.png"
              onMouseDown={() => {
                setValue('');
                checkState('');
              }}
            />
          )}
        </ButtonField>
      </TextFieldBoxWrapper>{' '}
      {textFieldState.includes('default') && inputState === 'invalid' && errorMessage !== '' && (
        <ErrorMessageWrapper>
          <img src="../../designImage/textField/X.png" width="12px" height="12px" />
          {errorMessage}
        </ErrorMessageWrapper>
      )}
      {inputState === 'duplicated' && duplicatedMessage !== '' && (
        <ErrorMessageWrapper>
          <img src="../../designImage/textField/X.png" width="12px" height="12px" />
          {duplicatedMessage}
        </ErrorMessageWrapper>
      )}
      {textFieldState.includes('focused') && inputState === 'invalid' && typingInvalidMessage !== '' && (
        <ErrorMessageWrapper>
          <img src="../../designImage/textField/AlertCircle.png" width="12px" height="12px" />
          {typingInvalidMessage}
        </ErrorMessageWrapper>
      )}
    </TextFieldBoxContainer>
  );
}

const TextFieldBoxContainer = styled.div`
  width: 100%;
`;

const TextFieldBoxWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 3.542vw;
  padding: 0.521vw 0.9375vw;
  gap: 0.521vw; //10px;
  border-radius: 0.521vw; //10px;
  box-sizing: border-box;

  &.default {
    border: 1px solid #b9b9b9;
  }

  &.focused {
    border: 1px solid #d85888;
    background: rgba(216, 88, 136, 0.05);
  }

  &.valid {
    border: 1px solid #d85888;

    & input {
      color: #d85888;
    }
  }

  &.invalid {
    border: 1px solid #ea0909;
  }
`;

const TextField = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  font-family: 'Pretendard';
  font-weight: 400;

  & > span {
    flex-grow: 1;
    color: #d85888;

    /* Details */
    font-size: 0.625vw;
  }

  & > input {
    padding: 0;
    width: 100%;
    border: none;
    flex-grow: 4;
    color: #141414;
    font-size: 0.9375vw;
    opacity: 0.8;

    &:focus {
      outline: none;
      background: none;
    }

    &::placeholder {
      color: #b9b9b9;
      font-weight: 500;
    }
  }
`;

const ButtonField = styled.div`
  position: absolute;
  top: 50%; /* 원하는 위치로 조정합니다. */
  right: 0; /* 오른쪽에 붙이기 위해 설정합니다. */
  transform: translate(0, -50%); /* 세로 가운데 정렬을 위해 사용합니다. */
  margin-right: 5%; /* WrapperDiv 오른쪽에 붙이기 위해 설정합니다. */

  z-index: 1;
  background: none;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  & > img {
    margin-left: 0.521vw; //10px;
    width: 1.3vw;
    height: 1.3vw;
  }

  & > button {
    margin-left: 0.521vw; //10px;
  }
`;

const ErrorMessageWrapper = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  padding-left: 0.9375vw;
  box-sizing: border-box;

  color: #ea0909;

  /* Details */
  font-family: 'Pretendard';
  font-size: 0.625vw;

  font-weight: 400;
  opacity: 0.8;
  margin-top: 0.2083vw;
  & > img {
    width: 0.625vw;
    height: 0.625vw;
    margin-right: 0.2083vw;
  }
`;

const CheckDuplicated = styled.button`
  display: flex;
  box-sizing: border-box;
  //width: 65px;
  width: 3.385vw;
  //height: 24px;
  height: 1.25vw;
  //padding: 4px 5px;
  padding: 0.208vw 0.26vw;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: #d85888;

  border: 0.053vw solid #d85888;
  border-radius: 999px;
  text-align: center;
  font-family: 'Pretendard';
  font-size: 0.625vw; //12px;
  font-style: normal;
  font-weight: 500;
`;
export default NewTextFieldBox;
