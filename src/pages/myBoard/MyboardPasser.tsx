import React, { useState } from 'react';
import styled from 'styled-components';
import Typography from '../../assets/OldTypography';

const MyboardPasserPageVer = () => {
  const [userData, setUserData] = useState({
    userName: localStorage.getItem('name') || '',
    userNickname: localStorage.getItem('nickname') || '',
    userProfilePic: localStorage.getItem('userProfilePic') || 'rectProfile1',
    userProfileLink: localStorage.getItem('userProfileLink') || '',
    userRole: localStorage.getItem('role') || 'passer',
    firstMajor: localStorage.getItem('firstMajor') || '',
    studentId: localStorage.getItem('studentId') || '',
    secondMajor: localStorage.getItem('secondMajor') || '',
    passGPA: localStorage.getItem('passGPA') || 0,
    passSemester: localStorage.getItem('passSemester') || '',
  });
  return (
    <MobilePageWrapper style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '150px' }}>
      <CharacterImage src={`designImage/character/IamSorry.png`} alt="Sorry icon" />
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

export default MyboardPasserPageVer;
