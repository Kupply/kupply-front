import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainPage from "./components/MainPage";
import LoginPage from "./components/LoginPage";
import PreviousPage from "./pages/PreviousPage";
import MyBoardPage from "./pages/MyBoardPage";
import CommunityPage from "./pages/CommunityPage";

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
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
