import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import Header from '../../components/Previous/Header';
import Cards from '../../components/Previous/Cards';

const PreviousPage = () => {
  const [clicked, setClicked] = useState(0);
  const [searchWord, setSearchWord] = useState('');

  return (
    <>
      <GlobalStyles />
      <Header clicked={clicked} setClicked={setClicked} searchWord={searchWord} setSearchWord={setSearchWord} />
      <Cards clicked={clicked} searchWord={searchWord} />
    </>
  );
};

export default PreviousPage;

const GlobalStyles = createGlobalStyle` // 가로 스크롤 숨기기
  html, body {
    max-width: 100%;
    overflow-x: hidden;
  }
`;
