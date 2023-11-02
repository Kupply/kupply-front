import React, { useEffect, useState } from 'react';
import Header from '../components/Previous/Header';
import Cards from '../components/Previous/Cards';

const PreviousPage = () => {
  const [clicked, setClicked] = useState(0);
  const [searchWord, setSearchWord] = useState('');

  return (
    <>
      <Header clicked={clicked} setClicked={setClicked} searchWord={searchWord} setSearchWord={setSearchWord} />
      <Cards clicked={clicked} searchWord={searchWord} />
    </>
  );
};

export default PreviousPage;
