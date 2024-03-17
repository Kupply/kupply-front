import styled from "styled-components";
import { SideBar } from "../../components/settings/Sidebar";
import { useRecoilState, useRecoilValue } from "recoil";
import { SBContentState, isAppliedState, isGpaChangedState, settingsModalState } from "../../store/atom";
import { SidebarContent0 } from "../../components/settings/sidebar-content/SidebarContent0";
import { SidebarContent1 } from "../../components/settings/sidebar-content/SidebarContent1";
import { SidebarContent2 } from "../../components/settings/sidebar-content/SidebarContent2";
import { useState } from "react";
import { SidebarContent3 } from "../../components/settings/sidebar-content/SidebarContent3";
import { SidebarContent4 } from "../../components/settings/sidebar-content/SidebarContent4";
import { useEffect } from "react";
import client from "../../utils/HttpClient";
import { GpaChangeModal } from "../../components/settings/GpaChangeModal";
import axios from "axios";
import { useCookies } from "react-cookie";

export function SettingsPage(){
  const [selected, setSelected] = useRecoilState(SBContentState);
  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };

  useEffect(() => {
    // 로그인한 유저 정보 localStorage에
    const getMe = async () => {
      try {
        const APIresponse = await axios.get(`http://localhost:8080/user/getMe`, config);
        //const APIresponse = await client.get('/user/getMe');
        const userInfo = APIresponse.data.data.user;
        console.log('userInfo',userInfo); // 얘가 아예 등장도 하지 않음 
        localStorage.setItem('userProfilePic', userInfo.profilePic);
        localStorage.setItem('userProfileLink', userInfo.profileLink);
        localStorage.setItem('name', userInfo.name);
        localStorage.setItem('nickname', userInfo.nickname);
        localStorage.setItem('studentId', userInfo.studentId);
        localStorage.setItem('firstMajor', userInfo.firstMajor);
        localStorage.setItem('role', userInfo.role);
        if (userInfo.role === 'candidate') {
          localStorage.setItem('hopeMajor1', userInfo.hopeMajor1);
          localStorage.setItem('hopeMajor2', userInfo.hopeMajor2);
          localStorage.setItem('candidateGPA', userInfo.curGPA.toFixed(2));
          localStorage.setItem('candidateSemester', userInfo.hopeSemester);
          localStorage.setItem('isApplied', userInfo.isApplied);
        } else {
          localStorage.setItem('secondMajor', userInfo.secondMajor);
          localStorage.setItem('passSemester', userInfo.passSemester);
          localStorage.setItem('passGPA', userInfo.passGPA.toFixed(2));
        }
      } catch(err){
        console.log(err);
      }}
      getMe();
    },[]);

  const modalOpen = useRecoilValue(settingsModalState);
  const isGpaChanged = useRecoilValue(isGpaChangedState);

  return (
    <Wrapper>
      {modalOpen && isGpaChanged.changed && <GpaChangeModal/>}
      <SideBar/>
      {(() => {
        switch(selected){
          case 0:
            return <SidebarContent0/>
          case 1: 
            return <SidebarContent1/>
          case 2:
            return <SidebarContent2/>
          case 3:
            return <SidebarContent3/>
          case 4:
            return <SidebarContent4/>
        }
      })()}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100%;
  background: var(--White, #fff);
  display: flex;
`;
