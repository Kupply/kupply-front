import styled from 'styled-components';

import Content1 from './Content1';
import Content2 from './Content2';
import Content3 from './Content3';

function Contents() {
  return (
    <MainWrapper>
      <Content1 />
      <Content2 />
      <Content3 />
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

export default Contents;
