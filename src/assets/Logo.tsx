import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export interface LogoProps extends React.ComponentPropsWithoutRef<'img'> {
  size?: string;
}

function Logo(props: LogoProps) {
  const { size = '9.79vw', ...rest } = props;
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <LogoImage
      src="../../design_image/Kupply_ver1.png"
      alt="LogoImage"
      onClick={handleLogoClick}
      size={size}
      {...rest}
    />
  );
}

const LogoImage = styled.img<LogoProps>`
  width: ${(props) => props.size};
  height: auto;
  cursor: pointer;
`;

export default Logo;
