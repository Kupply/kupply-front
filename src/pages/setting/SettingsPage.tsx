import styled from "styled-components";
import { SideBar } from "../../components/settings/Sidebar";
import { useRecoilState } from "recoil";
import { SBContentState, isAppliedState } from "../../store/atom";
import { SidebarContent0 } from "../../components/settings/sidebar-content/SidebarContent0";
import { SidebarContent1 } from "../../components/settings/sidebar-content/SidebarContent1";
import { SidebarContent2 } from "../../components/settings/sidebar-content/SidebarContent2";
import { useState } from "react";
import { SidebarContent3 } from "../../components/settings/sidebar-content/SidebarContent3";

export function SettingsPage(){
  const [selected, setSelected] = useRecoilState(SBContentState);
  
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