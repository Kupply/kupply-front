import React from 'react';
import { useEffect, useState, MutableRefObject } from 'react';
import styled, { css } from 'styled-components';
import useDetectClose from './UseDetectClose';
import Typography, { TypographyProps } from '../OldTypography';

// 3. 화살표 버튼 나타나게 처리

export interface DropDownOption {
  value1: string /* 학과 */;
  value2: string /* 단과대학 */;
}

export interface DropDownProps {
  title: string;
  optionList: DropDownOption[];
  value: string;
  setValue: (str: string) => void;
}

export interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  isOpen: boolean;
  isSelected: boolean;
}

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  isSelectedValue: boolean;
}

export interface InputButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  isOpen: boolean;
  isSelected: boolean;
}

function DropDown({ title, optionList, value, setValue }: DropDownProps) {
  const [isOpen, ref, toggleIsOpen] = useDetectClose(false);
  const isSelected: boolean = !!value;

  /*
  const handleOptionChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("start");
    console.log((e.currentTarget as HTMLButtonElement).value);
    setSeletedValue((e.currentTarget as HTMLButtonElement).value);
    toggleIsOpen();
  };
  */

  return (
    <div style={{ width: '100%' }} ref={ref}>
      <DropDownBtn isOpen={isOpen} isSelected={isSelected} onClick={toggleIsOpen} type="button" value={value || title}>
        {value || title}
        <AngleDown isOpen={isOpen} isSelected={isSelected}>
          <svg width="1.458vw" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19.8333 10.6984C19.6147 10.4811 19.319 10.3591 19.0108 10.3591C18.7026 10.3591 18.4069 10.4811 18.1883 10.6984L14 14.8284L9.86998 10.6984C9.65139 10.4811 9.3557 10.3591 9.04748 10.3591C8.73926 10.3591 8.44357 10.4811 8.22498 10.6984C8.11563 10.8068 8.02884 10.9359 7.96961 11.078C7.91038 11.2202 7.87988 11.3727 7.87988 11.5267C7.87988 11.6807 7.91038 11.8332 7.96961 11.9754C8.02884 12.1176 8.11563 12.2466 8.22498 12.3551L13.1716 17.3017C13.2801 17.4111 13.4091 17.4979 13.5513 17.5571C13.6935 17.6163 13.846 17.6468 14 17.6468C14.154 17.6468 14.3065 17.6163 14.4487 17.5571C14.5908 17.4979 14.7199 17.4111 14.8283 17.3017L19.8333 12.3551C19.9427 12.2466 20.0295 12.1176 20.0887 11.9754C20.1479 11.8332 20.1784 11.6807 20.1784 11.5267C20.1784 11.3727 20.1479 11.2202 20.0887 11.078C20.0295 10.9359 19.9427 10.8068 19.8333 10.6984Z"
              fill={isOpen ? '#D85888' : '#B9B9B9'}
            />
          </svg>
        </AngleDown>
      </DropDownBtn>

      {isOpen && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            bottom: 28,
            position: 'relative',
          }}
        >
          <SelectBoxContainer>
            {optionList.map((data) => {
              return (
                <SelectBoxWrapper
                  isSelectedValue={value === data.value1 ? true : false}
                  key={data.value1}
                  // type="button"
                  // onClick={handleOptionChange}
                  onClick={() => {
                    setValue(data.value1);
                    toggleIsOpen(); // 해결 필요 1 - 옵션 선태 시 옵션 창 닫기 구현이 안됨.
                  }}
                >
                  {data.value1}
                  <SelectBox color={value === data.value1 ? 'var(--primary, #d85888)' : '#141414'}>
                    {data.value2}
                  </SelectBox>
                </SelectBoxWrapper>
              );
            })}
          </SelectBoxContainer>
        </div>
      )}
    </div>
  );
}

export default DropDown;

/* 이하는 스타일 적용 */

const AngleDown = styled.div<{ isOpen: boolean; isSelected: boolean }>`
  /* position: relative; */
  /* bottom: 47px; */
  /* left: 285px; */
  /* height: 2px; */
  position: absolute;

  right: 2.5%;
  margin-top: 2px;

  cursor: pointer;

  svg > path {
    fill: ${(props) => (props.isOpen && !props.isSelected ? '#d85888' : '')};
    transition: fill 0.25s ease-in-out;
  }

  svg {
    transform: ${(props) => (props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
    transition: transform 0.25s ease-in-out;
  }
`;

const DropDownBtn = styled.button<{ isOpen: boolean; isSelected: boolean }>`
  width: 100%;
  /* max-width: 628px; */
  height: 3.542vw; //68px;
  border-radius: 0.521vw; //10px;
  border: 1px solid #b9b9b9;
  background: #fff;

  display: flex;
  align-items: center;
  text-align: left;
  padding-left: 0.9375vw; //18px;

  color: #757575;
  font-family: Pretendard;
  font-size: 0.9375vw; //18px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 100% */

  cursor: pointer;
  opacity: 0.8;

  ${(props) =>
    props.isOpen &&
    css`
      border: 1px solid #d85888;
      color: #d85888;
      opacity: 1;
    `}

  ${(props) =>
    props.isSelected &&
    css`
      color: #d85888;
      border: 1px solid #d85888;
    `}


  position: relative;
`;

/*
const InputButtonWrapper = styled.button<{
  isOpen: boolean;
  isSelected: boolean;
}>`
  width: 28px;
  height: 28px;

  & > svg {
    width: 28px;
    height: 28px;
    transition: 0.25s ease-in-out;
    fill: #a8a8a8;
  }

  &:active > svg > path {
    fill: #d85888;
  }
`;
*/

/* 
<InputButtonWrapper isOpen={isOpen} isSelected={isSelected}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
          >
            <path
              d="M19.8333 10.6984C19.6147 10.4811 19.319 10.3591 19.0108 10.3591C18.7026 10.3591 18.4069 10.4811 18.1883 10.6984L14 14.8284L9.86998 10.6984C9.65139 10.4811 9.3557 10.3591 9.04748 10.3591C8.73926 10.3591 8.44357 10.4811 8.22498 10.6984C8.11563 10.8068 8.02884 10.9359 7.96961 11.078C7.91038 11.2202 7.87988 11.3727 7.87988 11.5267C7.87988 11.6807 7.91038 11.8332 7.96961 11.9754C8.02884 12.1176 8.11563 12.2466 8.22498 12.3551L13.1716 17.3017C13.2801 17.4111 13.4091 17.4979 13.5513 17.5571C13.6935 17.6163 13.846 17.6468 14 17.6468C14.154 17.6468 14.3065 17.6163 14.4487 17.5571C14.5908 17.4979 14.7199 17.4111 14.8283 17.3017L19.8333 12.3551C19.9427 12.2466 20.0295 12.1176 20.0887 11.9754C20.1479 11.8332 20.1784 11.6807 20.1784 11.5267C20.1784 11.3727 20.1479 11.2202 20.0887 11.078C20.0295 10.9359 19.9427 10.8068 19.8333 10.6984Z"
              fill="#A8A8A8"
            />
            <path
              d="M8.16669 17.3016C8.38527 17.5189 8.68097 17.6409 8.98919 17.6409C9.2974 17.6409 9.5931 17.5189 9.81169 17.3016L14 13.1716L18.13 17.3016C18.3486 17.5189 18.6443 17.6409 18.9525 17.6409C19.2607 17.6409 19.5564 17.5189 19.775 17.3016C19.8844 17.1932 19.9712 17.0641 20.0304 16.922C20.0896 16.7798 20.1201 16.6273 20.1201 16.4733C20.1201 16.3193 20.0896 16.1668 20.0304 16.0246C19.9712 15.8824 19.8844 15.7534 19.775 15.6449L14.8284 10.6983C14.7199 10.5889 14.5909 10.5021 14.4487 10.4429C14.3065 10.3837 14.154 10.3532 14 10.3532C13.846 10.3532 13.6935 10.3837 13.5513 10.4429C13.4092 10.5021 13.2801 10.5889 13.1717 10.6983L8.16669 15.6449C8.05734 15.7534 7.97054 15.8824 7.91131 16.0246C7.85208 16.1668 7.82159 16.3193 7.82159 16.4733C7.82159 16.6273 7.85208 16.7798 7.91131 16.9219C7.97054 17.0641 8.05734 17.1932 8.16669 17.3016Z"
              fill="#D85888"
            />
          </svg>
        </InputButtonWrapper>
*/

const SelectBoxContainer = styled.div`
  position: absolute;
  z-index: 999;
  top: 30px;
  display: flex;
  flex-direction: column;
  width: 100%;
  /* max-width: 629px; */
  height: 213px;
  /* height 의 경우 옵션의 개수에 따라 동적으로 변화하게 설정 */
  min-height: 0; /* 임의 설정 */
  overflow-y: auto; /* 최대 높이를 초과할 경우 스크롤바 추가 */
  max-height: 350px; /* 한 옵션 당 34 px * 9 = 306 px + ... 패딩값 등 고려하여 임의 설정 */
  justify-content: flex-start;
  align-items: center;
  padding-top: 0.885vw; //17px;
  padding-bottom: 7px;
  box-sizing: border-box;
  border-radius: 0.521vw; //10px;
  border: 1px solid rgba(216, 88, 136, 0.2);
  background: #fff;
  box-shadow: 0px 0px 15px 0px rgba(79, 13, 37, 0.15);

  /* 
    스크롤바 제거
    ( 크롬, 사파리, 오페라, 엣지 ) 동작 
  */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
`;

const SelectBoxWrapper = styled.button<{
  isSelectedValue: boolean;
}>`
  display: flex;
  justify-content: space-between;
  width: 95%;

  /* height: 25%; */
  align-items: center;
  border-radius: 5px;

  padding: 0.677vw 0.9375vw; //13px 18px;
  margin-top: 4px;

  color: var(--main-black, #141414);
  font-family: Pretendard;
  font-size: 0.9375vw; //18px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;

  &:hover {
    background: rgba(217, 217, 217, 0.2);
  }

  &:active {
    background: rgba(216, 88, 136, 0.05);
  }

  ${(props) =>
    props.isSelectedValue &&
    css`
      background: rgba(216, 88, 136, 0.05);
      color: var(--primary, #d85888);
      font-weight: 700;
    `}
`;

const SelectBox = styled(Typography)<TypographyProps>`
  font-weight: 400;
  font-size: 0.833vw;
  opacity: 0.8;
`;
