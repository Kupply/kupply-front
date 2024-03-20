import styled from 'styled-components';

import Typography from '../../assets/Typography';
import Preview1 from './Preview1';
import Preview2 from './Preview2';
import Preview3 from './Preview3';

function Preview() {
  return (
    <MainWrapper>
      <Preview1 />
      <Preview2 />
      <Preview3 />
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  width: 100vw;
  height: auto;
  min-height: 177.24vw;
  background: #fff;
`;

export default Preview;
