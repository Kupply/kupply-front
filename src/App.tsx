import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Header from "./assets/Header";
import Footer from "./components/Footer";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import PreviousPage from "./pages/PreviousPage";
import MyBoardPage from "./pages/MyBoardPage";
import CommunityPage from "./pages/CommunityPage";
import SignUpPage from "./pages/SignUp/SignUpPage";
import MessagePage from "./pages/MessagePage";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  return (
    <div style={{ width: "1920px", height: "1510px", marginTop: "96px" }}>
      <Header logined={false} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/previous" element={<PreviousPage />} />
        <Route path="/myboard" element={<MyBoardPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/join" element={<SignUpPage />} />
        <Route path="/message" element={<MessagePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
