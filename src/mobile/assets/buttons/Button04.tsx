import styled from 'styled-components';

import Typography from '../../../assets/Typography';

export interface Button04Props extends React.ComponentPropsWithoutRef<'button'> {
  state?: 'default' | 'disabled';
}

function Button04(props: Button04Props) {
  const { children = '이전', state = 'default', ...rest } = props;
  return (
    <MainWrapper state={state} {...rest}>
      <Typography
        size="3.61vw"
        bold="700"
        color={state === 'default' ? '#D85888' : '#DFDFDF'}
        style={{ lineHeight: '120%' }}
      >
        {children}
      </Typography>
    </MainWrapper>
  );
}

const MainWrapper = styled.button<Button04Props>`
  width: 21.11vw;
  height: auto;
  box-sizing: border-box;
  padding: 3.61vw 4.44vw;
  border: ${(props) => (props.state === 'default' ? '0.28vw solid #D85888' : '0.28vw solid #DFDFDF')};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.22vw;
  background: #fff;
  opacity: ${(props) => (props.state === 'disabled' ? '0.42' : '1')};
  border-radius: 1.39vw;
`;

export default Button04;
