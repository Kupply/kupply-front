import styled from "styled-components";
import { useState } from "react";

export interface TextButtonProps extends React.ComponentPropsWithoutRef<'button'>{
  onCustomFunction: () => void;
  selected: boolean;
}

// RankingTable에서 제대로 작동 확인됨 Layout도 맞춤 
const TextButton01 = (props:React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { children, ...rest} = props;
  const [buttonState, setButtonState] = useState('default');
  const handleHover = () => {
    setButtonState('hover');
  }
  const handleHoverOut = () => {
    setButtonState('default');
  }

  return <Container01 onMouseOver={handleHover} onMouseLeave={handleHoverOut} {...rest}>
    <div style={{
      transform: 'revert(90)',
      flexShrink: '0',
      boxSizing: 'border-box',
    }}>
      {buttonState === 'default' ? 
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M9.80622 14.4737L12.4729 11.8071C12.535 11.7449 12.5843 11.6711 12.618 11.5899C12.6516 11.5087 12.6689 11.4217 12.6689 11.3338C12.6689 11.1562 12.5984 10.986 12.4729 10.8604C12.3473 10.7349 12.1771 10.6644 11.9996 10.6644C11.822 10.6644 11.6518 10.7349 11.5262 10.8604L9.99955 12.3938L9.99955 4.66709C9.99955 4.49027 9.92931 4.3207 9.80429 4.19568C9.67926 4.07066 9.50969 4.00042 9.33288 4.00042C9.15607 4.00042 8.9865 4.07066 8.86148 4.19568C8.73646 4.3207 8.66622 4.49027 8.66622 4.66708L8.66622 14.0004C8.66687 14.132 8.70648 14.2605 8.78003 14.3697C8.85359 14.4788 8.9578 14.5637 9.07955 14.6138C9.20096 14.6648 9.33477 14.6788 9.46409 14.6538C9.59342 14.6289 9.71247 14.5663 9.80622 14.4737ZM7.33288 11.3338L7.33288 2.00042C7.33223 1.8688 7.29263 1.74032 7.21907 1.63118C7.14551 1.52203 7.0413 1.4371 6.91955 1.38708C6.79814 1.33603 6.66433 1.32208 6.53501 1.347C6.40568 1.37192 6.28663 1.43458 6.19288 1.52708L3.52622 4.19375C3.46373 4.25573 3.41413 4.32946 3.38029 4.4107C3.34644 4.49194 3.32902 4.57908 3.32902 4.66708C3.32902 4.75509 3.34644 4.84223 3.38029 4.92347C3.41413 5.00471 3.46373 5.07844 3.52622 5.14042C3.58819 5.2029 3.66193 5.2525 3.74317 5.28635C3.82441 5.32019 3.91154 5.33762 3.99955 5.33762C4.08756 5.33762 4.1747 5.32019 4.25594 5.28635C4.33718 5.2525 4.41091 5.2029 4.47288 5.14042L5.99955 3.60708L5.99955 11.3338C5.99955 11.5106 6.06979 11.6801 6.19481 11.8052C6.31984 11.9302 6.48941 12.0004 6.66622 12.0004C6.84303 12.0004 7.0126 11.9302 7.13762 11.8052C7.26265 11.6801 7.33288 11.5106 7.33288 11.3338Z" fill="#A8A8A8"/>
    </svg> :
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M9.80622 14.4737L12.4729 11.8071C12.535 11.7449 12.5843 11.6711 12.618 11.5899C12.6516 11.5087 12.6689 11.4217 12.6689 11.3338C12.6689 11.1562 12.5984 10.986 12.4729 10.8604C12.3473 10.7349 12.1771 10.6644 11.9996 10.6644C11.822 10.6644 11.6518 10.7349 11.5262 10.8604L9.99955 12.3938L9.99955 4.66709C9.99955 4.49027 9.92931 4.3207 9.80429 4.19568C9.67926 4.07066 9.50969 4.00042 9.33288 4.00042C9.15607 4.00042 8.9865 4.07066 8.86148 4.19568C8.73646 4.3207 8.66622 4.49027 8.66622 4.66708L8.66622 14.0004C8.66687 14.132 8.70648 14.2605 8.78003 14.3697C8.85359 14.4788 8.9578 14.5637 9.07955 14.6138C9.20096 14.6648 9.33477 14.6788 9.46409 14.6538C9.59342 14.6289 9.71247 14.5663 9.80622 14.4737ZM7.33288 11.3338L7.33288 2.00042C7.33223 1.8688 7.29263 1.74032 7.21907 1.63118C7.14551 1.52203 7.0413 1.4371 6.91955 1.38708C6.79814 1.33603 6.66433 1.32208 6.53501 1.347C6.40568 1.37192 6.28663 1.43458 6.19288 1.52708L3.52622 4.19375C3.46373 4.25573 3.41413 4.32946 3.38029 4.4107C3.34644 4.49194 3.32902 4.57908 3.32902 4.66708C3.32902 4.75509 3.34644 4.84223 3.38029 4.92347C3.41413 5.00471 3.46373 5.07844 3.52622 5.14042C3.58819 5.2029 3.66193 5.2525 3.74317 5.28635C3.82441 5.32019 3.91154 5.33762 3.99955 5.33762C4.08756 5.33762 4.1747 5.32019 4.25594 5.28635C4.33718 5.2525 4.41091 5.2029 4.47288 5.14042L5.99955 3.60708L5.99955 11.3338C5.99955 11.5106 6.06979 11.6801 6.19481 11.8052C6.31984 11.9302 6.48941 12.0004 6.66622 12.0004C6.84303 12.0004 7.0126 11.9302 7.13762 11.8052C7.26265 11.6801 7.33288 11.5106 7.33288 11.3338Z" fill="#D85888"/>
  </svg>}
    </div>
    <Typography01 state={buttonState}>{children}</Typography01>
  </Container01>
}

// 작동 잘함 기존의 Header.tsx와 Layout 맞춤
const TextButton02 = (props:React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const {children, ...rest} = props;
  const [buttonState, setButtonState] = useState('default');
  const handleHover = () => {
    setButtonState('hover');
  }
  const handleHoverOut = () => {
    setButtonState('default');
  }
  return <Container02 onMouseOver={handleHover} onMouseLeave={handleHoverOut} {...rest}>
    <div style={{marginRight: '4px'}}>
      {buttonState === 'default' ? 
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0406 5.1259C13.6501 4.73538 13.0169 4.73538 12.6264 5.1259C12.2359 5.51643 12.2359 6.14959 12.6264 6.54011L15.0859 8.99963H7.5C6.94772 8.99963 6.5 9.44735 6.5 9.99963C6.5 10.5519 6.94772 10.9996 7.5 10.9996H15.086L12.6264 13.4592C12.2359 13.8498 12.2359 14.4829 12.6264 14.8734C13.0169 15.264 13.6501 15.264 14.0406 14.8734L18.2073 10.7068C18.5978 10.3163 18.5978 9.68309 18.2073 9.29257L14.0406 5.1259Z" fill="#141414"/>
        <path d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5" stroke="#141414" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg> :
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0406 5.1259C13.6501 4.73538 13.0169 4.73538 12.6264 5.1259C12.2359 5.51643 12.2359 6.14959 12.6264 6.54011L15.0859 8.99963H7.5C6.94772 8.99963 6.5 9.44735 6.5 9.99963C6.5 10.5519 6.94772 10.9996 7.5 10.9996H15.086L12.6264 13.4592C12.2359 13.8498 12.2359 14.4829 12.6264 14.8734C13.0169 15.264 13.6501 15.264 14.0406 14.8734L18.2073 10.7068C18.5978 10.3163 18.5978 9.68309 18.2073 9.29257L14.0406 5.1259Z" fill="#141414" fill-opacity="0.6"/>
        <path d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5" stroke="#141414" stroke-opacity="0.6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>}
    </div>
    <Typography02 state={buttonState}>{children}</Typography02>
  </Container02>
}

// 작동 잘함 기존의 Header와 Layout 맞춤
const TextButton03LNB = (props:React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const {children,  ...rest} = props;
  const [buttonState, setButtonState] = useState('default');
  const handleHover = () => {
    setButtonState('hover');
  }
  const handleHoverOut = () => {
    setButtonState('default');
  }

  return <Container03LNB onMouseOver={handleHover} onMouseLeave={handleHoverOut} {...rest}>
    <Typography03LNB state={buttonState}>{children}</Typography03LNB>
  </Container03LNB>
};

// 계정 삭제에 잘 작동되는 것 확인 Layout도 맞음 
const TextButton03Settings = (props:TextButtonProps) => {
  const {children, selected, onCustomFunction, ...rest} = props;
  const handleClick = () => {
    onCustomFunction();
  }
  return <Container03Settings onClick={handleClick} {...rest}>
    <Typography03Settings state={selected === true ? 'pressed' : 'default'}>{children}</Typography03Settings>
  </Container03Settings>
}

// 잘 작동, SettingsPage의 기존 Layout을 따를 수 있도록 justify-content left로 설정 
const TextButton04 = (props:TextButtonProps) => {
  const {children, selected, onCustomFunction} = props;
  const handleClick = () => {
    onCustomFunction();
  }
  return <Container04 onClick={handleClick}>
    <Typography04 state={selected === true ? 'pressed' : 'default'}>{children}</Typography04>
  </Container04>  
}

const TextButton05 = (props:Omit<TextButtonProps, 'selected'>) => {
  const {children, onCustomFunction, ...rest} = props;
  const [buttonState, setButtonState] = useState('default');
  // onClick시 navigate가 되어야 함
  const handleClick = () => {
    onCustomFunction();
    setButtonState('pressed');
  }
  const handleHover = () => {
    setButtonState('hover');
  }
  const handleHoverOut = () => {
    setButtonState('default');
  }
  

}
/* --------------------------------------------------------------- */ 
const Container01 = styled.button`
display: flex;
width: 113px;
height: 16px;
justify-content: center;
align-items: flex-start;
gap: 6px;
flex-shrink: 0;
box-sizing:border-box;
`

const Typography01 = styled.div<{state: string}>`
color: ${(props) => (props.state === 'default' ? 'var(--A8_Grey-4, #A8A8A8)' : '#D85888')};
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 16px; 
white-space: nowrap;
`
const Container02 = styled.button`
display: inline-flex;
align-items: flex-start;
gap: 4px;
box-sizing: border-box;
`;

const Typography02 = styled.div<{state: string}>`
color: ${(props) => props.state === 'default' ? '#141414' : 'rgba(20, 20, 20, 0.60)'};
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 500;
line-height: 20px;
`;

const Container03LNB = styled.button`
display: inline-flex;
align-items: flex-start;
gap: 4px;
`

const Typography03LNB = styled.div<{state: string}>`
color: ${(props) => props.state === 'default' ? '#141414' : 'rgba(20, 20, 20, 0.60)'};
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 500;
line-height: 20px; /* 100% */
`;

const Typography03Settings = styled.div<{state: string}>`
color: ${(props) => props.state === 'default' ? '#EA0909' : '#EE6767'};
text-shadow: 0px 4px 16px rgba(255, 255, 255, 0.33);
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 500;
line-height: 20px; /* 100% */
`;

const Container03Settings =  styled.button`
display: flex;
width: 75px;
height: 20px;
justify-content: center;
align-items: center;
flex-shrink: 0;
`;

const Container04 = styled.button`
display: flex;
width: 234px;
height: 20px;
justify-content: left; // 기존 Layout과 맞추기위해 left로 설정 
align-items: center;
flex-shrink: 0;
`;

const Typography04 = styled.div<{state: string}>`
color: #141414;
text-shadow: 0px 4px 16px rgba(255, 255, 255, 0.33);
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: ${(props) => props.state === 'default' ? '500' : '700'};
line-height: 20px; /* 100% */
`;

const Container05 = styled.button`
display: flex;
width: 54px;
height: 14px;
justify-content: center;
align-items: center;
flex-shrink: 0;
`;

export {TextButton01, TextButton02, TextButton03LNB, TextButton03Settings, TextButton04};

