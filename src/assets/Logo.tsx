import styled from "styled-components";

const LogoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 76.829px;
  height: 76.829px;
  flex-shrink: 0;
  border: none;
`;

const LogoText = styled.div`
  color: #000;
  font-family: Gmarket Sans;
  font-size: 55.461px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

function Logo() {
  return (
    <LogoWrapper>
      <LogoImage src="../../design_image/logo.png" />
      <LogoText>쿠플라이</LogoText>
    </LogoWrapper>
  );
}

export default Logo;
