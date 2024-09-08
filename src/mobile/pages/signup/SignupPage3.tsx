import { SignUpPageWrapper } from '../../components/signup/SignUpPageWrapper';
import styled from 'styled-components';
import Typography from '../../../assets/Typography';
import { useNavigate } from 'react-router-dom';
import { UserInput } from '../../components/signup/UserInput';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../../../store/atom';
import { useSignUp3Verification } from '../../../utils/SignUpFunctions';
import Button03 from '../../assets/buttons/Button03';
import Button04 from '../../assets/buttons/Button04';

type StateOptions = 'default' | 'hover' | 'loading' | 'filled' | 'error';

export default function SignUpPage3() {
  const navigate = useNavigate();
  const [next, setNext] = useState(false);
  const { complete } = useSignUp3Verification();
  const [valid, setValid] = useState(false);

  const handleNext = () => {
    setNext(true);
    Promise.resolve().then(() => {
      navigate('/signup4');
    });
  };

  const handlePrev = () => {
    navigate('/signup2');
  };

  return (
    <SignUpPageWrapper step={3} stepInfo="비밀번호 및 닉네임 설정하기">
      <div style={{ marginBottom: '61px' }}></div>
      <ContentsList>
        <ContentsWrapper>
          <div>
            <Typography size="3.33vw" bold="700">
              쿠플라이 아이디는 고려대학교 이메일 주소입니다.
            </Typography>
          </div>
          <UserInput userInfoType="id" userInfoTypeManual="kuEmail" />
        </ContentsWrapper>
        <ContentsWrapper>
          <div>
            <Typography size="3.33vw" bold="700">
              비밀번호
            </Typography>
            <Typography size="3.33vw" bold="400">
              를 입력해주세요.
            </Typography>
          </div>
          <UserInput userInfoType="password" toNext={next} />
        </ContentsWrapper>
        <ContentsWrapper>
          <div>
            <Typography size="3.33vw" bold="400">
              입력한 비밀번호를&nbsp;
            </Typography>
            <Typography size="3.33vw" bold="700">
              확인&nbsp;
            </Typography>
            <Typography size="3.33vw" bold="400">
              해주세요.
            </Typography>
          </div>
          <UserInput userInfoType="password2" toNext={next} />
        </ContentsWrapper>
        <ContentsWrapper>
          <div>
            <Typography size="3.33vw" bold="400">
              쿠플라이에서 사용할&nbsp;
            </Typography>
            <Typography size="3.33vw" bold="700">
              닉네임
            </Typography>
            <Typography size="3.33vw" bold="400">
              을 입력해주세요.
            </Typography>
          </div>
          <UserInput userInfoType="nickname" toNext={next} />
        </ContentsWrapper>
      </ContentsList>
      <ButtonsWrapper>
        <Button04 onClick={handlePrev} style={{ width: '25.582%' }} />
        <Button03 state={complete ? 'default' : 'disabled'} onClick={handleNext} style={{ width: '74.418%' }} />
      </ButtonsWrapper>
    </SignUpPageWrapper>
  );
}

const ContentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5.56vw;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5vw; /* 9px */
  width: 91.11vw;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  // 이거 핸드폰 height 따라 달라져야 해서 padding으로 박을 지를 고민중
  // vh로 박아야 할 가능성이 클듯
  margin-top: 27.778vw; /* 100px */
  gap: 2.222vw; /* 8px */
  width: 100%;
`;
