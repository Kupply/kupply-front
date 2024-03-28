import styled from 'styled-components';

import Typography from '../../../assets/Typography';

export interface CTA01Props extends React.ComponentPropsWithoutRef<'button'> {
  size?: 'small' | 'large';
  state?: 'default' | 'disabled';
}

function CTA01(props: CTA01Props) {
  const { children = '제출하기', size = 'small', state = 'default', ...rest } = props;
  return (
    <MainWrapper size={size} state={state} {...rest}>
      <Typography size="3.61vw" bold={size === 'small' ? '700' : '500'} color="#FFF" style={{ lineHeight: '120%' }}>
        {children}
      </Typography>
    </MainWrapper>
  );
}

const MainWrapper = styled.button<CTA01Props>`
  width: ${(props) => (props.size === 'small' ? '81.67vw' : '91.11vw')};
  height: auto;
  box-sizing: border-box;
  padding: 3.61vw 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => (props.state === 'default' ? '#D85888' : '#E4E4E4')};
  border-radius: 1.39vw;
`;

export default CTA01;
