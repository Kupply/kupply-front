import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 71%;
  height: 1152px;
  border-left: 0.4px solid #eee;
  background: rgba(255, 255, 255, 0.6);
`;

export default function Main() {
  return (
    <Wrapper>
      <p>커뮤니티 페이지</p>
    </Wrapper>
  );
}
