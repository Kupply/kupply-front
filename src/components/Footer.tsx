import styled from "styled-components";

const Square = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: pink;
`;

function Footer() {
  return (
    <Square>
      <h3>푸터</h3>
    </Square>
  );
}

export default Footer;
