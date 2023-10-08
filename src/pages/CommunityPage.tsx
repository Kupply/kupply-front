import React from 'react';
import styled from 'styled-components';
import Preview from '../components/landing/Preview';
import FAQ from '../components/landing/FAQ';
import Ending from '../components/landing/Ending';

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
`;

const CommunityPage = () => {
  return (
    <Wrapper>
      <Ending />
    </Wrapper>
  );
};

export default CommunityPage;
