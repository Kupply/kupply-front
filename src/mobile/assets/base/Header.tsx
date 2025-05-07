import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MobileSelectedState } from '../../../store/atom';
import { useRecoilState } from 'recoil';
import Typography from '../../../assets/Typography';
import { client } from '../../../utils/HttpClient';

export interface HeaderProps {
  logined: boolean;
  setLogin: (state: boolean) => void;
  // setSelected: (selected: number) => void;
}

function MobileHeader({ logined, setLogin }: HeaderProps) {
  const [selected, setSelected] = useRecoilState(MobileSelectedState);
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

  // const handleSettingsAndTerms = () => {
  //   navigate('/settings');
  // };

  const handleSettings = () => {
    setSelected(0);
    navigate('/settings');
  };
  const handleTerms = () => {
    setSelected(5);
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
              userRole: userInfo.role,
            });

            localStorage.setItem('userProfilePic', userInfo.profilePic);
            //localStorage.setItem('userProfileLink', userInfo.profileLink);
            localStorage.setItem('name', userInfo.name);
            localStorage.setItem('nickname', userInfo.nickname);
            localStorage.setItem('studentId', userInfo.studentId);
            localStorage.setItem('firstMajor', userInfo.firstMajor);
            localStorage.setItem('role', userInfo.role);
            localStorage.setItem('email', userInfo.email);
            localStorage.setItem('campus', userInfo.campus);
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
                    <MenuOption onClick={handleSettings}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width=" 4.44vw"
                        height=" 4.44vw"
                        viewBox="0 0 16 17"
                        fill="none"
                      >
                        <path
                          d="M8.63287 2.63379C8.80535 2.63379 8.95964 2.74115 9.01771 2.90189L9.43189 4.04999C9.58031 4.08695 9.70761 4.12391 9.81555 4.16262C9.93347 4.20486 10.0854 4.26881 10.2731 4.35622L11.2376 3.84583C11.3163 3.80412 11.4064 3.78907 11.4944 3.80292C11.5824 3.81678 11.6636 3.8588 11.7257 3.92268L12.574 4.79974C12.6866 4.91648 12.7183 5.0872 12.6549 5.23621L12.2026 6.29631C12.2777 6.43417 12.3375 6.55209 12.3833 6.65065C12.4326 6.75801 12.4936 6.90584 12.5663 7.09651L13.6205 7.54824C13.7789 7.6157 13.8769 7.7741 13.8663 7.94365L13.7889 9.16096C13.7836 9.24005 13.7552 9.31584 13.7073 9.37893C13.6593 9.44203 13.5938 9.48965 13.5191 9.51589L12.5206 9.87082C12.4918 10.0087 12.4619 10.1266 12.4302 10.2263C12.3791 10.3804 12.3208 10.5319 12.2554 10.6804L12.757 11.7892C12.7924 11.8671 12.8019 11.9543 12.7842 12.038C12.7665 12.1217 12.7224 12.1976 12.6584 12.2544L11.7046 13.1062C11.6417 13.1621 11.5633 13.1974 11.4799 13.2075C11.3964 13.2176 11.3119 13.2019 11.2376 13.1626L10.2544 12.6416C10.1005 12.7231 9.94184 12.795 9.77918 12.8569L9.34976 13.0177L8.96844 14.0737C8.94018 14.151 8.88921 14.218 8.8222 14.2658C8.7552 14.3137 8.6753 14.3401 8.59298 14.3418L7.47835 14.367C7.39385 14.3692 7.31074 14.3452 7.24046 14.2982C7.17018 14.2513 7.11618 14.1837 7.08589 14.1047L6.63652 12.9156C6.48319 12.8632 6.33139 12.8065 6.18128 12.7455C6.0585 12.6923 5.93758 12.635 5.81873 12.5736L4.7041 13.0499C4.63066 13.0813 4.54969 13.0906 4.47105 13.0767C4.39241 13.0629 4.3195 13.0264 4.26118 12.9719L3.43636 12.1981C3.37495 12.1407 3.33313 12.0655 3.31681 11.9831C3.30049 11.9007 3.3105 11.8152 3.34543 11.7387L3.82472 10.6945C3.76098 10.5708 3.70188 10.4448 3.64755 10.3167C3.58414 10.1599 3.52545 10.0012 3.47156 9.8409L2.42146 9.52117C2.3361 9.49537 2.26166 9.44211 2.20968 9.36966C2.1577 9.2972 2.1311 9.20961 2.134 9.12048L2.17507 7.99351C2.17799 7.91998 2.20096 7.84865 2.24149 7.78723C2.28203 7.72581 2.33858 7.67664 2.40504 7.64504L3.50676 7.11587C3.5578 6.92872 3.60238 6.78323 3.64169 6.67705C3.69703 6.53522 3.75849 6.39586 3.82589 6.25935L3.34836 5.25029C3.31212 5.17366 3.30112 5.08752 3.31693 5.00424C3.33274 4.92096 3.37456 4.84484 3.43636 4.78683L4.26001 4.00892C4.31775 3.95446 4.38999 3.91785 4.46805 3.90349C4.54611 3.88912 4.62666 3.89762 4.7 3.92796L5.81345 4.3879C5.93665 4.30577 6.04811 4.23948 6.14901 4.18609C6.26928 4.12215 6.43002 4.05527 6.63241 3.98311L7.0196 2.90307C7.04822 2.82403 7.10054 2.75575 7.16942 2.70755C7.2383 2.65936 7.32037 2.6336 7.40444 2.63379H8.63287ZM8.01455 6.75155C7.03661 6.75155 6.24405 7.53474 6.24405 8.50156C6.24405 9.46837 7.03661 10.2522 8.01455 10.2522C8.9919 10.2522 9.78446 9.46837 9.78446 8.50156C9.78446 7.53474 8.99249 6.75155 8.01455 6.75155Z"
                          stroke="black"
                          stroke-width="1.5"
                        />
                      </svg>
                      <MenuText1>환경설정</MenuText1>
                    </MenuOption>
                    <MenuOption onClick={handleTerms} style={{ marginTop: '3.06vw' }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width=" 4.44vw"
                        height=" 4.44vw"
                        viewBox="0 0 16 17"
                        fill="none"
                      >
                        <path
                          d="M6.00033 7.16683H6.66699C6.8438 7.16683 7.01337 7.09659 7.1384 6.97157C7.26342 6.84654 7.33366 6.67697 7.33366 6.50016C7.33366 6.32335 7.26342 6.15378 7.1384 6.02876C7.01337 5.90373 6.8438 5.8335 6.66699 5.8335H6.00033C5.82351 5.8335 5.65395 5.90373 5.52892 6.02876C5.4039 6.15378 5.33366 6.32335 5.33366 6.50016C5.33366 6.67697 5.4039 6.84654 5.52892 6.97157C5.65395 7.09659 5.82351 7.16683 6.00033 7.16683ZM6.00033 8.50016C5.82351 8.50016 5.65395 8.5704 5.52892 8.69543C5.4039 8.82045 5.33366 8.99002 5.33366 9.16683C5.33366 9.34364 5.4039 9.51321 5.52892 9.63823C5.65395 9.76326 5.82351 9.8335 6.00033 9.8335H10.0003C10.1771 9.8335 10.3467 9.76326 10.4717 9.63823C10.5968 9.51321 10.667 9.34364 10.667 9.16683C10.667 8.99002 10.5968 8.82045 10.4717 8.69543C10.3467 8.5704 10.1771 8.50016 10.0003 8.50016H6.00033ZM13.3337 6.46016C13.3267 6.39892 13.3133 6.33858 13.2937 6.28016V6.22016C13.2616 6.15162 13.2188 6.08861 13.167 6.0335L9.16699 2.0335C9.11188 1.98164 9.04887 1.93888 8.98033 1.90683C8.96043 1.904 8.94023 1.904 8.92033 1.90683C8.8526 1.86799 8.77781 1.84306 8.70033 1.8335H4.66699C4.13656 1.8335 3.62785 2.04421 3.25278 2.41928C2.87771 2.79436 2.66699 3.30306 2.66699 3.8335V13.1668C2.66699 13.6973 2.87771 14.206 3.25278 14.581C3.62785 14.9561 4.13656 15.1668 4.66699 15.1668H11.3337C11.8641 15.1668 12.3728 14.9561 12.7479 14.581C13.1229 14.206 13.3337 13.6973 13.3337 13.1668V6.50016C13.3337 6.50016 13.3337 6.50016 13.3337 6.46016ZM9.33366 4.10683L11.0603 5.8335H10.0003C9.82351 5.8335 9.65395 5.76326 9.52892 5.63823C9.4039 5.51321 9.33366 5.34364 9.33366 5.16683V4.10683ZM12.0003 13.1668C12.0003 13.3436 11.9301 13.5132 11.8051 13.6382C11.68 13.7633 11.5105 13.8335 11.3337 13.8335H4.66699C4.49018 13.8335 4.32061 13.7633 4.19559 13.6382C4.07056 13.5132 4.00033 13.3436 4.00033 13.1668V3.8335C4.00033 3.65669 4.07056 3.48712 4.19559 3.36209C4.32061 3.23707 4.49018 3.16683 4.66699 3.16683H8.00033V5.16683C8.00033 5.69726 8.21104 6.20597 8.58611 6.58104C8.96118 6.95612 9.46989 7.16683 10.0003 7.16683H12.0003V13.1668ZM10.0003 11.1668H6.00033C5.82351 11.1668 5.65395 11.2371 5.52892 11.3621C5.4039 11.4871 5.33366 11.6567 5.33366 11.8335C5.33366 12.0103 5.4039 12.1799 5.52892 12.3049C5.65395 12.4299 5.82351 12.5002 6.00033 12.5002H10.0003C10.1771 12.5002 10.3467 12.4299 10.4717 12.3049C10.5968 12.1799 10.667 12.0103 10.667 11.8335C10.667 11.6567 10.5968 11.4871 10.4717 11.3621C10.3467 11.2371 10.1771 11.1668 10.0003 11.1668Z"
                          fill="black"
                        />
                      </svg>
                      <MenuText1>약관 보기</MenuText1>
                    </MenuOption>
                    <Vector />
                    <MenuOption onClick={handleLogout} style={{ marginTop: '3.89vw' }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width=" 4.44vw"
                        height=" 4.44vw"
                        viewBox="0 0 16 17"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M11.2331 4.60053C10.9206 4.28811 10.4141 4.28811 10.1017 4.60053C9.78928 4.91294 9.78928 5.41948 10.1017 5.7319L12.0696 7.6998H6.0002C5.55837 7.6998 5.2002 8.05798 5.2002 8.4998C5.2002 8.94163 5.55837 9.2998 6.0002 9.2998H12.0691L10.1017 11.2672C9.78928 11.5796 9.78928 12.0861 10.1017 12.3986C10.4141 12.711 10.9206 12.711 11.2331 12.3986L14.5664 9.06523C14.8788 8.75281 14.8788 8.24628 14.5664 7.93386L11.2331 4.60053Z"
                          fill="#141414"
                        />
                        <path
                          d="M6 14.5H3.33333C2.97971 14.5 2.64057 14.3595 2.39052 14.1095C2.14048 13.8594 2 13.5203 2 13.1667V3.83333C2 3.47971 2.14048 3.14057 2.39052 2.89052C2.64057 2.64048 2.97971 2.5 3.33333 2.5H6"
                          stroke="#141414"
                          stroke-width="1.6"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
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
      <ButtonWrapper>
        <HeaderButton state={buttonStates[0]} onClick={() => navigate('/landing')}>
          실시간 지원 현황
        </HeaderButton>
        <HeaderButton state={buttonStates[1]} onClick={() => navigate('/archive')}>
          합격자료
        </HeaderButton>
        <HeaderButton state={buttonStates[2]} onClick={() => navigate('/myboard')}>
          마이보드
        </HeaderButton>
      </ButtonWrapper>
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

const ButtonWrapper = styled.div`
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  gap: 7.5vw;
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
  background-image: url('${process.env.PUBLIC_URL}/designImage/character/rectProfile/${(props) =>
    props.userProfilePic}.png');
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
