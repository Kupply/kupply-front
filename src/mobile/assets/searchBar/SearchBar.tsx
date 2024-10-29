import React, { useRef } from 'react';
import { styled } from 'styled-components';

export interface SearchBarProps {
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  onSearch: () => void;
}

function SearchBar({ value, setValue, placeholder = '관심 학부 검색하기', onSearch }: SearchBarProps) {
  const ref: React.MutableRefObject<HTMLInputElement | null> = useRef(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      onSearch(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  return (
    <Container onKeyDown={handleOnKeyPress}>
      <InputBox>
        <SvgContainer>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.2002 10.8C2.2002 6.0503 6.05055 2.19995 10.8002 2.19995C15.5498 2.19995 19.4002 6.0503 19.4002 10.8C19.4002 13.1227 18.4794 15.2303 16.9829 16.7778C16.9446 16.8064 16.9079 16.8381 16.8731 16.8728C16.8383 16.9076 16.8066 16.9443 16.778 16.9826C15.2306 18.4791 13.1229 19.4 10.8002 19.4C6.05055 19.4 2.2002 15.5496 2.2002 10.8ZM17.5552 18.9692C15.7211 20.4875 13.3672 21.4 10.8002 21.4C4.94598 21.4 0.200195 16.6542 0.200195 10.8C0.200195 4.94573 4.94598 0.199951 10.8002 0.199951C16.6544 0.199951 21.4002 4.94573 21.4002 10.8C21.4002 13.367 20.4877 15.7208 18.9694 17.555L23.5073 22.0928C23.8978 22.4834 23.8978 23.1165 23.5073 23.5071C23.1168 23.8976 22.4836 23.8976 22.0931 23.5071L17.5552 18.9692Z"
              fill="#B9B9B9"
            />
          </svg>
        </SvgContainer>
        <Input ref={ref} value={value} onChange={onChange} placeholder={placeholder} />
      </InputBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  margin-top: 4px;
  flex-direction: row;
  gap: 0px;
  width: 95%;
  //max-width: 328px;
  z-index: 2;

  box-shadow: 0px 10px 30px 0px rgba(20, 20, 20, 0.05);

  &,
  & div,
  & input {
    height: 10vw;
  }
`;

const InputBox = styled.div`
  width: 100%;
  //max-width: 328px;
  height: 10vw;
  position: relative;

  & > button {
    position: absolute;
    top: 51%;
    left: 95%; // 우측 여백 조절
    transform: translateY(-49%);
    cursor: pointer;

    left: 90%;
  }
`;

const SvgContainer = styled.div`
  display: flex;
  align-items: center;
  width: 70px;
  height: 80px;

  margin-left: 1.5vw;
  position: absolute;

  & > svg {
    width: 3vw;
    height: 3vw;
  }
`;

const Input = styled.input`
  width: 100%;
  max-width: 1382px;
  box-sizing: border-box;
  height: 22.22vw;
  padding-left: 5vw;
  border-radius: 5px;

  box-shadow: 0px 10px 30px 0px rgba(20, 20, 20, 0.05);
  font-size: 3.61vw;

  transition: 0.3s ease-in-out;
  &::placeholder {
    color: #a8a8a8;
    font-family: Pretendard;
    font-size: 3.61vw;
    font-style: normal;
    font-weight: 500;
    opacity: 0.8;
  }
  &:hover {
    border: 1px solid rgba(216, 88, 136, 0.2);
    box-shadow: 0px 10px 30px 0px rgba(216, 88, 136, 0.1);
  }

  &:focus {
    border: 1px solid var(--Primary-V, #e85888);
    border-radius: 2px;

    box-shadow: 0px 10px 30px 0px rgba(232, 88, 136, 0.15);
    outline: none;

    background: #ffffff;

    outline-style: solid;
    outline-color: rgba(232, 88, 136, 0.15);
    outline-width: 4px;
  }

  color: #141414;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  padding-left: 6vw;
  font-size: 3vw;
  background: #f3f3f3;

  &::placeholder {
    font-size: 3vw;
  }
`;

export default SearchBar;
