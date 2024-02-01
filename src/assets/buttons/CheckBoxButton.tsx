import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export interface CheckBoxButtonProps extends React.ComponentPropsWithoutRef<'button'>{
  buttontype: 'terms' | 'login';
  state: 'default' | 'pressed';
};

function CheckBoxButton(props: CheckBoxButtonProps){
  const {children, buttontype, state='default', ...rest} = props;
  
  const [buttonState, setButtonState] = useState(state);
  const toggleClick = () => {
    setButtonState((prevState) => 
    prevState === 'pressed' ? 'default' : 'pressed')
    console.log('clicked');
  };

  // 약관보기로 이동 - 일단 보류 
  const navigate = useNavigate();
  const handleArrowClick = () => {
    navigate('')
  }

  return <ButtonWrapper buttontype={buttontype}>
    <div onClick={toggleClick}>
      <ButtonImage buttontype={buttontype} state={buttonState}/>
    </div>
    <ButtonText 
      buttontype={buttontype}
      state={buttonState}>
      {buttontype === 'terms' ? '개인정보 수집, 이용목적 동의 약관' : '로그인 상태 유지'}
    </ButtonText>
    {buttontype === 'terms' ? <ArrowImage/> : undefined}
  </ButtonWrapper>

}

const ButtonWrapper = styled.button<{
  buttontype : 'terms'|'login'
}>`
  ${({buttontype}) => {
    switch(buttontype) {
      case 'terms':
        return `
        display: inline-flex;
        align-items: center;
        gap: 8px;
        `
      case 'login': 

        return `
        display: flex;
        width: 141px;
        height: 18px;
        justify-content: center;
        align-items: flex-start;
        gap: 5px;
        flex-shrink: 0;
        `
    }
  }}
`

const ButtonText = styled.div<{
  buttontype : 'terms'|'login'
  state: string
}>`
  ${({buttontype, state}) => {
    switch(buttontype){
      case 'terms':
        return `
        color: #141414;

        /* Medium Text */
        font-family: Pretendard;
        font-size: 18px;
        font-style: normal;
        font-weight: 700;
        line-height: 18px; /* 100% */
        
        `;
      case 'login':
        return `
        color: ${ state === 'default' ? 'var(--A8_Grey-4, #A8A8A8)' : '#D85888'};
        font-family: Pretendard;
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        line-height: 18px; /* 100% */

        `;
    }
  }}
`

const ButtonImage = (props: CheckBoxButtonProps):JSX.Element => {
  const {buttontype, state} = props;
  if (buttontype === 'terms' && state === 'default') {
    return (
      <svg style={{ width: '28px', height: '28px' }} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M13.9997 25.6663C20.443 25.6663 25.6663 20.443 25.6663 13.9997C25.6663 7.55635 20.443 2.33301 13.9997 2.33301C7.55635 2.33301 2.33301 7.55635 2.33301 13.9997C2.33301 20.443 7.55635 25.6663 13.9997 25.6663Z" stroke="#B9B9B9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M17.8891 11.083L12.5419 16.4302L10.1113 13.9997" stroke="#B9B9B9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>)
  }
  else if (buttontype === 'terms' && state === 'pressed') {
    return (
      <svg style={{width: '28px',
        height: '28px', fill: 'var(--White, #FFF)'}} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect width="28" height="28" fill="white"/>
        <path d="M13.9997 25.6663C20.443 25.6663 25.6663 20.443 25.6663 13.9997C25.6663 7.55635 20.443 2.33301 13.9997 2.33301C7.55635 2.33301 2.33301 7.55635 2.33301 13.9997C2.33301 20.443 7.55635 25.6663 13.9997 25.6663Z" fill="#D85888"/>
        <path d="M17.8891 11.083L12.5419 16.4302L10.1113 13.9997" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    )
  }
  else if (buttontype === 'login' && state === 'default') {
    return (
      <svg 
        style={{width: '18px',
        height: '18px',
        }} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="#A8A8A8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    )
  }
  else if (buttontype === 'login' && state === 'pressed') {
    return (
      <svg style = {{
        width: '18px',
        height: '18px',
        fill: 'var(--White, #FFF)'
      }} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect width="18" height="18" fill="white"/>
        <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" fill="#D85888" stroke="#D85888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M11.5 7.125L8.0625 10.5625L6.5 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    )
  }
  else {
    return <></>;
  }
}

// 이걸 누르면 개인정보 약관 페이지로 이동할 수 있도록 
const ArrowImage = () => {

  return <div style={{
    display: 'flex',
    width: '28px',
    height: '28px',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <svg style={{
      width: '28px',
      height: '28px',
      flexShrink: '0'
    }} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M12.1329 17.2666L15.8662 13.9999" stroke="#141414" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M15.8662 14L12.1329 10.2667" stroke="#141414" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
}

const TermsCheckButton = ():JSX.Element => {
  return <CheckBoxButton buttontype="terms" state='default'/>
}

const LoginStayCheckButton = ():JSX.Element => {
  return <CheckBoxButton buttontype="login" state='default'/>
}

export {TermsCheckButton, LoginStayCheckButton};

