import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

import CheckBox01 from '../../assets/checkBoxes/CheckBox01';
import { MobileScroll } from '../../assets/scroll/MobileScroll';
import { TermsText } from '../../components/sync/TermsText';
import Button03 from '../../assets/buttons/Button03';
import CTA01 from '../../assets/CTAs/CTA01';
import Typography from '../../../assets/Typography';
import { api_url } from '../../../utils/HttpClient';
import { SyncPageWrapper } from '../../components/signup/SyncPageWrapper';

interface IndividualChecks {
  first: boolean;
  second: boolean;
}

export default function SyncPage2() {
  const [allChecked, setAllChecked] = useState(false);
  const [allUIChecked, setAllUIChecked] = useState(false);
  const [individualChecks, setIndividualChecks] = useState<IndividualChecks>({
    first: false,
    second: true,
  });
  const [isButtonActive, setIsButtonActive] = useState(false);
  const navigate = useNavigate();

  const allStateAgreed = () => {
    return Object.values(individualChecks).every((val) => val);
  };

  const handleAllCheckedClick = () => {
    const newState = !allChecked;
    setAllChecked(newState);
    setIndividualChecks({
      first: newState,
      second: true,
    });
  };

  const handleIndividualCheck = (check: keyof IndividualChecks) => {
    setIndividualChecks((prev) => {
      const updatedChecks = {
        ...prev,
        [check]: !prev[check],
      };
      // Set allChecked based on the updated individual checks
      setAllChecked(Object.values(updatedChecks).every(Boolean));
      return updatedChecks;
    });
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
    <SyncPageWrapper step={3} stepInfo="약관 읽고 서비스 이용하기">
      <ContentsList>
        <TextTitle>
          <CheckBox01
            state={allChecked ? 'active' : 'default'}
            style={{ fontSize: '3.89vw', fontWeight: '700' }}
            onImageClick={handleAllCheckedClick}
          >
            약관 전체 동의하기
          </CheckBox01>
        </TextTitle>
        <div style={{ height: '1px', backgroundColor: '#E7E7E7' }}></div>
        <>
          <CheckBox01
            state={individualChecks.first ? 'active' : 'default'}
            style={{ fontSize: '3.33vw', fontWeight: '500' }}
            onImageClick={() => handleIndividualCheck('first')}
          >
            고파스 개인정보 수집 및 이용 동의 (필수)
          </CheckBox01>
          <TextOutBox>
            <MobileScroll height="30vw">
              <TermsText koreapasNickname={nickname} />
            </MobileScroll>
          </TextOutBox>
        </>
      </ContentsList>
      <ButtonsWrapper>
        <Button03 state={allChecked ? 'default' : 'disabled'} onClick={handleButtonClick} style={{ width: '100%' }} />
      </ButtonsWrapper>
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
        <Typography size="5.55vw" bold="700" style={{ lineHeight: '2.604vw' }}>
          축하합니다!
        </Typography>
      </div>
      <div style={{ textAlign: 'center', zIndex: 1 }}>
        <Typography size="3.89vw" bold="700" style={{ opacity: '0.8', lineHeight: '125%', fontWeight: '500' }}>
          연동이 성공적으로 완료되었어요.
          <br />
          <br />
          고파스 아이디로 로그인 후,
          <br />
          쿠플라이의 다양한 서비스를 이용해보세요.
        </Typography>
      </div>
      <div>
        <img
          src="designImage/signUp/CheckAni.webp"
          alt="completeImage"
          style={{
            width: '90vw',
            height: '100%',
            background: 'url(designImage/signUp/CheckAni.webp), lightgray 50% / cover no-repeat',
            transform: 'translateY(-4.375vw)',
          }}
        />
      </div>
      <CTA01 state="default" onClick={handleNext}>
        고파스 아이디로 쿠플라이 이용하기
      </CTA01>
    </Wrapper2>
  );
}

const TextOutBox = styled.div`
  width: 91.11vw;
  height: 38.9vw;
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
  font-size: 2.78vw;
  font-style: normal;
  font-weight: 400;
  line-height: 123.54%;
  z-index: 1;
`;

const TextTitle = styled.div`
  display: flex;
  align-items: center;
  //gap: 8px;
  margin-top: 8.89vw;
`;

const ContentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5.56vw;
  width: 91.11vw;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  margin-top: 5vw;
  gap: 2.222vw; /* 8px converted to vw */
  width: 100%;
  // Additional style using vh might be considered based on dynamic content or device orientation changes
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
