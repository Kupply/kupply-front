import React, { useState } from 'react';
import styled from 'styled-components';

const ScrollbarSmall = styled.button<{ isChecked: boolean; isHovered: boolean }>`
  display: inline-block;
  width: 594px;
  height: 204px;
  padding: 8px;
  gap: 8px;
  justify-content: left;
  align-items: left;
  overflow-y: overlay;
  overflow-x: hidden;
  flex-shrink: 0;
  border-radius: 10px;
  box-sizing: border-box;
  color: white;
  position: relative;

  /* Webkit 기반의 브라우저 Chrome, Safari */
  &::-webkit-scrollbar {
    width: 6px;
    height: 100%;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ isChecked }) => (isChecked ? 'rgba(216, 88, 136, 0.8)' : 'rgba(238, 238, 238, 0.7)')};
    border-radius: 10px;
    min-height: 30%;
    box-shadow: ${({ isChecked }) => (isChecked ? '0px 4px 12px 0px rgba(216, 88, 136, 0.25)' : 'transparent')};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(216, 88, 136, 0.8);
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background: ${({ isChecked }) => (isChecked ? 'rgba(238, 238, 238, 0.7)' : 'rgba(238, 238, 238, 0.2)')};
  }

  &::-webkit-scrollbar-button {
    background: transparent;
  }

  &::-webkit-scrollbar-corner {
    background: transparent;
  }

  .scrollbarWrapper {
    position: absolute;
    right: 0;
    top: 0;
    width: 6px;
    height: 100%;
    background: transparent;
    pointer-events: none;
  }

  /* Firefox에서 스크롤바 색상 너비만 변경 가능 */
  scrollbar-width: none;

  /* Internet Explorer에서 스크롤바 숨기기: 개발 지원 불가 */
  -ms-overflow-style: none;
`;

const ScrollbarLarge = styled.button<{ isChecked: boolean; isHovered: boolean }>`
  display: inline-block;
  width: auto;
  height: 80%;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 10px;
  box-sizing: border-box;
  color: white;

  /* Webkit 기반의 브라우저 Chrome, Safari */
  &::-webkit-scrollbar {
    width: 10px;
    height: 502px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ isChecked }) => (isChecked ? 'rgba(216, 88, 136, 0.8)' : 'rgba(238, 238, 238, 0.7)')};
    border-radius: 999px;
    min-height: 30%;
    box-shadow: ${({ isChecked }) => (isChecked ? '0px 4px 12px 0px rgba(216, 88, 136, 0.25)' : 'transparent')};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(216, 88, 136, 0.8);
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background: ${({ isChecked }) => (isChecked ? 'rgba(238, 238, 238, 0.5)' : 'rgba(238, 238, 238, 0.2)')};
  }

  &::-webkit-scrollbar-button {
    background: transparent;
  }

  &::-webkit-scrollbar-corner {
    background: transparent;
  }

  .scrollbarWrapper {
    position: absolute;
    right: 0;
    top: 0;
    width: 10px;
    height: 100%;
    background: transparent;
    pointer-events: none;
  }

  /* Firefox에서 스크롤바 숨기기 */
  scrollbar-width: none;

  /* Internet Explorer에서 스크롤바 숨기기 */
  -ms-overflow-style: none;
`;

export interface ScrollButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  isChecked: boolean;
}

function ScrollBarSmall(props: ScrollButtonProps) {
  const { children = '내용', isChecked = false, ...rest } = props;
  const [scrollActive, setActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  //console.log(scrollActive);

  return (
    <ScrollbarSmall isChecked={isChecked || scrollActive} isHovered={isHovered}>
      {children}
      <div
        className="scrollbar-handler"
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          setActive(true);
        }}
        onMouseUp={(e) => {
          console.log('Mouse up');
          e.stopPropagation();
          setActive(false);
        }}
      ></div>
    </ScrollbarSmall>
  );
}

function ScrollBarLarge(props: ScrollButtonProps) {
  const { children = '내용', isChecked = false, ...rest } = props;
  const [scrollActive, setActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  //console.log(scrollActive);

  return (
    <ScrollbarLarge isChecked={isChecked || scrollActive} isHovered={isHovered}>
      {children}
      <div
        className="scrollbar-handler"
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          setActive(true);
        }}
        onMouseUp={(e) => {
          e.stopPropagation();
          setActive(false);
        }}
      ></div>
    </ScrollbarLarge>
  );
}

export { ScrollBarSmall, ScrollBarLarge };
