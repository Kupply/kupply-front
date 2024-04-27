import { useState } from 'react';
import { css, styled } from 'styled-components';

export type HashtagButtonStatus = 'default' | 'pressed';

export interface HashtagButtonProps extends React.ComponentPropsWithRef<'button'> {
  status: HashtagButtonStatus;
  index: number;
}

const HashtagButton = (props: HashtagButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const imageNumber = String(props.index + 1).padStart(2, '0');
  const imagePath1 = `../../designImage/tabMenu/Tabmenu04_${imageNumber}_1.svg`; // DEFAULT
  const imagePath2 = `../../designImage/tabMenu/Tabmenu04_${imageNumber}_2.svg`; // HOVER & PRESSED

  const shouldUseImage2 = isHovered || props.status === 'pressed';
  const imagePath = shouldUseImage2 ? imagePath2 : imagePath1;

  return (
    <Container {...props} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <InnerImage src={imagePath} alt="symbol" />
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
  gap: 0.42vw;
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
          border: 1px solid #d85888;
          box-shadow: 0px 0px 20px 0px rgba(229, 124, 144, 0.5);
          background: var(--Secondary, #e57c90);
          color: #fff;
        `;
    }
  }}

  &:hover {
    background: rgba(229, 124, 144, 0.75);
    box-shadow: 0px 0px 20px 0px rgba(229, 124, 144, 0.5);
    border: none;
    color: white;
  }
`;

const InnerText = styled.div`
  font-family: Pretendard;
  font-size: 1.25vw;
  font-style: normal;
  font-weight: 500;
  // line-height: 24px;
  text-align: center;
`;

const InnerImage = styled.img`
  width: 1vw;
  height: 1.25vw;
  flex-shrink: 0;
  justify-content: center;
`;

export default HashtagButton;
