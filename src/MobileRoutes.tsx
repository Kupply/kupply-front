import DeletePage from './mobile/pages/DeletePage';
import LandingMobile from './mobile/pages/LandingMobile';
import LoginPage from './mobile/pages/LoginPage';
import OnboardingMobile from './mobile/pages/OnboardingMobile';
import { MobileSettingsPage } from './mobile/pages/SettingsPage';
import SignUpPage0 from './mobile/pages/signup/SignupPage0';
import SignUpPage1 from './mobile/pages/signup/SignupPage1';
import SignUpPage2 from './mobile/pages/signup/SignupPage2';
import SignUpPage3 from './mobile/pages/signup/SignupPage3';
import SignUpPage4, { SignUp4PageCandidate, SignUp4PagePasser } from './mobile/pages/signup/SignupPage4';
import SignUpPage5 from './mobile/pages/signup/SignupPage5';
import MobileArchivePage from './pages/mobile/MobileArchive';
import MobileArchiveDetailPage from './pages/mobile/MobileArchiveDetail';
import MobileMyBoard from './pages/mobileMyBoard/MyBoardPage';

export const mobileMainRoutes = [
  { path: '/', element: <OnboardingMobile /> },
  { path: '/login', element: <LoginPage setLogin={(isLogined) => isLogined == true} /> },
  { path: '/landing', element: <LandingMobile /> },
  { path: '/archive', element: <MobileArchivePage /> },
];

export const mobileAuthRoutes = [
  { path: '/myboard', element: <MobileMyBoard /> },
  { path: '/archive/:majorName', element: <MobileArchiveDetailPage /> },
  // 상태관리 도입 예정으로, 잠시 삭제
  { path: '/settings', element: <MobileSettingsPage /> },
  // { path: '/settings', element: <SettingsPage /> },
  { path: '/delete', element: <DeletePage /> },
];

export const mobileSignupRoutes = [
  { path: '/join', element: <SignUpPage1 /> },
  { path: '/signup0', element: <SignUpPage0 /> },
  { path: '/signup1', element: <SignUpPage1 /> },
  { path: '/signup2', element: <SignUpPage2 /> },
  { path: '/signup3', element: <SignUpPage3 /> },
  { path: '/signup4', element: <SignUpPage4 /> },
  { path: '/signup4-candidate', element: <SignUp4PageCandidate /> },
  { path: '/signup4-passer', element: <SignUp4PagePasser /> },
  { path: '/signup5', element: <SignUpPage5 /> },
  { path: '/signupcomplete', element: <SignUpPage5 /> },
];
