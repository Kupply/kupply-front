import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useCookies } from 'react-cookie';
import LabelButton from '../assets/buttons/LabelButton';
import client from '../utils/httpClient';

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
    userName: localStorage.getItem('name') || '고대빵',
    userNickname: localStorage.getItem('nickname') || '잠만보',
    userProfilePic: localStorage.getItem('userProfilePic') || 'rectProfile1',
    userProfileLink: localStorage.getItem('userProfileLink') || '',
    userRole: localStorage.getItem('role') || 'candidate',
    firstMajor: localStorage.getItem('firstMajor') || '디자인조형학부',
    studentId: localStorage.getItem('studentId') || '2020220037',
    hopeMajor1: localStorage.getItem('hopeMajor1') || '경영대학',
    hopeMajor2: localStorage.getItem('hopeMajor2') || '미디어학부',
    curGPA: localStorage.getItem('curGPA') || 4.2,
    hopeSemester: localStorage.getItem('hopeSemester') || '2023-2',
  });

  const [, , removeCookie] = useCookies(['accessToken']);

  const deleteMe = async () => {
    try {
      // await axios.delete(`http://localhost:8080/user/deleteMe`, config);
      await client.delete('/user/deleteMe');
      removeCookie('accessToken', { path: '/' });
      window.localStorage.clear();
      window.sessionStorage.clear();
      navigate('/');
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

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
            <ButtonWrapper buttonType="secondary" onClick={deleteMe}>
              삭제하기
            </ButtonWrapper>
          </div>
        </div>
      </Container>
    </Wrapper>
  );
};

export default DeletePage;
