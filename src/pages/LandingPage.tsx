import React from 'react';
import styled from 'styled-components';
import RankingTable from '../components/landingpage/RankingTable';
import PassedDataCard from '../components/landingpage/PassedDataCard';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1920px;
  padding-top: 100px;
`;

const LandingPage = () => {
  return (
    <Wrapper>
      <RankingTable />
      <PassedDataCard />
    </Wrapper>
  );
};

export default LandingPage;
