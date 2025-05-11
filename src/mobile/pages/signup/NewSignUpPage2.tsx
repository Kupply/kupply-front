import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import CheckBox01 from '../../assets/checkBoxes/CheckBox01';
import { MobileScroll } from '../../assets/scroll/MobileScroll';
import { TermsText1, TermsText2 } from '../../components/signup/TermsText';
import { TermsText } from '../../components/sync/TermsText';
import Button04 from '../../assets/buttons/Button04';
import Button03 from '../../assets/buttons/Button03';
import { SignUpPageWrapper } from '../../components/signup/SignUpPageWrapper';
import { majorCodeToNameMapping } from '../../../mappings/Mappings';

interface IndividualChecks {
  first: boolean;
  second: boolean;
  third: boolean;
}

export function SignUp2Page() {
  const [allChecked, setAllChecked] = useState(false);
  const [allUIChecked, setAllUIChecked] = useState(false);
  const [individualChecks, setIndividualChecks] = useState<IndividualChecks>({
    first: false,
    second: false,
    third: false,
  });
  const [isButtonActive, setIsButtonActive] = useState(false);
  //const button = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const allStateAgreed = () => {
    return Object.values(individualChecks).every((val) => val);
  };

  const handleAllCheckedClick = () => {
    const newState = !allChecked;
    setAllChecked(newState);
    setIndividualChecks({
      first: newState,
      second: newState,
      third: newState,
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

  const handlePrev = () => {
    navigate('/signUp1');
  };

  const handleNext = async () => {
    if (isButtonActive) {
      sessionStorage.setItem('agreeTerms', 'true'); // 모든 약관에 동의할 경우 - signuppag3에서 확인용
      navigate('/signup3');
    } else {
      alert('모든 약관에 동의해주세요.');
    }
  };

  useEffect(() => {
    if (!sessionStorage.getItem('koreapasUUID')) navigate('/');
    const firstMajorCode = sessionStorage.getItem('firstMajorCode') || '';
    const firstMajorCampus = sessionStorage.getItem('firstMajorCampus') || '';

    if (firstMajorCampus === 'A' && !firstMajorCode) {
      alert('고파스의 ‘꽈톡’ 페이지에 접속 후 다시 회원가입을 시도해주세요.');
      sessionStorage.clear();
      navigate('/');
      return;
    }
  }, []);

  const nickname = sessionStorage.getItem('nickname')!;

  return (
    <SignUpPageWrapper step={2} stepInfo="약관 읽고 서비스 이용하기">
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
            개인정보 수집 및 이용 동의 (필수)
          </CheckBox01>
          <TextOutBox>
            <MobileScroll height="30vw">
              <TermsText1 />
            </MobileScroll>
          </TextOutBox>
        </>
        <>
          <CheckBox01
            state={individualChecks.second ? 'active' : 'default'}
            style={{ fontSize: '3.33vw', fontWeight: '500' }}
            onImageClick={() => handleIndividualCheck('second')}
          >
            서비스 이용약관 동의 (필수)
          </CheckBox01>
          <TextOutBox>
            <MobileScroll height="30vw">
              <TermsText2 />
            </MobileScroll>
          </TextOutBox>
        </>
        <>
          <CheckBox01
            state={individualChecks.third ? 'active' : 'default'}
            style={{ fontSize: '3.33vw', fontWeight: '500' }}
            onImageClick={() => handleIndividualCheck('third')}
          >
            개인정보 수집 및 이용 동의 (필수)
          </CheckBox01>
          <TextOutBox>
            <MobileScroll height="30vw">
              <TermsText koreapasNickname={nickname} />
            </MobileScroll>
          </TextOutBox>
        </>
      </ContentsList>
      <ButtonsWrapper>
        <Button04 onClick={handlePrev} style={{ width: '25.582%' }} />
        <Button03 state={allChecked ? 'default' : 'disabled'} onClick={handleNext} style={{ width: '74.418%' }} />
      </ButtonsWrapper>
    </SignUpPageWrapper>
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
