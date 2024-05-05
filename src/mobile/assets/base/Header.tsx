import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Typography from '../../../assets/Typography';

function MobileHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLogined, setIsLogined] = useState<boolean>(true);
  const [userData, setUserData] = useState<{ userName: string; userProfilePic: string }>({
    userName: '고대빵',
    userProfilePic: 'rectProfile1',
  });

  const [buttonStates, setButtonStates] = useState<('default' | 'pressed' | 'disabled')[]>([
    'default',
    'default',
    'default',
  ]);

  useEffect(() => {
    switch (location.pathname) {
      case '/landing':
        setButtonStates(['pressed', 'disabled', 'disabled']);
        break;
      case '/archiving':
        setButtonStates(['disabled', 'pressed', 'disabled']);
        break;
      case '/myboard':
        setButtonStates(['disabled', 'disabled', 'pressed']);
        break;
      default:
        setButtonStates(['default', 'default', 'default']);
    }
  }, [location.pathname]);

  return (
    <MainWrapper>
      <HorizontalWrapper>
        <Logo src="../../../../designImage/kupply/KupplyVer1.svg" onClick={() => navigate('/')} />
        {isLogined ? (
          <ProfileBox>
            <Typography size="3.33vw" bold="700">
              {userData.userName}&nbsp;
            </Typography>
            <Typography size="3.33vw" bold="500" style={{ opacity: '0.8' }}>
              님
            </Typography>
            <ProfileImage userProfilePic={userData.userProfilePic} />
          </ProfileBox>
        ) : (
          <LoginButton onClick={() => navigate('/login')}>
            <Typography size="3.61vw" bold="700" color="#D85888">
              로그인
            </Typography>
          </LoginButton>
        )}
      </HorizontalWrapper>
      <HorizontalWrapper>
        <HeaderButton state={buttonStates[0]} onClick={() => navigate('/landing')}>
          실시간 지원 현황
        </HeaderButton>
        <HeaderButton state={buttonStates[1]} onClick={() => navigate('/archive')}>
          합격자료
        </HeaderButton>
        <HeaderButton state={buttonStates[2]} onClick={() => navigate('/myboard')}>
          마이보드
        </HeaderButton>
      </HorizontalWrapper>
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  width: 90.56vw;
  height: 20.55vw;
  padding: 2.78vw 4.72vw 0 4.72vw;
  display: flex;
  flex-direction: column;
  gap: 4.17vw;
  background-color: #fff;
  box-shadow: 0 1.11vw 15.28vw 0 rgba(20, 20, 20, 0.1);
  backdrop-filter: blur(50px);
`;

const HorizontalWrapper = styled.div`
  width: auto;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  width: 27.78vw;
  height: 6.11vw;
  cursor: pointer;
`;

const LoginButton = styled.button`
  width: 21.11vw;
  height: 7.78vw;
  box-sizing: border-box;
  border: 1px solid #d85888;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.39vw;
`;

const ProfileBox = styled.div`
  width: fit-content;
  height: auto;
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.div<{ userProfilePic?: string }>`
  width: 6.67vw;
  height: 6.67vw;
  margin-left: 2.06vw;
  background-image: url('../../../../designImage/character/rectProfile/${(props) => props.userProfilePic}.png');
  background-size: cover;
  border-radius: 1vw;
`;

const HeaderButton = styled.div<{ state?: 'default' | 'pressed' | 'disabled' }>`
  width: auto;
  height: auto;
  color: #141414;
  font-family: Pretendard;
  font-size: 3.61vw;
  font-weight: ${(props) => (props.state === 'pressed' ? '700' : '400')};
  opacity: ${(props) => (props.state === 'disabled' ? '0.6' : '1')};
  line-height: 120%;
  cursor: pointer;
`;

export default MobileHeader;
