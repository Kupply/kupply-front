import { useState } from 'react';
import { css, styled } from 'styled-components';

export type ButtonStatus = 'default' | 'pressed';

export interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  status: ButtonStatus;
  index: number;
}

const MobileTabMenu04 = (props: ButtonProps) => {
  const imageNumber = String(props.index + 1).padStart(2, '0');
  const imagePath1 = `../../designImage/tabMenu/Tabmenu04_${imageNumber}_3.svg`; // DEFAULT
  const imagePath2 = `../../designImage/tabMenu/Tabmenu04_${imageNumber}_2.svg`; // PRESSED

  const shouldUseImage2 = props.status === 'pressed';
  const imagePath = shouldUseImage2 ? imagePath2 : imagePath1;

  return (
    <Container {...props}>
      <InnerImage src={imagePath} alt="symbol" />
      <InnerText>{props.children}</InnerText>
    </Container>
  );
};

const Container = styled.button<{ status: ButtonStatus }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  height: 8.33vw;
  padding: 2.78vw 3.33vw;
  gap: 6px;
  flex-shrink: 0;
  border-radius: 400.826px;
  transition: 0.3s ease-in-out;
  ${(props) => {
    switch (props.status) {
      case 'default':
        return css`
          border-radius: 400.826px;
          border: 1px solid var(--grey-3, #b9b9b9);
          background: rgba(255, 255, 255, 0.3);
          color: var(--grey-3, #b9b9b9);
        `;
      case 'pressed':
        return css`
          border-radius: 400.826px;
          background: var(--Secondary, #e57c90);
          box-shadow: 0px 0px 16.049px 0px rgba(216, 88, 136, 0.2);
          color: #fff;
        `;
    }
  }}
`;

const InnerText = styled.div`
  font-family: Pretendard;
  font-size: 3.61vw;
  font-style: normal;
  font-weight: 500;
  line-height: 74.073%;
  text-align: center;
`;

const InnerImage = styled.img`
  width: 2.22vw;
  height: 2.78vw;
  flex-shrink: 0;
  justify-content: center;
`;

export default MobileTabMenu04;
