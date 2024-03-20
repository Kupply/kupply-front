import React, { useState } from 'react';
import styled, { css } from 'styled-components';

export interface KeyButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  index: number;
}

export const CarouselKey: React.FC<KeyButtonProps> = () => {
  const [activeContainer, setActiveContainer] = useState<Number>(1);

  const handleClick = (containerIndex: number) => {
    setActiveContainer(containerIndex);
  };

  return (
    <Wrapper>
      {[1, 2, 3].map((containerIndex) => (
        <>
          <Container
            key={containerIndex}
            active={activeContainer === containerIndex}
            onClick={() => handleClick(containerIndex)}
          />
          {activeContainer === containerIndex && (
            <img
              src={`../../designImage/carousel/CarouselKey${containerIndex}.svg`}
              alt={`CarouselKey${containerIndex}`}
              style={{
                position: 'absolute',
                top: '50%',
                left:
                  containerIndex === 1 ? '28px' : containerIndex === 2 ? '35px' : containerIndex === 3 ? '42px' : '0px',
                transform: 'translate(-50%, -50%)',
              }}
            />
          )}
        </>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  width: 70px;
  height: 10px;
  border: 1px solid white;
`;

const Container = styled.div<{ active?: boolean }>`
  width: 10px;
  height: 10px;
  // border: 1px solid ${(props) => (props.active ? 'blue' : 'red')};
  z-index: 1;
  cursor: pointer;

  &:hover {
    background-color: transparent;
  }
`;
