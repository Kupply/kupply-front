import React from 'react';
import styled, { css } from 'styled-components';
import useDetectClose from '../../../assets/dropdown/UseDetectClose';
import SelectBox from './SelectBox';
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

  return (
    <div style={{ width: '100%', minWidth: '190px' }} ref={ref}>
      <DropDownBtn isOpen={isOpen} isSelected={isSelected} onClick={toggleIsOpen} type="button" value={value || title}>
        {value || title}
        <AngleDown isOpen={isOpen} isSelected={isSelected}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                <SelectBox
                  value={data.value1}
                  subValue={data.value2}
                  selectedValue={value}
                  setSelectedValue={setValue}
                  closeDropDown={toggleIsOpen}
                />
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
  max-width: 174.444vw; /* 628px */
  height: 11.667vw; /* 42px */
  border-radius: 1.389vw; /* 5px */
  border: 0.278vw solid #b9b9b9; /* 1px */
  background: #fff;

  display: flex;
  align-items: center;
  text-align: left;
  padding-left: 5vw; /* 18px */

  color: #757575;
  font-family: Pretendard;
  font-size: 3.611vw; /* 13px */
  font-style: normal;
  font-weight: 500;
  line-height: 5vw; /* 18px */

  cursor: pointer;
  opacity: 0.8;

  ${(props) =>
    (props.isOpen || props.isSelected) &&
    css`
      border: 0.278vw solid #d85888; /* 1px */
      color: #d85888;
      opacity: 1;
    `}

  position: relative;
`;

const SelectBoxContainer = styled.div`
  position: absolute;
  z-index: 999;
  top: 8.333vw; /* 30px */
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 174.722vw; /* 629px */
  height: 40.833vw; /* 147px */
  min-height: 0; /* arbitrary setting */
  overflow-y: auto; /* adds scrollbar if height exceeds maximum */
  max-height: 97.222vw; /* 350px */
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 1.944vw; /* 7px */
  box-sizing: border-box;
  border-radius: 2.778vw; /* 10px */
  border: 0.278vw solid rgba(216, 88, 136, 0.2); /* 1px */
  background: #fff;
  box-shadow: 0px 0px 4.167vw 0px rgba(79, 13, 37, 0.15); /* dynamic shadow scaling */
  padding: 2.222vw; /* 8px */

  /* Custom scroll bar handling for different browsers */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;
