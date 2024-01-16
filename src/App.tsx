import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from './components/base/Header';
import Footer from './components/base/Footer';
import MainPage from './pages/MainPage';
import MyBoardPage from './pages/MyBoard/MyBoardPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import PreviousPage from './pages/PreviousPage';
import ArchiveDetailPage from './pages/ArchiveDetailPage';
import CommunityPage from './pages/CommunityPage';
import MessagePage from './pages/MessagePage';
import SettingsPage from './pages/SettingsPage';
import SignUp1Page from './pages/SignUp/SignUp1Page';
import SignUp2Page from './pages/SignUp/SignUp2Page';
import SignUp3Page from './pages/SignUp/SignUp3Page';
import AuthRequired from './AuthRequired';
import { SignUp4Page, SignUp4PageCandidate, SignUp4PagePasser } from './pages/SignUp/SignUp4Page';
import { SignUp5Page, SignUp5Complete } from './pages/SignUp/SignUp5Page';
import DeletePage from './pages/DeletePage';
import RouteChangeTracker from './RouteChangeTracker'; // GA 추적 목적
import DashboardMainPage from './admin/AdminPage';

import { BrowserView, MobileView, isMobile } from 'react-device-detect';
import MobilePage from './Mobile';

const Wrapper = styled.div`
  position: flex; //absolute;
  width: 100vw; // 1920px;
  // max-width: 1920px;
  // height: 100vh;
  margin-top: 80px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// marginTop 은 Header 에 페이지가 가리지 않게 하기 위해서.
export default function App() {
  RouteChangeTracker();
  const [isLogined, setisLogined] = useState<boolean>(true); // 작업 위해 수정
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    if (window.localStorage.isLogin === 'true') setisLogined(true);
    else setisLogined(false);
  }, []);
  // element={<AuthRequired />}
  // 현재 MainPage 에만, pageView 이벤트 추적기 삽입

  return (
    <>
      {isMobile ? (
        <MobilePage />
      ) : (
        <Wrapper>
          <Header logined={isLogined} setLogin={setisLogined} setSelected={setSelected} />
          <Routes>
            <Route element={<AuthRequired />}>
              <Route path="/archive/:majorName" element={<ArchiveDetailPage />} />
              <Route path="/myboard" element={<MyBoardPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/message" element={<MessagePage />} />
              <Route path="/settings" element={<SettingsPage selected={selected} setSelected={setSelected} />} />
              <Route path="/delete" element={<DeletePage />} />
            </Route>

            <Route path="/admin" element={<DashboardMainPage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/archive" element={<PreviousPage />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/join" element={<SignUp1Page />} />
            <Route path="/signup1" element={<SignUp1Page />} />
            <Route path="/signup2" element={<SignUp2Page />} />
            <Route path="/signup3" element={<SignUp3Page />} />
            <Route path="/signup4" element={<SignUp4Page />} />
            <Route path="/signup4-candidate" element={<SignUp4PageCandidate />} />
            <Route path="/signup4-passer" element={<SignUp4PagePasser />} />
            <Route path="/signup5" element={<SignUp5Page />} />
            <Route path="/signupcomplete" element={<SignUp5Complete />} />
          </Routes>
          <Footer setSelected={setSelected} />
        </Wrapper>
      )}
    </>
  );
}
