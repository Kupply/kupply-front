import React, {useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { SignUpPageWrapper } from "../../components/signUp/SignUpPageWrapper";
import styled, {css} from "styled-components";
import { CheckBoxButton01 } from "../../assets/buttons/CheckBoxButton";
import { ScrollLarge, ScrollSmall } from "../../assets/scroll/Scroll";
import { TermsText1, TermsText2 } from "../../components/signUp/TermsText";
import Button04 from "../../assets/buttons/Button04";
import Button03 from "../../assets/buttons/Button03";
import CTA01 from "../../assets/CTAs/CTA01";
import Typography from "../../assets/Typography";
import { join } from "../../utils/SignUpFunctions";


export function SignUp5Page(){
  const [allChecked, setAllChecked] = useState(false);
  const [allUIChecked, setAllUIChecked] = useState(false);
  const [individualChecks, setIndividualChecks] = useState({
    first: false,
    second: false,
  });
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [scrollActive, setActive] = useState(false);
  const button = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const onClickCheck = () => {
    const body = document.getElementsByTagName('body')[0];
    if (body) {
      button.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const allStateAgreed = () => {
    return Object.values(individualChecks).every((val) => val);
  };

  const handleAllCheckedClick = (isChecked: boolean) => {
    if (isChecked) {
      setIndividualChecks({
        first: true,
        second: true,
      });
    } else {
      setIndividualChecks({
        first: false,
        second: false,
      });
    }
    setAllChecked(isChecked);
    setAllUIChecked(isChecked);
  };

  useEffect(() => {
    const isAllChecked = allStateAgreed();
    setIsButtonActive(individualChecks.first && individualChecks.second);
    setAllUIChecked(isAllChecked);
  }, [individualChecks]);

  const handlePrev = () => {
    navigate('/signUp4');
  };

  const handleNext = async () => {
    if (isButtonActive) {
      try {
        await join(sessionStorage.getItem('role') || '');
        navigate('/signupcomplete');
      } catch (e) {
        alert(e);
      }
    } else {
      alert('모든 약관에 동의해주세요.');
    }
  };

  return(
    <SignUpPageWrapper step={5} stepInfo="약관 읽고 서비스 이용하기">
      <TextTitle>
        <CheckBoxButton01 
          textSize="1.25vw"
          textBold="600"
          isChecked={allUIChecked}
          onCustomFunction={(isChecked) => {
          handleAllCheckedClick(isChecked);
            onClickCheck();
          }}>아래 약관에 모두 동의합니다</CheckBoxButton01>
      </TextTitle>
      <ScrollLarge isChecked={scrollActive}>
        <CheckBoxButton01 
          isChecked={individualChecks.first}
          onCustomFunction={(newCheckedValue) =>
                setIndividualChecks((prev) => ({
                  ...prev,
                  first: newCheckedValue,
                }))
              }
          >
            서비스 이용약관 동의 (필수)
        </CheckBoxButton01>
        <TextOutBox>
          <ScrollSmall isChecked={scrollActive}>
            <TermsText1 />
          </ScrollSmall>
        </TextOutBox>
        <div style={{height: '2vw'}}></div>
        <CheckBoxButton01 
          isChecked={individualChecks.second}
          onCustomFunction=
          {(newCheckedValue) =>
                setIndividualChecks((prev) => ({
                  ...prev,
                  second: newCheckedValue,
                }))
              }>
          개인정보 수집 및 이용 동의 (필수)
          </CheckBoxButton01>
          <TextOutBox>
            <ScrollSmall isChecked={scrollActive}>
              <TermsText2 />
            </ScrollSmall>
          </TextOutBox>
          <ButtonsWrapper>
            <Button04 onClick={handlePrev} style={{width: '25.582%'}}/>
            <NextButtonFixedWidth 
              state={isButtonActive ? 'pressed' : 'disabled'} 
              onClick={handleNext}
              style={{width: '74.418%'}}
            >
              완료
            </NextButtonFixedWidth>
          </ButtonsWrapper>
        <div ref={button} />
      </ScrollLarge>
    </SignUpPageWrapper>
  )
}

export function SignUp5Complete(){
  const navigate = useNavigate();
  const handleNext = () => {
    navigate('/login');
  };

  //넘겨받은 데이터가 없는 경우 올바른 경로가 아니므로 main으로 돌려보낸다.
  // 잠시 수정
  // useEffect(() => {
  //   if (!sessionStorage.getItem('candidateGPA') && !sessionStorage.getItem('passerGPA')) navigate('/');
  // }, []);

  //회원가입 때 입력된 정보는 회원가입이 완료되면 지워져야 함.
  useEffect(() => {
    sessionStorage.clear();
  }, []);

  return (
    
    <Wrapper2>
      <div style={{ textAlign: 'center', marginTop: '12.9629vh', marginBottom: '2.222vh', zIndex: 2}}>
        <Typography size="2.5vw" bold="700" style={{ lineHeight: '50px' }}>
          축하합니다!
        </Typography>
      </div>
      <div style={{ textAlign: 'center',  zIndex: 1 }}>
        <Typography
          size="1.25vw"
          bold="700"
          style={{ opacity: '0.8', lineHeight: '125%', fontWeight: '500' }}
        >
          이제 쿠플라이의 회원이 되셨습니다.
          <br />
          로그인 후, 다양한 쿠플라이의 서비스를 이용해보세요!
        </Typography>
      </div>
      <img
        src="designImage/signUp/CheckAni.webp"
        alt="completeImage"
        style={{
          width: '40.677vw',
          height: '43.542vw',
          background: 'url(designImage/signUp/CheckAni.webp), lightgray 50% / cover no-repeat',
          transform: 'translateY(-84px)',
        }}
      />
      <div style={{ transform: 'translateY(-221px)'}}>
        <CTA01 state="default" onClick={handleNext}>
          <Typography size="1.042vw" bold="700" color="var(--White, #FFF)">
            로그인하고 쿠플라이로 이동하기
          </Typography>
        </CTA01>
      </div>
    </Wrapper2>
  )
}

const TextTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: -170px; // 왜 생겼지? 원인 못찾음... ??
  margin-bottom: 18px;
`;

const TextOutBox = styled.div`
  width: 100%; // 32.7083vw; // (628/1920)*100vw  width: 628px;
  //max-width: 628px;
  height: 228px;
  flex-shrink: 0;
  border-radius: 10px;
  background: var(--White, #fff);
  border: 1px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4167vw; // 8px;

  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  font-size: 0.9375vw; // 18px
  font-style: normal;
  font-weight: 400;
  line-height: 123.54%;
`;

const ButtonsWrapper = styled.div`
display: flex;
gap: 0.9375vw; // 18px;
margin-top: 20px;
margin-bottom: 50px;
//margin-right: 0.9375vw; // 18px;
`;

const NextFixedWidth = css`
  // 628px 너무 길어서 길이 조절했습니다
  width: 23.65vw; 
`;

const NextButtonFixedWidth = styled(Button03)`
  //${NextFixedWidth}
`;

const Wrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw; // 100%
  height: auto;
  padding-bottom: 5vw;
  box-sizing: 'border-box';
  //background: #FCFAFB;
  background: linear-gradient(180deg, #fcfafb 69.56%, rgba(252, 250, 251, 0) 115.91%);
`;
