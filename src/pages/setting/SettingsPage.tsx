import styled from "styled-components";
import { SideBar } from "../../components/settings/Sidebar";
import { useRecoilState } from "recoil";
import { SBContentState, isAppliedState } from "../../store/atom";
import { SidebarContent0 } from "../../components/settings/sidebar-content/SidebarContent0";
import { SidebarContent1 } from "../../components/settings/sidebar-content/SidebarContent1";
import { SidebarContent2 } from "../../components/settings/sidebar-content/SidebarContent2";
import { useState } from "react";
import { SidebarContent3 } from "../../components/settings/sidebar-content/SidebarContent3";
import { SidebarContent4 } from "../../components/settings/sidebar-content/SidebarContent4";
import { useEffect } from "react";
import client from "../../utils/HttpClient";

export function SettingsPage(){
  const [selected, setSelected] = useRecoilState(SBContentState);

  // useEffect(() => {
  //   // 로그인한 유저 정보 localStorage에
  //   const getMe = async () => {
  //     try {
  //       //const APIresponse = await axios.get(`http://localhost:8080/user/getMe`, config);
  //       const APIresponse = await client.get('/user/getMe');
  //       const userInfo = APIresponse.data.data.user;

  //       localStorage.setItem('userProfilePic', userInfo.profilePic);
  //       localStorage.setItem('userProfileLink', userInfo.profileLink);
  //       localStorage.setItem('name', userInfo.name);
  //       localStorage.setItem('nickname', userInfo.nickname);
  //       localStorage.setItem('studentId', userInfo.studentId);
  //       localStorage.setItem('firstMajor', userInfo.firstMajor);
  //       localStorage.setItem('role', userInfo.role);
  //       if (userInfo.role === 'candidate') {
  //         localStorage.setItem('hopeMajor1', userInfo.hopeMajor1);
  //         localStorage.setItem('hopeMajor2', userInfo.hopeMajor2);
  //         localStorage.setItem('candidateGPA', userInfo.curGPA.toFixed(2));
  //         localStorage.setItem('candidateSemester', userInfo.hopeSemester);
  //         localStorage.setItem('isApplied', userInfo.isApplied);
  //       } else {
  //         localStorage.setItem('secondMajor', userInfo.secondMajor);
  //         localStorage.setItem('passerSemester', userInfo.passSemester);
  //         localStorage.setItem('passerGPA', userInfo.passGPA.toFixed(2));
  //       }
  //     } catch(err){
  //       console.log(err);
  //     }}
  //     getMe();
  //   },[]);

  return (
    <Wrapper>
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
  width: 1920px;
  height: 100%;
  background: var(--White, #fff);
  display: flex;
`;
