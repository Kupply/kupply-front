import styled from 'styled-components';
import React from 'react';

export interface CheckBoxButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  isChecked: boolean;
  onCustomFunction: (args0: boolean) => void;
  textSize?: string;
  textBold?: string;
}

// SignUp5Page에서 잘 작동
const CheckBoxButton01 = (props: CheckBoxButtonProps) => {
  const { children, isChecked, onCustomFunction, textSize, textBold, ...rest } = props;

  return (
    <ButtonWrapper01 {...rest}>
      <button onClick={() => onCustomFunction(!isChecked)}>
        <ButtonImage01 isChecked={isChecked} />
      </button>
      <ButtonText01 style={{ fontSize: `${textSize}`, fontWeight: `${textBold}` }}>{children}</ButtonText01>
    </ButtonWrapper01>
  );
};

const CheckBoxButton02 = (props: CheckBoxButtonProps) => {
  const { children, isChecked, onCustomFunction, textSize, textBold, ...rest } = props;
  return (
    <ButtonWrapper02 {...rest}>
      <button onClick={() => onCustomFunction(!isChecked)}>
        <ButtonImage02 isChecked={isChecked} />
      </button>
      <ButtonText02 style={{ fontSize: `${textSize}`, fontWeight: `${textBold}` }} isChecked={isChecked}>
        {children}
      </ButtonText02>
    </ButtonWrapper02>
  );
};

/* ****************************************************** */

const ButtonWrapper01 = styled.button`
  //display: inline-flex;
  //align-items: center;
  //gap: 8px;
  display: flex;
  gap: 8px;
  align-items: center;
  //margin-top: 22px;
  //margin-bottom: 22px;
`;

const ButtonText01 = styled.text`
  color: #141414;
  /* Medium Text */
  font-family: Pretendard;
  //font-size: 18px;
  font-size: 0.94vw;
  font-style: normal;
  font-weight: 700;
  line-height: 18px; /* 100% */
`;

const ButtonImage01 = ({ isChecked }: { isChecked: boolean }): JSX.Element => {
  if (isChecked === false) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="1.458vw" height="28" viewBox="0 0 28 28" fill="none">
        <path
          d="M13.9997 25.6663C20.443 25.6663 25.6663 20.443 25.6663 13.9997C25.6663 7.55635 20.443 2.33301 13.9997 2.33301C7.55635 2.33301 2.33301 7.55635 2.33301 13.9997C2.33301 20.443 7.55635 25.6663 13.9997 25.6663Z"
          stroke="#B9B9B9"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M17.8891 11.083L12.5419 16.4302L10.1113 13.9997"
          stroke="#B9B9B9"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  } else {
    return (
      <svg
        style={{ fill: 'var(--White, #FFF)' }}
        xmlns="http://www.w3.org/2000/svg"
        width="1.458vw"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
      >
        <rect width="28" height="28" fill="white" />
        <path
          d="M13.9997 25.6663C20.443 25.6663 25.6663 20.443 25.6663 13.9997C25.6663 7.55635 20.443 2.33301 13.9997 2.33301C7.55635 2.33301 2.33301 7.55635 2.33301 13.9997C2.33301 20.443 7.55635 25.6663 13.9997 25.6663Z"
          fill="#D85888"
        />
        <path
          d="M17.8891 11.083L12.5419 16.4302L10.1113 13.9997"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  }
};

export const ArrowImage = () => {
  return (
    <div
      style={{
        display: 'flex',
        //width: '28px',
        width: '1.46vw',
        height: '28px',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path
          d="M12.1329 17.2666L15.8662 13.9999"
          stroke="#141414"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15.8662 14L12.1329 10.2667"
          stroke="#141414"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
};

const ButtonWrapper02 = styled.button`
  display: flex;
  //width: 141px;
  width: fit-content;
  height: 18px;
  justify-content: center;
  align-items: flex-start;
  gap: 5px;
  flex-shrink: 0;
`;

const ButtonText02 = styled.text<{ isChecked: boolean }>`
  color: ${(props) => (props.isChecked === false ? 'var(--A8_Grey-4, #A8A8A8)' : '#D85888')};
  font-family: Pretendard;
  //font-size: 18px;
  font-size: 0.94vw;
  font-style: normal;
  font-weight: 600;
  line-height: 18px; /* 100% */
`;

const ButtonImage02 = ({ isChecked }: { isChecked: boolean }): JSX.Element => {
  if (!isChecked) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="0.9375vw" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z"
          stroke="#A8A8A8"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  } else {
    return (
      <svg
        style={{
          fill: 'var(--White, #FFF)',
        }}
        xmlns="http://www.w3.org/2000/svg"
        width="0.9375vw"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
      >
        <rect width="18" height="18" fill="white" />
        <path
          d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z"
          fill="#D85888"
          stroke="#D85888"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11.5 7.125L8.0625 10.5625L6.5 9"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  }
};

export { CheckBoxButton01, CheckBoxButton02 };
