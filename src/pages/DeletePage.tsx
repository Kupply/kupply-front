import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useCookies } from 'react-cookie';
import LabelButton from '../assets/buttons/LabelButton';

const Wrapper = styled.div`
  width: 100vw;
  height: 1153px;
  background: #fcfafb;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  border-radius: 20px;
  background: var(--White, #fff);
  width: 818px;
  height: 918px;
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 70px;
  filter: drop-shadow(0px 0px 30px rgba(0, 0, 0, 0.1));
`;

const Button = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

const Title = styled.div`
  color: var(--Main-Black, #141414);
  margin-top: 10px;
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 100% */
`;
const Description = styled.div`
  margin-top: 10px;
  color: rgba(20, 20, 20, 0.8);
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 24.5px; /* 136.111% */
`;
const colorMapping = {
  primary: css`
    color: white;
    background-color: #d85888;

    // not in disabled state && hovering
    &:hover:not(:disabled) {
      background: rgba(216, 88, 136, 0.75);
      box-shadow: 0px 4px 12px 0px rgba(216, 88, 136, 0.25);
    }

    // not in disabled state && being activated or clicked (after pressing a button)
    &:active:not(:disabled) {
      color: #d85888;
      background-color: rgba(216, 88, 136, 0.1);
    }
  `,
  secondary: css`
    color: #d85888;
    border: 1px solid #d85888;

    &:hover:not(:disabled) {
      background: rgba(216, 88, 136, 0.1);

      border: none;
    }

    &:active:not(:disabled) {
      color: white;
      border: none;
      background: #d85888;
    }
  `,
};
const ButtonWrapper = styled.button<{
  buttonType: 'primary' | 'secondary';
}>`
  transition: 0.25s ease-in-out;
  justify-content: center;
  align-items: center;
  padding: 24px 34px;
  border-radius: 10px;
  width: 630px;
  height: 68px;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 100% */

  &:disabled {
    cursor: not-allowed;
    opacity: 0.445;
  }

  ${(props) => colorMapping[props.buttonType]};
`;
const DeletePage = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;
  //if (!accessToken) navigate('/login');

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };
  const [userData, setUserData] = useState({
    userName: '고대빵',
    userNickname: '잠만보',
    userProfilePic: 'rectProfile1',
    userProfileLink: '',
    userRole: 'candidate',
    firstMajor: '디자인조형학부',
    studentId: '2020220037',
    hopeMajor1: '경영대학',
    hopeMajor2: '미디어학부',
    curGPA: 4.2,
    hopeSemester: '2023-2',
  });
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const APIresponse = await axios.get(`http://localhost:8080/user/getMe`, config);
        const userInfo = APIresponse.data.data.user;

        setUserData({
          ...userData,
          userName: userInfo.name,
          userNickname: userInfo.nickname,
          userProfilePic: userInfo.profilePic,
          userProfileLink: userInfo.profileLink,
          userRole: userInfo.role,
          firstMajor: userInfo.firstMajor,
          studentId: userInfo.studentId,
          hopeMajor1: userInfo.hopeMajor1,
          hopeMajor2: userInfo.hopeMajor2,
          curGPA: userInfo.curGPA,
          hopeSemester: userInfo.hopeSemester,
        });

        sessionStorage.setItem('userProfilePic', userInfo.profilePic);
        sessionStorage.setItem('userProfileLink', userInfo.profileLink);
        sessionStorage.setItem('nickname', userInfo.nickname);
        sessionStorage.setItem('studentId', userInfo.studentId);
        sessionStorage.setItem('firstMajor', userInfo.firstMajor);
        sessionStorage.setItem('hopeMajor1', userInfo.hopeMajor1);
        sessionStorage.setItem('hopeMajor2', userInfo.hopeMajor2);
        sessionStorage.setItem('curGPA', userInfo.curGPA.toFixed(2));
        sessionStorage.setItem('hopeSemester', userInfo.hopeSemester);
      } catch (err) {
        console.log(err);
      }
    };

    getUserInfo();
  });
  return (
    <Wrapper>
      <Container>
        <ButtonContainer>
          <Button
            onClick={() => {
              navigate('/settings');
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
              <path d="M34 23L26 30" stroke="#434343" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M26 30L34 38" stroke="#434343" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </Button>
          <Button
            onClick={() => {
              navigate('/settings');
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M38.9142 23.9142C39.6953 23.1332 39.6953 21.8668 38.9142 21.0858C38.1332 20.3047 36.8668 20.3047 36.0858 21.0858L30 27.1716L23.9142 21.0858C23.1332 20.3047 21.8668 20.3047 21.0858 21.0858C20.3047 21.8668 20.3047 23.1332 21.0858 23.9142L27.1716 30L21.0858 36.0858C20.3047 36.8668 20.3047 38.1332 21.0858 38.9142C21.8668 39.6953 23.1332 39.6953 23.9142 38.9142L30 32.8284L36.0858 38.9142C36.8668 39.6953 38.1332 39.6953 38.9142 38.9142C39.6953 38.1332 39.6953 36.8668 38.9142 36.0858L32.8284 30L38.9142 23.9142Z"
                fill="#434343"
              />
            </svg>
          </Button>
        </ButtonContainer>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <img src="/design_image/AlertWarning.png" alt="delete" style={{ marginTop: 60 }} width={128} />
          <Title>계정을 삭제하시겠습니까?</Title>
          <Description>
            {userData.userNickname} 님, 계정을 삭제하시면 철회가 불가능합니다.
            <br />
            정말 계정을 삭제하시겠어요?
          </Description>
          <div
            style={{ marginTop: 53 }}
            onClick={() => {
              navigate('/settings');
            }}
          >
            <ButtonWrapper buttonType="primary">취소하기</ButtonWrapper>
          </div>
          <div style={{ marginTop: 30 }}>
            <ButtonWrapper buttonType="secondary">삭제하기</ButtonWrapper>
          </div>
        </div>
      </Container>
    </Wrapper>
  );
};

export default DeletePage;
