import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Banner05 from '../../assets/banners/Banner05';
import { MajorOptionsKR as MajorOptions } from '../../../mappings/MajorTypes';

export interface CardProps extends React.ComponentPropsWithoutRef<'div'> {
  korName: string;
  hopeMajor: string;
}

const MyboardBanner = ({ onViewMajor, userData }: { onViewMajor: any; userData: any }) => {
  const majorKoreanName: MajorOptions = onViewMajor === 1 ? userData.hopeMajor1 : userData.hopeMajor2;

  return (
    <>
      <Wrapper>
        <Banner05 major={majorKoreanName} />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  width: 100vw;
  margin-top: 5vw;
`;

export default MyboardBanner;
