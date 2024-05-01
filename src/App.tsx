import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/base/Header';
import Footer from './components/base/Footer';
import OnboardingPage from './pages/main/OnboardingPage';
import MyBoardPage from './pages/myBoard/MyBoardPage';
import LandingPage from './pages/landing/LandingPage';
import PreviousPage from './pages/archive/PreviousPage';
import ArchiveDetailPage from './pages/archive/ArchiveDetailPage';
import CommunityPage from './pages/community/CommunityPage';
import MessagePage from './pages/message/MessagePage';
import { SettingsPage } from './pages/setting/SettingsPage';
import { SignUp1Page } from './pages/signUp/SignUp1Page';
import SignUp2Page from './pages/signUp/SignUp2Page';
import SignUp3Page from './pages/signUp/SignUp3Page';
import { isMobile } from 'react-device-detect';
import MobilePage from './pages/mobile/Mobile';
import { mainRoutes, authRoutes, signupRoutes, adminRoutes } from './Routes';
import AuthRequired from './AuthRequired';
import AdminRequired from './AdminRequred';
import RouteChangeTracker from './RouteChangeTracker';
import { RecoilRoot } from 'recoil';
import SignUpPage0 from './mobile/pages/signup/SignupPage0';
import SignUpPage1 from './mobile/pages/signup/SignupPage1';
import SignUpPage2 from './mobile/pages/signup/SignupPage2';
import SignUpPage3 from './mobile/pages/signup/SignupPage3';
//import SignUpPage4 from './mobile/pages/signup/SignupPage4';
import SignUpPage4, { SignUp4PageCandidate, SignUp4PagePasser } from './mobile/pages/signup/SignupPage4';

import MobileTest from './pages/mobile/MobileTest';
import MobileArchivePage from './pages/mobile/MobileArchive';
import MobileArchiveDetailPage from './pages/mobile/MobileArchiveDetail';

interface RouteConfig {
  path: string;
  element: React.ReactNode;
}

export default function App() {
  RouteChangeTracker();
  const [isLogined, setisLogined] = useState<boolean>(true); // 개발 동안은 로그인 상태 유지
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (window.localStorage.isLogin === 'true') setisLogined(true);
    else setisLogined(false);
  }, []);

  const renderRoutes = (routes: RouteConfig[]) =>
    routes.map((route: RouteConfig, index: number) => <Route key={index} path={route.path} element={route.element} />);

  return (
    <RecoilRoot>
      {isMobile ? (
        // <MobilePage />
        // <MobileTest />
        // <MobileArchiveDetailPage />
        <MobileArchivePage />
      ) : (
        <Wrapper>
          <Header logined={isLogined} setLogin={setisLogined} setSelected={setSelected} />
          <Routes>
            <Route element={<AuthRequired />}>{renderRoutes(authRoutes)}</Route>
            <Route element={<AdminRequired />}>{renderRoutes(adminRoutes)}</Route>
            {renderRoutes(mainRoutes)}
            {renderRoutes(signupRoutes)}
          </Routes>
          <Footer setSelected={setSelected} />
        </Wrapper>
      )}
    </RecoilRoot>
  );
}

const Wrapper = styled.div`
  position: flex;
  width: 100vw;
  margin-top: 70px; // 96px
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/*
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
            <Route path="/adminUser" element={<UserPage />} />
            <Route path="/adminMajor" element={<ProductsPage />} />
            <Route path="/adminApply" element={<BlogPage />} />
            <Route path="/adminUpdate" element={<UserPage />} />

            <Route path="/landing" element={<LandingPage />} />
            <Route path="/archive" element={<PreviousPage />} />
            <Route path="/" element={<OnboardingPage />} />
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
*/
