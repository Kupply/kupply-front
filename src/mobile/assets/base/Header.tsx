import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Typography from '../../../assets/Typography';
import client from '../../../utils/HttpClient';

export interface HeaderProps {
  logined: boolean;
  setLogin: (state: boolean) => void;
  setSelected: (selected: number) => void;
}

function MobileHeader({ logined, setLogin, setSelected }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const [userData, setUserData] = useState<{ userNickname: string; userProfilePic: string; userRole: string }>({
    userNickname: '',
    userRole: '',
    userProfilePic: 'rectProfile1',
  });
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  useEffect(() => {
    if (window.localStorage.isLogin === 'true') setLogin(true);
    else setLogin(false);
  }, []);

  const handleSettingsAndTerms = () => {
    navigate('/settings');
  };

  const handleLogout = async () => {
    try {
      await client.get('/auth/logout');
      window.localStorage.clear();
      window.sessionStorage.clear();
      setLogin(false);
      navigate('/');
      window.location.reload();
    } catch (err) {
      // 이후 수정 필요함.
      alert(err);
    }
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        if (logined) {
          await client.get('/user/getMe').then((res) => {
            const userInfo = res.data.data.user;

            setUserData({
              ...userData,
              userNickname: userInfo.nickname,
              userProfilePic: userInfo.profilePic,
            });

            localStorage.setItem('userProfilePic', userInfo.profilePic);
            localStorage.setItem('userProfileLink', userInfo.profileLink);
            localStorage.setItem('name', userInfo.name);
            localStorage.setItem('nickname', userInfo.nickname);
            localStorage.setItem('studentId', userInfo.studentId);
            localStorage.setItem('firstMajor', userInfo.firstMajor);
            localStorage.setItem('role', userInfo.role);
            if (userInfo.role === 'candidate') {
              localStorage.setItem('hopeMajor1', userInfo.hopeMajor1);
              localStorage.setItem('hopeMajor2', userInfo.hopeMajor2);
              localStorage.setItem('curGPA', userInfo.curGPA.toFixed(2));
              localStorage.setItem('hopeSemester', userInfo.hopeSemester);
              localStorage.setItem('isApplied', userInfo.isApplied);
            } else {
              localStorage.setItem('secondMajor', userInfo.secondMajor);
              localStorage.setItem('passSemester', userInfo.passSemester);
              localStorage.setItem('passGPA', userInfo.passGPA.toFixed(2));
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
    };

    getUserInfo();
  }, [logined]);

  const [buttonStates, setButtonStates] = useState<('default' | 'pressed' | 'disabled')[]>([
    'default',
    'default',
    'default',
  ]);

  useEffect(() => {
    switch (true) {
      case location.pathname === '/landing':
        setButtonStates(['pressed', 'disabled', 'disabled']);
        break;
      case location.pathname.startsWith('/archive'):
        setButtonStates(['disabled', 'pressed', 'disabled']);
        break;
      case location.pathname === '/myboard':
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
        <div style={{ position: 'relative' }}>
          {logined ? (
            <>
              <ProfileBox onClick={() => setIsToggleOpen(!isToggleOpen)}>
                <Typography size="3.33vw" bold="700" color={isToggleOpen ? '#D85888' : 'inherit'}>
                  {userData.userNickname}&nbsp;
                </Typography>
                <Typography
                  size="3.33vw"
                  bold="500"
                  style={{ opacity: '0.8' }}
                  color={isToggleOpen ? '#D85888' : 'inherit'}
                >
                  님
                </Typography>
                <ProfileImage userProfilePic={userData.userProfilePic} />
              </ProfileBox>
              {isToggleOpen && (
                <ToggleMenu>
                  <TitleBox>
                    <MenuProfileImage userProfilePic={userData.userProfilePic} />
                    <TitleText>
                      <TitleText1>{userData.userNickname}</TitleText1>
                      <TitleText2>{userData.userRole === 'candidate' ? '도전자' : '합격자'} 님</TitleText2>
                    </TitleText>
                  </TitleBox>
                  <BodyBox>
                    <MenuOption onClick={handleSettingsAndTerms}>
                      <Icon src="designImage/mobile/header/Icon1.svg" alt="Icon" />
                      <MenuText1>환경설정</MenuText1>
                    </MenuOption>
                    <MenuOption onClick={handleSettingsAndTerms} style={{ marginTop: '3.06vw' }}>
                      <Icon src="designImage/mobile/header/Icon2.svg" alt="Icon" />
                      <MenuText1>약관보기</MenuText1>
                    </MenuOption>
                    <Vector />
                    <MenuOption onClick={handleLogout} style={{ marginTop: '3.89vw' }}>
                      <Icon src="designImage/mobile/header/Icon3.svg" alt="Icon" />
                      <MenuText1>로그아웃</MenuText1>
                    </MenuOption>
                  </BodyBox>
                </ToggleMenu>
              )}
            </>
          ) : (
            <LoginButton onClick={() => navigate('/login')}>
              <Typography size="3.61vw" bold="700" color="#D85888">
                로그인
              </Typography>
            </LoginButton>
          )}
        </div>
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
  position: fixed;
  top: 0;
  z-index: 1000;
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

/////////////// TOGGLE ///////////////

const ToggleMenu = styled.div`
  position: absolute;
  top: 8vw;
  right: 0vw;
  width: 44.44vw;
  height: 55vw;

  background-color: #fff; // Ensure it's not semi-transparent
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25); // Stronger shadow for better separation
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

const TitleBox = styled.div`
  position: relative;
  display: flex;
  margin-top: 6.11vw;
  margin-left: 3.61vw;

  gap: 4.17vw;
`;

const BodyBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 4.44vw;
  margin-left: 3.33vw;
`;

const TitleText = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  row-gap: 1.11vw;
`;

const MenuProfileImage = styled.div<{ userProfilePic?: string }>`
  width: 15.63vw;
  height: 15.63vw;
  background-image: url('../../../../designImage/character/rectProfile/${(props) => props.userProfilePic}.png');
  background-size: cover;
  border-radius: 1vw;
`;

const MenuOption = styled.div`
  position: relative;
  display: flex;
  gap: 1.67vw;

  //padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const TitleText1 = styled.text`
  color: #141414;

  /* mob_small_Bold */
  font-family: Pretendard;
  font-size: 4.44vw;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 19.2px */
`;

const TitleText2 = styled.text`
  color: rgba(20, 20, 20, 0.8);

  /* mob_tiny_Regular */
  font-family: Pretendard;
  font-size: 3.06vw;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 13.2px */
`;

const MenuText1 = styled.text`
  color: #141414;
  /* mob_detail_Regular */
  font-family: Pretendard;
  font-size: 3.89vw;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 16.8px */
`;

const Vector = styled.div`
  width: 35.56vw;
  height: 0px;
  border: 1px solid #dfdfdf;
  margin-top: 3.89vw;
`;

const Icon = styled.img`
  width: 4.44vw;
  height: 4.44vw;
`;

export default MobileHeader;
