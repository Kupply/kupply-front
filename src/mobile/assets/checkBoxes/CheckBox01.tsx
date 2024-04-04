import styled from 'styled-components';
import { useState } from 'react';

import Typography from '../../../assets/Typography';

export interface CheckBox01Props extends React.ComponentPropsWithoutRef<'div'> {
  initialState?: 'default' | 'active';
}

function CheckBox01(props: CheckBox01Props) {
  const { initialState = 'default', children = '약관 전체동의 하기', ...rest } = props;

  const [state, setState] = useState(initialState);

  function handleButtonClick() {
    setState((prevState) => (prevState === 'default' ? 'active' : 'default'));
  }

  return (
    <MainWrapper {...rest}>
      <ImageWrapper
        src={
          state === 'default'
            ? '../../../designImage/mobile/checkBox/CheckBox1_2.svg'
            : '../../../designImage/mobile/checkBox/CheckBox1_1.svg'
        }
        onClick={handleButtonClick}
      />
      <Typography size="3.89vw" bold="700" style={{ lineHeight: '128.57%' }}>
        {children}
      </Typography>
    </MainWrapper>
  );
}

const MainWrapper = styled.div<CheckBox01Props>`
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  gap: 1.94vw;
`;

const ImageWrapper = styled.img`
  width: 4.17vw;
  height: 4.17vw;
  cursor: pointer;
`;

export default CheckBox01;
