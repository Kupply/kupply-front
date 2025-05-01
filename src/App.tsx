import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/base/Header';
import Footer from './components/base/Footer';
import { isMobile } from 'react-device-detect';
import { mainRoutes, authRoutes, signupRoutes, adminRoutes, syncRoutes } from './Routes';
import AuthRequired from './AuthRequired';
import AdminRequired from './AdminRequred';
import RouteChangeTracker from './RouteChangeTracker';
import { RecoilRoot } from 'recoil';
import { mobileAuthRoutes, mobileMainRoutes, mobileSignupRoutes, mobileSyncRoutes } from './MobileRoutes';
import { useRecoilState } from 'recoil';
import { SBContentState } from './store/atom';

interface RouteConfig {
  path: string;
  element: React.ReactNode;
}

export default function App() {
  RouteChangeTracker();
  const [isLogined, setisLogined] = useState<boolean>(false); // 개발 동안은 로그인 상태 유지

  useEffect(() => {
    if (window.localStorage.isLogin === 'true') setisLogined(true);
    else setisLogined(false);
  }, []);

  const renderRoutes = (routes: RouteConfig[]) =>
    routes.map((route: RouteConfig, index: number) => <Route key={index} path={route.path} element={route.element} />);

  return (
    <RecoilRoot>
      {isMobile ? (
        <>
          <Routes>
            <Route element={<AuthRequired />}>{renderRoutes(mobileAuthRoutes)}</Route>
            {renderRoutes(mobileMainRoutes)}
            {renderRoutes(mobileSignupRoutes)}
            {renderRoutes(mobileSyncRoutes)}
          </Routes>
        </>
      ) : (
        <Wrapper>
          <Header logined={isLogined} setLogin={setisLogined} />
          <Routes>
            <Route element={<AuthRequired />}>{renderRoutes(authRoutes)}</Route>
            <Route element={<AdminRequired />}>{renderRoutes(adminRoutes)}</Route>
            {renderRoutes(mainRoutes)}
            {renderRoutes(signupRoutes)}
            {renderRoutes(syncRoutes)}
          </Routes>
          <Footer />
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
