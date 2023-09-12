import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/base/Header';
import Footer from './components/base/Footer';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import PreviousPage from './pages/PreviousPage';
import PreviousDetailPage from './pages/PreviousDetailPage';
import MyBoardPage from './pages/MyBoardPage';
import CommunityPage from './pages/CommunityPage';
import MessagePage from './pages/MessagePage';
import SettingsPage from './pages/SettingsPage';
import SignUp1Page from './pages/SignUp/SignUp1Page';
import SignUp2Page from './pages/SignUp/SignUp2Page';
import SignUp3Page from './pages/SignUp/SignUp3Page';
import { SignUp4Page, SignUp4PageCandidate, SignUp4PagePasser } from './pages/SignUp/SignUp4Page';
import { SignUp5Page, SignUp5Complete } from './pages/SignUp/SignUp5Page';

export default function App() {
  return (
    <div style={{ width: '1920px', height: '1510px', marginTop: '96px' }}>
      <Header logined={false} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/previous" element={<PreviousPage />} />
        <Route path="/previous/:majorId" element={<PreviousDetailPage />} />
        <Route path="/myboard" element={<MyBoardPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/join" element={<SignUp1Page />} />
        <Route path="/message" element={<MessagePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/signup1" element={<SignUp1Page />} />
        <Route path="/signup2" element={<SignUp2Page />} />
        <Route path="/signup3" element={<SignUp3Page />} />
        <Route path="/signup4" element={<SignUp4Page />} />
        <Route path="/signup4-candidate" element={<SignUp4PageCandidate />} />
        <Route path="/signup4-passer" element={<SignUp4PagePasser />} />
        <Route path="/signup5" element={<SignUp5Page />} />
        <Route path="/signupcomplete" element={<SignUp5Complete />} />
      </Routes>
      <Footer />
    </div>
  );
}
