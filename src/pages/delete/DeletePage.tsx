import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useCookies } from 'react-cookie';
import Button05 from '../../assets/buttons/Button05';
import { client } from '../../utils/HttpClient';
import { useRecoilValue } from 'recoil';
import { userSettingsState } from '../../store/atom';

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

  const userNickname = useRecoilValue(userSettingsState('nickname')).info;
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
            <img src={process.env.PUBLIC_URL + 'designImage/icon/icon_03.svg'} alt="Go Back Button" />
          </Button>
          <Button
            onClick={() => {
              navigate('/settings');
            }}
          >
            <img src={process.env.PUBLIC_URL + 'designImage/icon/icon_02.svg'} alt="Close Button" />
          </Button>
        </ButtonContainer>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <img
            src="/designImage/textField/AlertWarning.png"
            alt="delete"
            style={{ marginTop: '3.125vw', width: '6.667vw' }}
          />
          <Title>계정을 삭제하시겠습니까?</Title>
          <Description>{userNickname} 님, 계정 삭제 후 철회가 불가능해요. 정말 계정을 삭제하시겠습니까?</Description>
          <div
            style={{ marginTop: '2.76vw' }}
            onClick={() => {
              navigate('/settings');
            }}
          >
            <Button05 state="pressed">취소하기</Button05>
          </div>
          <div style={{ marginTop: '1.5625vw' }}>
            <Button05 state="default" onClick={deleteMe}>
              삭제하기
            </Button05>
          </div>
        </div>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  //height: 1153px;
  //height: auto;
  height: 60.052vw;
  background: #fcfafb;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  border-radius: 20px;
  background: var(--White, #fff);
  width: 42.604vw;
  //height: 918px;
  //height: auto;
  height: 45.813vw;
  padding-left: 2.604vw;
  padding-right: 2.604vw;
  //padding-top: 70px;
  padding-top: 3.646vw;
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
  //margin-top: 10px;
  margin-top: 0.521vw;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.25vw;
  font-style: normal;
  font-weight: 700;
  line-height: 1.25vw; /* 100% */
`;

const Description = styled.div`
  //margin-top: 10px;
  margin-top: 0.521vw;
  color: rgba(20, 20, 20, 0.8);
  text-align: center;
  font-family: Pretendard;
  font-size: 0.9375vw;
  font-style: normal;
  font-weight: 500;
  //line-height: 24.5px; /* 136.111% */
  line-height: 136.111%;
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

export default DeletePage;
