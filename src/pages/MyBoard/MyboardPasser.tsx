import React, { useState } from 'react';
import styled from 'styled-components';
import Typography from '../../assets/Typography';

const MobilePageWrapper = styled.div`
  width: 1920px;
  height: 1510px;
  text-align: center;
  padding: 20px;
  background: var(--White, #fff);
  display: flex;
`;

const CharacterImage = styled.img`
  width: 284px;
  height: 339.906px;
  flex-shrink: 0;
  //background: url(<path-to-image>), lightgray 50% / cover no-repeat;
`;

const MyboardPasserPageVer = () => {
  const [userData, setUserData] = useState({
    userName: '고대빵',
    userNickname: '잠만보',
    userProfilePic: 'rectProfile1',
    userProfileLink: '',
    userRole: 'passer',
    firstMajor: '디자인조형학부',
    studentId: '2020220037',
    hopeMajor1: '경영대학',
    hopeMajor2: '미디어학부',
    curGPA: 4.2,
    hopeSemester: '2023-2',
  });
  return (
    <MobilePageWrapper style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '150px' }}>
      <CharacterImage src={`design_image/character/Iam쏘리에요.png`} alt="Sorry icon" />
      <Typography
        size="title2"
        style={{
          color: '#2C323A;',
          lineHeight: '138.889%',
          textAlign: 'center',
          marginTop: '48.09px',
        }}
      >
        {userData.userNickname}님은 이중전공 합격자입니다.
      </Typography>
      <Typography
        size="largeText"
        style={{
          color: '2C323A;',
          lineHeight: '133.333%',
          fontWeight: 500,
          opacity: 0.8,
          textAlign: 'center',
          marginTop: '14px',
        }}
      >
        이중전공 합격자를 위한 페이지는 현재 개발중에 있습니다.
        <br />
        빠른 시일 내 만나요 !
      </Typography>
    </MobilePageWrapper>
  );
};

export default MyboardPasserPageVer;
