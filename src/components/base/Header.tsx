/* eslint-disable no-restricted-globals */
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Logo from '../../assets/OldLogo';
import HeaderButton from '../../assets/buttons/header/HeaderButton';
import LabelButton from '../../assets/buttons/LabelButton';
import React, { useCallback, useEffect, useState } from 'react';
import { client } from '../../utils/HttpClient';
import { TextButton02, TextButton03LNB, TextButton06 } from '../../assets/buttons/TextButton';
import { useRecoilState } from 'recoil';
import { SBContentState } from '../../store/atom';

export interface HeaderProps {
  logined: boolean;
  setLogin: (state: boolean) => void;
  //setSelected: (selected: number) => void;
}

export default function Header({ logined, setLogin }: HeaderProps) {
  const [selected, setSelected] = useRecoilState(SBContentState);
  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;

  const headerToggleRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (accessToken) {
      setLogin(true);
    }
  }, [accessToken]);

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };
  const [userData, setUserData] = useState(() => ({
    userName: '',
    userNickname: '',
    userProfilePic: 'rectProfile1',
    userProfileLink: '',
    userRole: 'candidate',
    firstMajor: '',
    studentId: '',
    hopeMajor1: '경영학과',
    hopeMajor2: '컴퓨터학과',
    curGPA: 4.5,
    hopeSemester: '2023-2',
  }));
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        if (logined) {
          await client.get('/user/getMe').then((res) => {
            const userInfo = res.data.data.user;

            setUserData({
              ...userData,
              userName: userInfo.name,
              userNickname: userInfo.nickname,
              userProfilePic: userInfo.profilePic,
              userProfileLink: userInfo.profileLink,
              userRole: userInfo.role,
              firstMajor: userInfo.firstMajor,
              studentId: userInfo.studentId,
              hopeMajor1: userInfo.hopeMajor1,
              hopeMajor2: userInfo.hopeMajor2,
              curGPA: userInfo.curGPA,
              hopeSemester: userInfo.hopeSemester,
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

  const navigate = useNavigate();

  const handleMenu1Click = () => {
    if (logined) {
      navigate('/archive');
    } else {
      const confirmation = window.confirm('로그인이 필요한 서비스입니다. 로그인 후 이용해주세요.');
      if (confirmation) {
        navigate('/login');
      }
    }
  };
  const handleMenu2Click = () => {
    if (logined) {
      navigate('/myboard');
    } else {
      const confirmation = window.confirm('로그인이 필요한 서비스입니다. 로그인 후 이용해주세요.');
      if (confirmation) {
        navigate('/login');
      }
    }
  };
  const handleMenu3Click = () => {
    if (logined) {
      navigate('/landing');
    } else {
      const confirmation = window.confirm('로그인이 필요한 서비스입니다. 로그인 후 이용해주세요.');
      if (confirmation) {
        navigate('/login');
      }
    }
  };
  const handleMenu4Click = () => {
    navigate('/notice'); // TODO: 고객센터의 로그인 필요 여부에 대해 논의 필요
  };
  const handleSettingsClick = () => {
    setSelected(0);
    setToggle(false);
    navigate('/settings');
  };
  const handleMessageClick = () => {
    setSelected(4);
    setToggle(false);
    navigate('/settings');
  };
  const handleLoginClick = () => {
    navigate('/login');
  };
  const handleAdminClick = () => {
    navigate('/admin');
  };

  const [, , removeCookie] = useCookies(['accessToken', 'accessTokenExpire', 'refreshToken']);

  const onLogoutClick = async () => {
    try {
      await client.get('/auth/logout');
      removeCookie('accessToken', { path: '/' });
      removeCookie('accessTokenExpire', { path: '/' });
      removeCookie('refreshToken', { path: '/' });
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

  const [toggle, setToggle] = useState(false);
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (toggle && headerToggleRef && headerToggleRef.current && !headerToggleRef.current.contains(e.target as Node)) {
        setToggle(false);
      }
    },
    [toggle, headerToggleRef],
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleToggle = () => {
    setTimeout(() => {
      setToggle(!toggle);
    }, 100);
  };

  return (
    <Wrapper>
      <FlexContainer>
        <LeftButtonsContainer>
          <LogoContainer>
            <Logo />
          </LogoContainer>
          <HeaderButtonContainer>
            <HeaderButton onClick={handleMenu3Click} activated={location.pathname === '/landing'}>
              실시간 지원현황
            </HeaderButton>
            <HeaderButton onClick={handleMenu1Click} activated={location.pathname === '/archive'}>
              합격자료
            </HeaderButton>
            <HeaderButton onClick={handleMenu2Click} activated={location.pathname === '/myboard'}>
              마이보드
            </HeaderButton>
            {/* <HeaderButton onClick={handleMenu4Click} activated={location.pathname === '/notice'}>
              고객센터
            </HeaderButton> */}
            {/* <HeaderButton onClick={handleAdminClick} activated={location.pathname === '/admin'}>
              관리자
            </HeaderButton> */}
          </HeaderButtonContainer>
        </LeftButtonsContainer>
        <LoginContainer>
          {logined ? (
            <>
              <TextButton06
                fontSize="14px"
                nickName={userData.userNickname}
                onCustomFunction={handleToggle}
              ></TextButton06>

              {toggle && (
                <SettingToggleWrapper ref={headerToggleRef}>
                  <Profile>
                    <img
                      src={process.env.PUBLIC_URL + `/designImage/character/rectProfile/${userData.userProfilePic}.png`}
                      width={112}
                      alt="profile"
                    />
                    <ProfileText>
                      <strong>{userData.userNickname}</strong>
                      <br />
                      <span>{userData.userRole === 'candidate' ? '도전자 님' : '합격자 님'}</span>
                    </ProfileText>
                  </Profile>
                  <ProfileButtons>
                    {/* <ProfileButton onClick={handleSettingsClick}>환경설정</ProfileButton>
                  <ProfileButton onClick={handleMessageClick}>약관 보기</ProfileButton> */}
                    <TextButton03LNB onClick={handleSettingsClick} style={{ paddingLeft: '19px' }}>
                      환경설정
                    </TextButton03LNB>
                    <TextButton03LNB onClick={handleMessageClick} style={{ paddingLeft: '19px' }}>
                      약관 보기
                    </TextButton03LNB>

                    <svg xmlns="http://www.w3.org/2000/svg" width="328" height="2" viewBox="0 0 328 2" fill="none">
                      <path d="M327 1.20996L0.999993 1.20996" stroke="#DFDFDF" stroke-linecap="round" />
                    </svg>
                    {/* <ProfileButton onClick={onLogoutClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M14.0406 5.12639C13.6501 4.73587 13.0169 4.73587 12.6264 5.12639C12.2359 5.51691 12.2359 6.15008 12.6264 6.5406L15.0859 9.00012H7.5C6.94772 9.00012 6.5 9.44784 6.5 10.0001C6.5 10.5524 6.94772 11.0001 7.5 11.0001H15.086L12.6264 13.4597C12.2359 13.8502 12.2359 14.4834 12.6264 14.8739C13.0169 15.2645 13.6501 15.2645 14.0406 14.8739L18.2073 10.7073C18.5978 10.3167 18.5978 9.68358 18.2073 9.29306L14.0406 5.12639Z"
                        fill="#141414"
                      />
                      <path
                        d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5"
                        stroke="#141414"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="arrow"
                      />
                    </svg>
                    로그아웃
                  </ProfileButton> */}

                    <TextButton02 onClick={onLogoutClick} style={{ paddingLeft: '0.989vw' }}>
                      로그아웃
                    </TextButton02>
                  </ProfileButtons>
                </SettingToggleWrapper>
              )}
            </>
          ) : (
            <LabelButton
              className="login"
              size="medium"
              buttonType="secondary"
              onClick={handleLoginClick}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              Log in
            </LabelButton>
          )}
        </LoginContainer>
      </FlexContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  align-items: center;
  width: 100vw;
  // max-width: 1920px;
  //max-width: 1920px;
  height: 70px; // 7.7%; // 96px; (96/1248 = 7.7)
  box-sizing: border-box;
  position: fixed;
  top: 0;
  display: flex;
  background: #fff;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const FlexContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  // max-width: 1664px;
  padding: 0 6.67vw;
  justify-content: space-between;

  @media screen and (max-width: 600px) {
    padding: 0 16px;
  }
`;

const HeaderButtonContainer = styled.div`
  width: 80%;
  display: flex;
  padding: 0 2vw;
  align-items: center;
  justify-content: start;

  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: row;
    height: 45px; /* 아이템의 높이를 부모 요소에 맞춤 */
    flex-basis: 100%; /* 아이템의 초기 크기를 100%로 설정하여 가로로 채우도록 함 */
  }
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 600px) {
    height: 36px; /* 아이템의 높이를 부모 요소에 맞춤 */

    & button {
      height: 36px;
    }

    & img {
      height: 100%;
      object-fit: contain;
    }
  }
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > button {
    max-width: 120px;
    white-space: nowrap;
  }

  .login {
    height: 60%;
    font-size: 16px;
  }

  @media screen and (max-width: 600px) {
    height: 45px; /* 아이템의 높이를 부모 요소에 맞춤 */
    width: 20%;
    .login {
      padding: 8px 16px;
      height: 75%;
      max-height: 36px;
    }
  }

  //border: 1px solid black;
`;

const LeftButtonsContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 600px) {
    flex-wrap: wrap; /* 요소들을 여러 줄에 걸쳐 배치할 수 있도록 설정 */
  }
`;

const SettingToggleWrapper = styled.div`
  position: fixed;
  top: 84px;
  right: 100px;
  width: 394px;
  height: 490px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.9);

  /* 5020 */
  box-shadow: 0px 20px 50px 0px rgba(223, 223, 223, 0.4);
  backdrop-filter: blur(9px);

  @media screen and (max-width: 600px) {
    top: 84px;
    right: 10px;
    width: 80vw;
    height: 490px;
  }
`;

const Profile = styled.div`
  width: 181.236px;
  height: 180.867px;
  margin-top: 55px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const ProfileText = styled.div`
  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  text-align: center;
  line-height: 26px;

  span {
    color: rgba(20, 20, 20, 0.8);
  }
`;

const ProfileButtons = styled.div`
  margin-top: 30px;
  width: 326px;
  display: flex;
  flex-direction: column;
  gap: 35px;
`;

const ProfileButton = styled.div`
  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 100% */
  display: flex;
  gap: 3px;
  padding-left: 19px;

  &:hover {
    color: #14141499;
    cursor: pointer;
    svg path {
      stroke: #14141499;
    }

    &.arrow {
      fill: #14141499;
    }
  }
`;
