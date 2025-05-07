import MyBoardPage from './pages/myBoard/MyBoardPage';
// import MyBoardPage from './pages/myBoard/OldMyBoardPage';
import LandingPage from './pages/main/LandingPage';
import LoginPage from './pages/login/OldLoginPage';
import PreviousPage from './pages/archive/PreviousPage';
import ArchiveDetailPage from './pages/archive/ArchiveDetailPage';
import { SignUp1Page } from './pages/signUp/NewSignUpPage1';
import { SignUp2Page } from './pages/signUp/NewSignUpPage2';
import SignUp3Page from './pages/signUp/NewSignUpPage3';
import { SignUp4Page, SignUp4PageCandidate, SignUp4PagePasser } from './pages/signUp/NewSignUpPage4';
import SettingsPage from './pages/setting/SettingsPage';
import SignUp5Page from './pages/signUp/NewSignUpPage5';
import { SignUp5Complete } from './pages/signUp/NewSignUpPage5';
import SyncPage0 from './pages/sync/SyncPage0';
import SyncPage1 from './pages/sync/SyncPage1';
import SyncPage2, { Sync2Complete } from './pages/sync/SyncPage2';
import DeletePage from './pages/delete/DeletePage';
//import DashboardMainPage from './admin/AdminPage';
import UserPage from './admin/pages/user';
import { IndexPage } from './admin/routes/sections';
import OnboardingPage from './pages/main/OnboardingPage';
import OAuthPage from './pages/login/OAuthPage';

const isLogined = true;

export const mainRoutes = [
  { path: '/', element: <OnboardingPage /> },
  { path: '/login', element: <LoginPage setLogin={(isLogined) => isLogined == true} /> },
  { path: '/oauth-koreapas/:koreapasUUID?', element: <OAuthPage /> },
];

export const authRoutes = [
  { path: '/landing', element: <LandingPage /> },
  { path: '/myboard', element: <MyBoardPage /> },
  { path: '/archive/:majorName', element: <ArchiveDetailPage /> },
  { path: '/archive', element: <PreviousPage /> },
  // 상태관리 도입 예정으로, 잠시 삭제
  { path: '/settings', element: <SettingsPage /> },
  // { path: '/settings', element: <SettingsPage /> },
  { path: '/delete', element: <DeletePage /> },
];

export const signupRoutes = [
  { path: '/join', element: <SignUp1Page /> },
  // { path: '/signup0', element: <SignUp0Page /> },
  { path: '/signup1', element: <SignUp1Page /> },
  { path: '/signup2', element: <SignUp2Page /> },
  { path: '/signup3', element: <SignUp3Page /> },
  { path: '/signup4', element: <SignUp4Page /> },
  { path: '/signup4-candidate', element: <SignUp4PageCandidate /> },
  { path: '/signup4-passer', element: <SignUp4PagePasser /> },
  { path: '/signup5', element: <SignUp5Page /> },
  { path: '/signupcomplete', element: <SignUp5Complete /> },
];

export const adminRoutes = [
  { path: '/admin', element: <IndexPage /> },
  { path: '/adminUser', element: <UserPage /> },
  { path: '/adminMajor', element: <UserPage /> },
  { path: '/adminApply', element: <UserPage /> },
  { path: '/adminUpdate', element: <UserPage /> },
];

export const syncRoutes = [
  { path: '/sync0', element: <SyncPage0 /> },
  { path: '/sync1', element: <SyncPage1 /> },
  { path: '/sync2', element: <SyncPage2 /> },
  { path: '/synccomplete', element: <Sync2Complete /> },
];
