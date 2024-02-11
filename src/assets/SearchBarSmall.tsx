import { useRef } from 'react';
import { styled } from 'styled-components';
import Icon02 from './icons/Icon02';

export interface SearchBarProps {
  value: string;
  setValue: (value: string) => void;
}

const SearchBarSmall = ({ value, setValue }: SearchBarProps) => {
  const ref: React.MutableRefObject<HTMLInputElement | null> = useRef(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <Container>
      <InputBox>
        <SvgContainer>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.2002 10.8C2.2002 6.0503 6.05055 2.19995 10.8002 2.19995C15.5498 2.19995 19.4002 6.0503 19.4002 10.8C19.4002 13.1227 18.4794 15.2303 16.9829 16.7778C16.9446 16.8064 16.9079 16.8381 16.8731 16.8728C16.8383 16.9076 16.8066 16.9443 16.778 16.9826C15.2306 18.4791 13.1229 19.4 10.8002 19.4C6.05055 19.4 2.2002 15.5496 2.2002 10.8ZM17.5552 18.9692C15.7211 20.4875 13.3672 21.4 10.8002 21.4C4.94598 21.4 0.200195 16.6542 0.200195 10.8C0.200195 4.94573 4.94598 0.199951 10.8002 0.199951C16.6544 0.199951 21.4002 4.94573 21.4002 10.8C21.4002 13.367 20.4877 15.7208 18.9694 17.555L23.5073 22.0928C23.8978 22.4834 23.8978 23.1165 23.5073 23.5071C23.1168 23.8976 22.4836 23.8976 22.0931 23.5071L17.5552 18.9692Z"
              fill="#B9B9B9"
            />
          </svg>
        </SvgContainer>
        <Input ref={ref} value={value} onChange={onChange} placeholder="관심 학부 검색하기" />
      </InputBox>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0px;
  width: 95%;
  border-radius: 999px;
  max-width: 402px;
  z-index: 2;

  box-shadow: 0px 10px 30px 0px rgba(20, 20, 20, 0.05);
`;

const InputBox = styled.div`
  width: 100%;
  height: 46px;
  position: relative;
`;

const SvgContainer = styled.div`
  position: absolute;
  top: 53%;
  left: 5%;
  transform: translateY(-47%);
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  padding-left: 45px;
  border-radius: 999px;
  box-shadow: 0px 10px 30px 0px rgba(20, 20, 20, 0.05);

  transition: 0.3s ease-in-out;
  &::placeholder {
    color: #a8a8a8;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    opacity: 0.8;
  }
  &:hover {
    border: 1px solid rgba(216, 88, 136, 0.2);
    box-shadow: 10px rgba(216, 88, 136, 0.15);
  }

  &:focus {
    border: 1px solid var(--Primary-V, #e85888);
    box-shadow: 10px 10px 30px 10px rgba(216, 88, 136, 0.1);
    outline: none;
  }

  color: #141414;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
`;

export default SearchBarSmall;
