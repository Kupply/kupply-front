import MyBoardPage from './pages/myBoard/MyBoardPage';
// import MyBoardPage from './pages/myBoard/OldMyBoardPage';
import LandingPage from './pages/main/LandingPage';
import LoginPage from './pages/login/OldLoginPage';
import PreviousPage from './pages/archive/PreviousPage';
import ArchiveDetailPage from './pages/archive/ArchiveDetailPage';
import { SignUp0Page } from './pages/signUp/SignUp0Page';
import SettingsPage from './pages/setting/SettingsPage';
import { SignUp1Page } from './pages/signUp/SignUp1Page';
import SignUp2Page from './pages/signUp/SignUp2Page';
import SignUp3Page from './pages/signUp/SignUp3Page';
import { SignUp4Page, SignUp4PageCandidate, SignUp4PagePasser } from './pages/signUp/SignUp4Page';
import { SignUp5Page, SignUp5Complete } from './pages/signUp/SignUp5Page';
import DeletePage from './pages/delete/DeletePage';
//import DashboardMainPage from './admin/AdminPage';
import UserPage from './admin/pages/user';
import { IndexPage } from './admin/routes/sections';
import OnboardingPage from './pages/main/OnboardingPage';

const isLogined = true;

export const mainRoutes = [
  { path: '/', element: <OnboardingPage /> },
  { path: '/login', element: <LoginPage setLogin={(isLogined) => isLogined == true} /> },
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
  { path: '/signup0', element: <SignUp0Page /> },
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
