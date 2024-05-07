import styled from 'styled-components';

import Typography from '../../../assets/Typography';

function Button15({ children = '합격자료', ...rest }) {
  return (
    <MainWrapper {...rest}>
      <Typography size="3.06vw" color="#D85888" style={{ lineHeight: '120%' }}>
        {children}
      </Typography>
    </MainWrapper>
  );
}

const MainWrapper = styled.button`
  width: fit-content;
  height: auto;
  box-sizing: border-box;
  padding: 1.67vw 2.78vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 465.05px;
  box-shadow: 0px 0px 5.17vw 0px rgba(216, 88, 136, 0.2);
`;

export default Button15;
