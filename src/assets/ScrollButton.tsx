import React, { useState } from "react";
import styled from "styled-components";

const ScrollbarSmall = styled.button<{ isChecked: boolean }>`
  display: inline-block;
  width: auto;  
  height: 100%;      
  flex-shrink: 0;
  border-radius: 10px;
  overflow-y: overlay;
  overflow-x: hidden;
  box-sizing: border-box;
  color: white;  
  
  /* Webkit 기반의 브라우저 Chrome, Safari */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ isChecked }) => isChecked ? "#D85888" : "rgba(238, 238, 238, 0.7)"};
    border-radius: 10px;
    min-height: 30%;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background: rgba(238, 238, 238, 0.2);
  }

  &::-webkit-scrollbar-button {
    background: transparent;
  }

  &::-webkit-scrollbar-corner {
	  background: transparent;
  }
    
  /* Firefox에서 스크롤바 숨기기 */
  scrollbar-width: none;

  /* Internet Explorer에서 스크롤바 숨기기 */
  -ms-overflow-style: none;
`;


const ScrollbarLarge = styled.button<{ isChecked: boolean }>`
  display: inline-block;
  width: auto;  
  height: 100%;               
  flex-shrink: 0;
  border-radius: 10px;
  overflow-y: overlay;
  overflow-x: hidden;
  box-sizing: border-box;
  color: white;  
 
  /* Webkit 기반의 브라우저 Chrome, Safari */
  &::-webkit-scrollbar {
    width: 10px;
    height: 502px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ isChecked }) => isChecked ? "#D85888" : "rgba(238, 238, 238, 0.6)"};
    border-radius: 999px;;
    min-height: 30%;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background: rgba(238, 238, 238, 0.2);
  }

  &::-webkit-scrollbar-button {
    background: transparent;
  }

  &::-webkit-scrollbar-corner {
	  background: transparent;
  }
    
  /* Firefox에서 스크롤바 숨기기 */
  scrollbar-width: none;

  /* Internet Explorer에서 스크롤바 숨기기 */
  -ms-overflow-style: none;
`;

export interface ScrollButtonProps 
  extends React.ComponentPropsWithoutRef<"button"> {
  isChecked: boolean;
}

function ScrollBarSmall(props: ScrollButtonProps) {
  const { children = "내용", isChecked = false, ...rest } = props;
  const [scrollActive, setActive] = useState(false);

  return (
    <ScrollbarSmall
      isChecked={scrollActive}
        onClick={() => {
          setActive(!scrollActive);
        }}
    >
      {children}
    </ScrollbarSmall>
  );
}

function ScrollBarLarge(props: ScrollButtonProps) {
  const { children = "내용", isChecked = false, ...rest } = props;
  const [scrollActive, setActive] = useState(false);

  return (
    <ScrollbarLarge
      isChecked={scrollActive}
        onClick={() => {
          setActive(!scrollActive);
        }}
    >
      {children}
    </ScrollbarLarge>
  );
}

export {ScrollBarSmall, ScrollBarLarge};
