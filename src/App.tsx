import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import PreviousPage from "./pages/PreviousPage";
import MyBoardPage from "./pages/MyBoardPage";
import CommunityPage from "./pages/CommunityPage";
import JoinPage from "./pages/JoinPage";
import LabelPrimaryButton from "./assets/buttons/label/LabelPriButton";
import LabelPrimaryWideButton from "./assets/buttons/label/LabelPriWideButton";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/previous" element={<PreviousPage />} />
          <Route path="/myboard" element={<MyBoardPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/join" element={<JoinPage />} />
        </Routes>
        <LabelPrimaryButton />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
