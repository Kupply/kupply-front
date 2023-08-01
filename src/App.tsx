import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./assets/Header";
import Footer from "./components/Footer";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import PreviousPage from "./pages/PreviousPage";
import MyBoardPage from "./pages/MyBoardPage";
import CommunityPage from "./pages/CommunityPage";
import JoinPage from "./pages/JoinPage";
import MessagePage from "./pages/MessagePage";
import SettingsPage from "./pages/SettingsPage";
import LabelPrimaryButton from "./assets/buttons/label/LabelPriButton";
import LabelPrimaryWideButton from "./assets/buttons/label/LabelPriWideButton";
import IconSecButton from "./assets/buttons/icon/IconSecButton";
import IconPriButton from "./assets/buttons/icon/IconPriButton";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header menu="join" />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/previous" element={<PreviousPage />} />
          <Route path="/myboard" element={<MyBoardPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/message" element={<MessagePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
        <IconSecButton />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
