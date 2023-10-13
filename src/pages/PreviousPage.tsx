import React, { useState } from 'react';
import Header from '../components/Previous/Header';
import Cards from '../components/Previous/Cards';
import styled from 'styled-components';

// 10.14 화면비율조정이슈 - 가운데 정렬 위해 추가
const Wrapper = styled.div`
  width: 100vw;
  max-width: 2560px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PreviousPage = () => {
  const [clicked, setClicked] = useState(0);
  const [searchWord, setSearchWord] = useState('');
  return (
    <Wrapper>
      <Header clicked={clicked} setClicked={setClicked} searchWord={searchWord} setSearchWord={setSearchWord} />
      <Cards clicked={clicked} />
    </Wrapper>
  );
};

export default PreviousPage;
