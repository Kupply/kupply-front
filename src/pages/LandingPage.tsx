import React from 'react';
import styled from 'styled-components';
import RankingTable from '../components/landingpage/RankingTable';
import PassedDataCard from '../components/landingpage/PassedDataCard';
import FAQ from '../components/landingpage/FAQ';
import Ending from '../components/landingpage/Ending';
import Preview from '../components/landingpage/Preview';

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
      <Preview />
      <FAQ />
      <Ending />
    </Wrapper>
  );
};

export default LandingPage;
