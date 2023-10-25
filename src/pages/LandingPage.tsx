import React from 'react';
import styled from 'styled-components';
import RankingTable from '../components/landingpage/RankingTable';
import PassedDataCard from '../components/landingpage/PassedDataCard';
import Preview from '../components/landing/Preview';
import FAQ from '../components/landing/FAQ';
import Ending from '../components/landing/Ending';

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
