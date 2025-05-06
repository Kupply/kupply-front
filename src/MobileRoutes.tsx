import DeletePage from './mobile/pages/DeletePage';
import LandingMobile from './mobile/pages/LandingMobile';
import LoginPage from './mobile/pages/LoginPage';
import OnboardingMobile from './mobile/pages/OnboardingMobile';
import { MobileSettingsPage } from './mobile/pages/SettingsPage';
import { SignUp1Page } from './mobile/pages/signup/NewSignUpPage1'; 
import { SignUp2Page } from './mobile/pages/signup/NewSignUpPage2';
import SignUp3Page from './mobile/pages/signup/NewSignUpPage3';
import { SignUp4Page, SignUp4PageCandidate, SignUp4PagePasser } from './mobile/pages/signup/NewSignUpPage4';
import {SignUp5Complete, SignUp5Page} from './mobile/pages/signup/NewSignUpPage5';
import SyncPage0 from './mobile/pages/sync/SyncPage0';
import SyncPage1 from './mobile/pages/sync/SyncPage1';
import SyncPage2, { Sync2Complete } from './mobile/pages/sync/SyncPage2';
import MobileArchivePage from './pages/mobile/MobileArchive';
import MobileArchiveDetailPage from './pages/mobile/MobileArchiveDetail';
import MobileMyBoard from './pages/mobileMyBoard/MyBoardPage';
import OAuthPage from './pages/login/OAuthPage';

export const mobileMainRoutes = [
  { path: '/', element: <OnboardingMobile /> },
  { path: '/login', element: <LoginPage setLogin={(isLogined) => isLogined === true} /> },
  { path: '/oauth-koreapas/:koreapasUUID?', element: <OAuthPage /> },
];

export const mobileAuthRoutes = [
  { path: '/myboard', element: <MobileMyBoard /> },
  { path: '/archive/:majorName', element: <MobileArchiveDetailPage /> },
  { path: '/landing', element: <LandingMobile /> },
  { path: '/archive', element: <MobileArchivePage /> },
  { path: '/settings', element: <MobileSettingsPage /> },
  { path: '/delete', element: <DeletePage /> },
];

export const mobileSignupRoutes = [
  { path: '/join', element: <SignUp1Page /> },
  // { path: '/signup0', element: <SignUpPage0 /> },
  { path: '/signup1', element: <SignUp1Page /> },
  { path: '/signup2', element: <SignUp2Page/> },
  { path: '/signup3', element: <SignUp3Page /> },
  { path: '/signup4', element: <SignUp4Page /> },
  { path: '/signup4-candidate', element: <SignUp4PageCandidate /> },
  { path: '/signup4-passer', element: <SignUp4PagePasser /> },
  { path: '/signup5', element: <SignUp5Page /> },
  { path: '/signupcomplete', element: <SignUp5Complete /> },
];

export const mobileSyncRoutes = [
  { path: '/sync0', element: <SyncPage0 /> },
  { path: '/sync1', element: <SyncPage1 /> },
  { path: '/sync2', element: <SyncPage2 /> },
  { path: '/synccomplete', element: <Sync2Complete /> },
];
