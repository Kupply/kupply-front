import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const LogoWrapper = styled.button`
  display: flex;
  // justify-content: center; // 수평 중앙
  align-items: center; // 수직 중앙
  border: none;
  background: none;
  width: 188px;
  height: 46px;
  gap: 8.418px;
  flex-shrink: 0;
`;

/*
const LogoTextWrapper = styled.text`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #000;
  font-family: 'GmarketSans';
  font-size: 2.1em; // (참고) 폰트크기의 기본값은 16px
  font-style: normal;
  line-height: normal;
  font-weight: 300;
  letter-spacing: 1.177px;
`;
*/

const LogoImage = styled.img`
  width: 188px; // 46.575px;
  height: 46px; // 46px;
  border: none;
`;

function Logo() {
  const navigate = useNavigate();
  const LogoWrapperClick = () => {
    navigate('/');
  };
  return (
    <LogoWrapper onClick={LogoWrapperClick}>
      <LogoImage src="../../design_image/Kupply_ver1.png" />
    </LogoWrapper>
  );
}

export default Logo;
