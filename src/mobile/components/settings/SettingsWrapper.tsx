import React from "react";
import styled from "styled-components";

interface SettingsWrapperProps{
  selected: number;
};

export default function SettingsWrapper({selected}:SettingsWrapperProps){

  let mainText = "";
  let subText = "";

  switch(selected){
    case 0:
      mainText = "환경설정";
      subText = "";
      break;
    case 1:
      mainText = "나의 기본정보 수정하기";
      subText = "나의 기본정보 사항과 맞지 않는 내용을 수정하시오";
      break;
    case 2:
      mainText = "프로필 사진/닉네임 변경하기";
      subText = "쿠플라이에서 사용할 닉네임과 프로필을 수정하세요";
      break;
    case 3:
      mainText = "마이보드 프로필 수정하기";
      subText = "마이보드는 도전자님이 작성하신 정보를 바탕으로, 도전자님의 희망 이중전공 진입을 도울 다양한 정보를 제공합니다. 신뢰할 수 있는 마이보드를 제공받기 위해 정보를 수정하세요.";
      break;
    case 4:
      mainText = "계정관리";
      subText = "안전한 개인정보 보호를 위해 비밀번호를 변경하세요. 쿠플라이의 아이디는 고려대학교 이메일 입니다.";
      break;
    case 5:
      mainText = "약관보기";
      subText = "다음은 고려대학교 이중전공 지원/합격정보 통계 서비스 쿠플라이의 이용약관 입니다.";
      break;
  }
  return (
    <MainWrapper>
      <HeaderBar>
        
      </HeaderBar>
      <Contents>

      </Contents>
    </MainWrapper>
  )
}

const MainWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
`;

const HeaderBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 34.167vw;
`;

const Contents = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

