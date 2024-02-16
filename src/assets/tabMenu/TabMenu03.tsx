// 마이보드 EditModal 하면서 같이 해야될듯... 너무 복잡해
// 임시로 TabMenu04 복붙

import { useState } from 'react';
import { css, styled } from 'styled-components';

export type HashtagButtonStatus = 'default' | 'pressed';

export interface HashtagButtonProps extends React.ComponentPropsWithRef<'button'> {
  status: HashtagButtonStatus;
}

const HashtagButton = (props: HashtagButtonProps) => {
  return (
    <Container {...props}>
      <InnerText>#</InnerText>
      <InnerText>{props.children}</InnerText>
    </Container>
  );
};

const Container = styled.button<{ status: HashtagButtonStatus }>`
  padding: 0.6vw 1.25vw; // 15px 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.41vw;
  flex-shrink: 0;
  border-radius: 999px;
  transition: 0.3s ease-in-out;
  ${(props) => {
    switch (props.status) {
      case 'default':
        return css`
          border: 1px solid #d85888;
          background: rgba(255, 255, 255, 0.3);
          color: #d85888;
        `;
      case 'pressed':
        return css`
          border-radius: 999px;
          border: 1px solid #d85888;
          opacity: 0.5;
          background: rgba(255, 255, 255, 0.3);
          color: rgba(216, 88, 136, 1);
        `;
    }
  }}

  &:hover {
    background-color: #e57c90;
    box-shadow: 0px 0px 20px 0px rgba(229, 124, 144, 0.5);
    border: none;
    color: white;
  }
`;

const InnerText = styled.div`
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  text-align: center;
`;

export default HashtagButton;
