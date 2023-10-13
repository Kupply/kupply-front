import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect, createContext } from 'react';
import styled from 'styled-components';
import Header from './components/base/Header';
import Footer from './components/base/Footer';
import MainPage from './pages/MainPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import PreviousPage from './pages/PreviousPage';
import ArchiveDetailPage from './pages/ArchiveDetailPage';
import MyBoardPage from './pages/MyBoard/MyBoardPage';
import CommunityPage from './pages/CommunityPage';
import MessagePage from './pages/MessagePage';
import SettingsPage from './pages/SettingsPage';
import SignUp1Page from './pages/SignUp/SignUp1Page';
import SignUp2Page from './pages/SignUp/SignUp2Page';
import SignUp3Page from './pages/SignUp/SignUp3Page';
// import AuthRequired from './AuthRequired';
import { SignUp4Page, SignUp4PageCandidate, SignUp4PagePasser } from './pages/SignUp/SignUp4Page';
import { SignUp5Page, SignUp5Complete } from './pages/SignUp/SignUp5Page';

const Wrapper = styled.div`
  width: 100vw; // 1920px;
  height: 100vh; //1248px; // Footer 요소가 포함이 되지 않는 관계로, 1510px 에서 Footer 높이를 제외한 높이
  max-width: 2560px;
  max-height: 1510px;
  margin-top: 96px; // header 높이와 동일 (구체적인 헤더 높이의 기준을 알 수 없어 우선 px 값으로 지정)
  box-sizing: border-box;

  align-items: center;
`;

// marginTop 은 Header 에 페이지가 가리지 않게 하기 위해서.
export default function App() {
  const [isLogined, setisLogined] = useState<boolean>(false);

  useEffect(() => {
    if (window.localStorage.isLogin === 'true') setisLogined(true);
    else setisLogined(false);
  }, []);

  // element={<AuthRequired />}
  return (
    <Wrapper>
      <Header logined={isLogined} setLogin={setisLogined} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage setLogin={setisLogined} />} />
        <Route>
          <Route path="/archive" element={<PreviousPage />} />
          <Route path="/archive/:majorName" element={<ArchiveDetailPage />} />
          <Route path="/myboard" element={<MyBoardPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/message" element={<MessagePage />} />
        </Route>
        <Route path="/join" element={<SignUp1Page />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/signup1" element={<SignUp1Page />} />
        <Route path="/signup2" element={<SignUp2Page />} />
        <Route path="/signup3" element={<SignUp3Page />} />
        <Route path="/signup4" element={<SignUp4Page />} />
        <Route path="/signup4-candidate" element={<SignUp4PageCandidate />} />
        <Route path="/signup4-passer" element={<SignUp4PagePasser />} />
        <Route path="/signup5" element={<SignUp5Page />} />
        <Route path="/signupcomplete" element={<SignUp5Complete />} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
      <Footer />
    </Wrapper>
  );
}
