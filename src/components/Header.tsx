import styled from "styled-components";

const Square = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: pink;
`;

function Header() {
  return (
    <Square>
      <h3>헤더</h3>
    </Square>
  );
}

export default Header;
