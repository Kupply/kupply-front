import styled from 'styled-components';
import { useState } from 'react';

import Typography from '../../../assets/Typography';

export interface CheckBox02Props extends React.ComponentPropsWithoutRef<'div'> {
  initialState?: 'default' | 'active';
}

function CheckBox02(props: CheckBox02Props) {
  const { initialState = 'default', children = '로그인 상태 유지', ...rest } = props;

  const [state, setState] = useState(initialState);

  function handleButtonClick() {
    setState((prevState) => (prevState === 'default' ? 'active' : 'default'));
  }

  return (
    <MainWrapper {...rest}>
      <ImageWrapper
        src={
          state === 'default'
            ? '../../../designImage/mobile/checkBox/CheckBox2_1.svg'
            : '../../../designImage/mobile/checkBox/CheckBox1_1.svg'
        }
        onClick={handleButtonClick}
      />
      <Typography
        size="3.33vw"
        bold={state === 'default' ? '500' : '600'}
        color={state === 'default' ? 'rgba(20,20,20,0.6)' : '#D85888'}
        style={{ lineHeight: '120%' }}
      >
        {children}
      </Typography>
    </MainWrapper>
  );
}

const MainWrapper = styled.div<CheckBox02Props>`
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  gap: 2.5vw;
`;

const ImageWrapper = styled.img`
  width: 4.17vw;
  height: 4.17vw;
  cursor: pointer;
`;

export default CheckBox02;
