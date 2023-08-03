import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const LogoWrapper = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	border: none;
	background: none;
	width: 188px;
	height: 46px;
	gap: 8.418px;
	flex-shrink: 0;
`;

const LogoTextWrapper = styled.div`
	width: 133.006px;
	height: 33.581px;
	flex-shrink: 0;
	color: #000;
	font-family: "GmarketSans";
	font-size: 33.621px;
	font-style: normal;
	font-weight: 300;
	line-height: normal;
	letter-spacing: 1.177px;
`;

const LogoImage = styled.img`
	width: 46.575px;
	height: 46px;
	flex-shrink: 0;
	border: none;
`;

function Logo() {
	const navigate = useNavigate();
	const LogoWrapperClick = () => {
		navigate("/");
	};
	return (
		<LogoWrapper onClick={LogoWrapperClick}>
			<LogoImage src="../../design_image/logo.png" />
			<LogoTextWrapper>쿠플라이</LogoTextWrapper>
		</LogoWrapper>
	);
}

export default Logo;
