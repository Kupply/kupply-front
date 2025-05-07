import axios from 'axios';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

import { SyncPageWrapper } from '../../components/sync/SyncPageWrapper';
import { CheckBoxButton01 } from '../../assets/buttons/CheckBoxButton';
import { ScrollLarge, ScrollSmall } from '../../assets/scroll/Scroll';
import { TermsText } from '../../components/sync/TermsText';
import Button03 from '../../assets/buttons/Button03';
import CTA01 from '../../assets/CTAs/CTA01';
import Typography from '../../assets/Typography';
import { api_url } from '../../utils/HttpClient';

export default function SyncPage2() {
  const [allChecked, setAllChecked] = useState(false);
  const [allUIChecked, setAllUIChecked] = useState(false);
  const [individualChecks, setIndividualChecks] = useState({
    first: false,
    second: true,
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
        second: true,
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

  const handleButtonClick = async () => {
    if (isButtonActive) {
      const url = `${api_url}/auth/koreapasSync`;
      try {
        const kupplyId = sessionStorage.getItem('kupplyId');
        const koreapasUUID = sessionStorage.getItem('koreapasUUID');
        const nickname = sessionStorage.getItem('nickname');
        const firstMajorCode = sessionStorage.getItem('firstMajorCode');
        const firstMajorCampus = sessionStorage.getItem('firstMajorCampus');

        await axios
          .post(url, {
            userId: kupplyId,
            koreapasUUID: koreapasUUID,
            koreapasNickname: nickname,
            koreapasFirstMajorCode: firstMajorCode,
            koreapasFirstMajorCampus: firstMajorCampus,
          })
          .then((res) => {
            sessionStorage.setItem('toComplete', 'true');
            navigate('/synccomplete');
          });
      } catch (e) {
        alert(e);
      }
    } else {
      alert('모든 약관에 동의해주세요.');
    }
  };

  useEffect(() => {
    if (!sessionStorage.getItem('koreapasUUID')) navigate('/');
  }, []);

  const nickname = sessionStorage.getItem('nickname')!;

  return (
    <SyncPageWrapper step={3} stepInfo="약관 읽고 연동하기">
      <TextTitle>
        <CheckBoxButton01
          textSize="1.25vw"
          textBold="600"
          isChecked={allUIChecked}
          onCustomFunction={(isChecked) => {
            handleAllCheckedClick(isChecked);
            onClickCheck();
          }}
        >
          아래 약관에 모두 동의합니다.
        </CheckBoxButton01>
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
          고파스 개인정보 수집 및 이용 동의 (필수)
        </CheckBoxButton01>
        <TextOutBox>
          <ScrollSmall isChecked={scrollActive}>
            <TermsText koreapasNickname={nickname} />
          </ScrollSmall>
        </TextOutBox>
        <div style={{ height: '2vw' }}></div>
        <ButtonsWrapper>
          <NextButtonFixedWidth
            state={isButtonActive ? 'pressed' : 'disabled'}
            onClick={handleButtonClick}
            style={{ width: '32.71vw' }}
          >
            연동하기
          </NextButtonFixedWidth>
        </ButtonsWrapper>
        <div ref={button} />
      </ScrollLarge>
    </SyncPageWrapper>
  );
}

export function Sync2Complete() {
  const navigate = useNavigate();
  const handleNext = () => {
    navigate('/login');
  };
  const isMountedRef = useRef(false);

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return;
    }

    if (sessionStorage.getItem('toComplete') !== 'true') {
      sessionStorage.clear();
      navigate('/');
    } else {
      sessionStorage.clear();
    }
  }, []);

  return (
    <Wrapper2>
      <div style={{ textAlign: 'center', marginTop: '12.9629vh', marginBottom: '2.222vh', zIndex: 2 }}>
        <Typography size="2.5vw" bold="700" style={{ lineHeight: '2.604vw' }}>
          축하합니다!
        </Typography>
      </div>
      <div style={{ textAlign: 'center', zIndex: 1 }}>
        <Typography size="1.25vw" bold="700" style={{ opacity: '0.8', lineHeight: '125%', fontWeight: '500' }}>
          연동이 성공적으로 완료되었어요.
          <br />
          고파스 아이디로 로그인 후, 쿠플라이의 다양한 서비스를 이용해보세요.
        </Typography>
      </div>
      <div>
        <img
          src="designImage/signUp/CheckAni.webp"
          alt="completeImage"
          style={{
            width: '40.677vw',
            height: '100%',
            background: 'url(designImage/signUp/CheckAni.webp), lightgray 50% / cover no-repeat',
            transform: 'translateY(-4.375vw)',
          }}
        />
      </div>
      <div style={{ transform: 'translateY(-11.51vw)' }}>
        <CTA01 state="default" onClick={handleNext}>
          <Typography size="1.042vw" bold="700" color="var(--White, #FFF)">
            고파스 아이디로 쿠플라이 이용하기
          </Typography>
        </CTA01>
      </div>
    </Wrapper2>
  );
}

const TextTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: -170px; // 왜 생겼지? 원인 못찾음... ??
  margin-bottom: 18px;
`;

const TextOutBox = styled.div`
  //width: 100%; // 32.7083vw; // (628/1920)*100vw  width: 628px;
  width: 31.7vw;
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
  z-index: 1;
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
