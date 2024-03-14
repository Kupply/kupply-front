import styled from 'styled-components';
import { useState } from 'react';

import Header from '../../components/Previous/Header';
import Cards from '../../components/Previous/Cards';

const PreviousPage = () => {
  const [clicked, setClicked] = useState(0);
  const [searchWord, setSearchWord] = useState('');

  return (
    <>
      {/* <GlobalStyles /> */}
      <Header clicked={clicked} setClicked={setClicked} searchWord={searchWord} setSearchWord={setSearchWord} />
      <Cards clicked={clicked} searchWord={searchWord} />
    </>
  );
};

export default PreviousPage;

// const GlobalStyles = createGlobalStyle` // 가로 스크롤 숨기기 -> 세로 스크롤 두개 생기는 현상으로 지움
//   html, body {
//     overflow-y: auto;
//     overflow-x: hidden;
//   }
// `;
