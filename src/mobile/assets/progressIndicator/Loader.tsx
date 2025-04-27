import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { client } from '../../../utils/HttpClient';

type StateOptions = 'default' | 'hover' | 'loading' | 'filled' | 'error';

// state: filled {/* svg 이미지 확인 */}

const baseButton = css`
  height: 6.11vw; // 22px;
  gap: 0.56vw; // 2px;
  padding: 2.22vw 2.78vw; // 8px 10px;
  justify-content: center;
  align-items: center;
  border-radius: 999px;
`;

export interface NicknameCheckButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  state: StateOptions;
  nickname: string;
  setState: (value: StateOptions) => void;
}

export interface NicknameCheckButtonTextProps extends React.ComponentPropsWithoutRef<'div'> {
  children: string;
  state: StateOptions;
}

const NicknameCheckButtonComponent = styled.button<NicknameCheckButtonProps>`
  ${baseButton}
  ${(props) => stateMapping[props.state || 'default']}
`;

const NicknameCheckButtonTextComponent = styled.div<NicknameCheckButtonTextProps>`
  ${(props) => textStateMapping[props.state || 'default']}
  white-space: nowrap;
`;

// isSuccess가 success이면 성공, fail이면 실패이다.
export const nicknameCheckAPI = async (nickname: string) => {
  // const url = 'http://localhost:8080/auth/nicknameCheck'; // 만든 API 주소로 바뀌어야 함.
  try {
    // const response = await axios.post(url, {
    //   nickname: nickname,
    // });

    const response = await client.post('/auth/nicknameCheck', {
      nickname: nickname,
    });

    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
};

function MobileNicknameCheckButton(props: NicknameCheckButtonProps) {
  const { state = 'default', setState, nickname = '' } = props;

  const onMouseEnter = () => {
    if (state === 'default') {
      setState('hover');
    }
  };

  const onMouseLeave = () => {
    if (state === 'hover') {
      setState('default');
    }
  };

  const onMouseDown = async () => {
    if (state === 'hover' || state === 'default') {
      setState('loading');

      const APIResponse = await nicknameCheckAPI(nickname);

      setTimeout(() => {
        if (APIResponse?.data.isSuccess === true) setState('filled');
        else setState('error');
      }, 1000);
    }
  };

  return (
    <>
      <NicknameCheckButtonComponent
        state={state}
        nickname={nickname}
        setState={setState}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseDown={onMouseDown}
      >
        {state === 'loading' ? (
          <LoadingImage xmlns="http://www.w3.org/2000/svg" width="5vw" height="18" viewBox="0 0 18 18" fill="none">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9 3.375C7.50816 3.375 6.07742 3.96763 5.02252 5.02252C3.96763 6.07742 3.375 7.50816 3.375 9C3.375 10.4918 3.96763 11.9226 5.02252 12.9775C6.07742 14.0324 7.50816 14.625 9 14.625C10.4918 14.625 11.9226 14.0324 12.9775 12.9775C14.0324 11.9226 14.625 10.4918 14.625 9C14.625 7.50816 14.0324 6.07742 12.9775 5.02252C11.9226 3.96763 10.4918 3.375 9 3.375ZM1.125 9C1.125 4.65075 4.65075 1.125 9 1.125C13.3492 1.125 16.875 4.65075 16.875 9C16.875 13.3492 13.3492 16.875 9 16.875C4.65075 16.875 1.125 13.3492 1.125 9Z"
              fill="#D85888"
              fill-opacity="0.2"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.99964 3.37501C7.5494 3.37175 6.15458 3.93188 5.10939 4.93726C4.89285 5.13748 4.60634 5.24466 4.31156 5.23572C4.01677 5.22678 3.73728 5.10245 3.53326 4.88948C3.32925 4.67652 3.21701 4.39195 3.22073 4.09706C3.22445 3.80216 3.34382 3.52051 3.55314 3.31276C5.01708 1.9061 6.96942 1.12189 8.99964 1.12501C9.29801 1.12501 9.58416 1.24354 9.79513 1.45451C10.0061 1.66549 10.1246 1.95164 10.1246 2.25001C10.1246 2.54838 10.0061 2.83453 9.79513 3.0455C9.58416 3.25648 9.29801 3.37501 8.99964 3.37501Z"
              fill="#D85888"
            />
          </LoadingImage>
        ) : state === 'filled' ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="4.44vw" height="15" viewBox="0 0 16 15" fill="none">
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
        ) : state === 'error' ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="4.44vw" height="16" viewBox="0 0 16 16" fill="none">
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
        ) : (
          <></>
        )}
        <NicknameCheckButtonTextComponent state={state}>중복 확인</NicknameCheckButtonTextComponent>
      </NicknameCheckButtonComponent>
    </>
  );
}

const defaultButtonStyle = css`
  display: flex;
  border: 1px solid #d85888;
  width: 15.28vw; // 55px;
`;

const hoverButtonStyle = css`
  display: flex;
  background: rgba(216, 88, 136, 0.1);
  width: 15.28vw; // 55px;
`;

const filledButtonStyle = css`
  display: flex;
  width: 18.61vw; //67px;
  background: #d85888;
  color: white;
  transition: all 0.3s ease 0s;
`;

const errorButtonStyle = css`
  display: flex;
  width: 18.61vw; //67px;
  background: rgba(234, 9, 9, 0.7);
  color: white;
  transition: all 0.3s ease 0s;
`;

const loadingButtonStyle = css`
  display: flex;
  background: rgba(216, 88, 136, 0.1);
  width: 18.61vw; //67px;
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
  animation: ${loadingMove} 0.25s ease, ${loadingRotate} 1s linear infinite, forwards;
`;

const ButtonText = css`
  position: relative;
  width: 10.56vw; // 38px;
  z-index: 999;
  color: #d85888;
  text-align: center;
  font-family: Pretendard;
  font-size: 2.78vw; // 10px
  font-style: normal;
  font-weight: 500;
  white-space: nowrap;
`;

const CompleteButtonText = css`
  color: white;
  text-align: center;
  font-family: Pretendard;
  font-size: 2.78vw; // 10px
  font-style: normal;
  font-weight: 500;
`;

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

export default MobileNicknameCheckButton;
