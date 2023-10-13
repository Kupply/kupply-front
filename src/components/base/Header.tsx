/* eslint-disable no-restricted-globals */
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Logo from '../../assets/Logo';
import HeaderButton from '../../assets/buttons/header/HeaderButton';
import MailButton from '../../assets/buttons/header/MailButton';
import SettingButton from '../../assets/buttons/header/SettingButton';
import LabelButton from '../../assets/buttons/LabelButton';

const Wrapper = styled.div`
  align-items: center;
  width: 100vw;
  max-width: 2560px;
  //max-width: 1920px;
  height: 96px; // 7.7%; // 96px; (96/1248 = 7.7)
  position: fixed;
  top: 0;
  display: flex;
  background: #fff;
  align-items: center;
  justify-content: center;
  z-index: 3;
`;

const FlexContainer = styled.div`
  display: flex;
  width: 100%;
  // max-width: 1664px;
  padding: 0 128px;
  justify-content: space-between;
`;

const HeaderButtonContainer = styled.div`
  display: flex;
  gap: 2px;
  margin-left: 37px;
  align-items: center;
  justify-content: center;
`;

const HeaderIconButtonContainer = styled.div`
  display: flex;
  gap: 26px;
  align-items: center;
  justify-content: center;
`;

const LeftButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export interface HeaderProps {
  logined: boolean;
  setLogin: (state: boolean) => void;
}

export default function Header({ logined, setLogin }: HeaderProps) {
  const navigate = useNavigate();
  const handleMenu1Click = () => {
    navigate('/archive');
  };
  const handleMenu2Click = () => {
    navigate('/myboard');
  };
  const handleMenu3Click = () => {
    navigate('/community');
  };
  const handleSettingsClick = () => {
    navigate('/settings');
  };
  const handleMessageClick = () => {
    navigate('/message');
  };
  const handleLoginClick = () => {
    navigate('/login');
  };

  const [, , removeCookie] = useCookies(['accessToken']);

  const onLogoutClick = async () => {
    const url = 'http://localhost:8080/auth/logout';
    try {
      await axios.get(url);
      removeCookie('accessToken', { path: '/' });
      window.localStorage.clear();
      setLogin(false);
      navigate('/');
    } catch (err) {
      // 이후 수정 필요함.
      alert(err);
    }
  };

  return (
    <Wrapper>
      <FlexContainer>
        <LeftButtonsContainer>
          <Logo />
          <HeaderButtonContainer>
            <HeaderButton onClick={handleMenu1Click} activated={location.pathname === '/previous'}>
              합격자료
            </HeaderButton>
            <HeaderButton onClick={handleMenu2Click} activated={location.pathname === '/myboard'}>
              마이보드
            </HeaderButton>
            <HeaderButton onClick={handleMenu3Click} activated={location.pathname === '/community'}>
              커뮤니티
            </HeaderButton>
          </HeaderButtonContainer>
        </LeftButtonsContainer>
        {logined ? (
          <HeaderIconButtonContainer>
            <LabelButton size="medium" buttonType="secondary" onClick={onLogoutClick}>
              Log out
            </LabelButton>
            <MailButton onClick={handleMessageClick} />
            <SettingButton onClick={handleSettingsClick} />
          </HeaderIconButtonContainer>
        ) : (
          <LabelButton size="medium" buttonType="secondary" onClick={handleLoginClick}>
            Log in
          </LabelButton>
        )}
      </FlexContainer>
    </Wrapper>
  );
}
