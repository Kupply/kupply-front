import React from 'react';
import styled from 'styled-components';
import Logo from '../assets/Logo';
import Typography from '../assets/Typography';
import SideBar from '../components/community/SideBar';
import Main from '../components/community/Main';

const Wrapper = styled.div`
  width: 100%;
  height: 1152px;
  display: flex;
  align-items: space-between;
`;

const CommunityPage = () => {
  return (
    <Wrapper>
      <SideBar />
      <Main />
    </Wrapper>
  );
};

export default CommunityPage;
