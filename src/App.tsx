import React from 'react';
import HeaderTemplate from "./Components/Header"
import FooterTemplate from "./Components/Footer"
import MainJoin from "./Components/MainJoin"
import Login from "./Components/Login"

/* 질문: 화면 전환 어떻게 구현하는지 모르겠다. 예: 메인 화면 > (이벤트 발생) > 로그인 화면  */
function App() {
  return (
    <div>
      <HeaderTemplate />
      <Login />
      <FooterTemplate />
    </div>
  );
}

export default App;
