import styled from 'styled-components';

import Content1 from './Content1';
import Content2 from './Content2';
import Content3 from './Content3';

function Contents() {
  const currentDate = new Date();
  const startDate = new Date('2024-05-10');
  const endDate = new Date('2024-05-17');
  const isDateInRange = currentDate >= startDate && currentDate <= endDate;

  return (
    <MainWrapper>
      {isDateInRange && <Content1 />}
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
