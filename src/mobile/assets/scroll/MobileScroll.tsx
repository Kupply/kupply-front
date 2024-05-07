import React, { useState } from 'react';
import styled from 'styled-components';
// 참고 : https://gromo.github.io/jquery.scrollbar/demo/basic.html
// 참고 : https://inpa.tistory.com/entry/CSS-%F0%9F%8C%9F-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EB%B0%94Scrollbar-%EA%BE%B8%EB%AF%B8%EA%B8%B0-%EC%86%8D%EC%84%B1-%EC%B4%9D%EC%A0%95%EB%A6%AC

// .scrollbar 의 height 조정 필요
// IOS 스크롤 css 지원 X

interface MobileScrollProps {
  children: React.ReactNode;
  height: string;
}

interface ScrollContentProps {
  height: string;
  active: boolean;
}

export const MobileScroll: React.FC<MobileScrollProps> = ({ children, height = '250px' }) => {
  const [isActive, setIsActive] = useState(true);

  return (
    <ScrollContent
      height={height}
      active={isActive}
      onTouchStart={() => setIsActive(true)} // 터치 시작 시 isActive를 true로 설정
      onTouchEnd={() => setIsActive(false)} // 터치 종료 시 isActive를 false로 설정
    >
      <div className="scrollbar">{children}</div>
    </ScrollContent>
  );
};

const ScrollContent = styled.div<ScrollContentProps>`
  .scrollbar {
    width: 100%;
    height: ${(props) => props.height};
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 0.83vw; // 3px
      height: 100%;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(238, 238, 238, 0.7); // 비활성 상태
      border-radius: 10px;
      min-height: 30%;
    }

    &::-webkit-scrollbar-thumb:active {
      background: rgba(216, 88, 136, 0.8); // 활성 상태
    }

    &::-webkit-scrollbar-track {
      border-radius: 10px;
      background: ${(props) => (props.active ? 'rgba(238, 238, 238, 0.5)' : 'rgba(238, 238, 238, 0.2)')};
    }
  }

  /* Firefox에서 스크롤바 색상 너비만 변경 가능 */
  scrollbar-width: none;

  /* Internet Explorer에서 스크롤바 숨기기: 개발 지원 불가 */
  -ms-overflow-style: none;
`;

/*
  .scroll-wrapper {
    overflow: hidden !important;
    padding: 0 !important;
    position: relative;
  }

  .scroll-wrapper > .scroll-content,
  .scroll-textarea > .scroll-content > textarea {
    border: none !important;
    box-sizing: content-box !important;
    overflow: scroll !important;
    position: relative !important;
  }

  .scroll-wrapper > .scroll-content {
    height: auto;
    left: 0;
    margin: 0;
    padding: 0;
    top: 0;
    width: auto !important;
  }

  .scroll-element,
  .scroll-element div,
  .scrollbar-inner > .scroll-element,
  .scrollbar-inner > .scroll-element div {
    box-sizing: content-box;
  }

  .scroll-element.scroll-x.scroll-scrollx_visible,
  .scroll-element.scroll-y.scroll-scrolly_visible,
  .scrollbar-inner > .scroll-element.scroll-x,
  .scrollbar-inner > .scroll-element.scroll-y {
    display: block;
  }

  .scrollbar-inner > .scroll-element.scroll-x,
  .scrollbar-inner > .scroll-element.scroll-y {
    position: absolute;
    z-index: 10;
  }

  .scrollbar-inner > .scroll-element .scroll-bar,
  .scrollbar-inner > .scroll-element .scroll-arrow {
    cursor: default;
  }

  .scrollbar-inner > .scroll-element .scroll-bar {
    background-color: #c2c2c2;
  }

  .scrollbar-inner > .scroll-element:hover .scroll-bar,
  .scrollbar-inner > .scroll-element.scroll-draggable .scroll-bar {
    background-color: #919191;
  }

*/
