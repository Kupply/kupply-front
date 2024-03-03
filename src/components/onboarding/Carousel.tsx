//3d이미지 없어서 미완
import styled from 'styled-components';
import { useState } from 'react';

import Typography from '../../assets/Typography';

function Carousel() {
  const [page, setPage] = useState(0);

  return <MainWrapper></MainWrapper>;
}

const MainWrapper = styled.div`
  width: 100vw;
  height: 18.7vw;
  background-image: url('../designImage/carousel/Carousel1.png');
`;

export default Carousel;
