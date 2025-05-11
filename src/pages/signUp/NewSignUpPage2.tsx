import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUpPageWrapper } from '../../components/signUp/SignUpPageWrapper';
import styled, { css } from 'styled-components';
import { CheckBoxButton01 } from '../../assets/buttons/CheckBoxButton';
import { ScrollLarge, ScrollSmall } from '../../assets/scroll/Scroll';
import { TermsText1, TermsText2 } from '../../components/signUp/TermsText';
import { TermsText } from '../../components/sync/TermsText';
import Button04 from '../../assets/buttons/Button04';
import Button03 from '../../assets/buttons/Button03';
import { majorCodeToNameMapping } from '../../mappings/Mappings';

// 거의 완전히 수정해야할 것으로 보임
export function SignUp2Page() {
  const [allChecked, setAllChecked] = useState(false);
  const [allUIChecked, setAllUIChecked] = useState(false);
  const [individualChecks, setIndividualChecks] = useState({
    first: false,
    second: false,
    third: false,
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
        third: true,
      });
    } else {
      setIndividualChecks({
        first: false,
        second: false,
        third: false,
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
          서비스 이용약관 동의 (필수)
        </CheckBoxButton01>
        <TextOutBox>
          <ScrollSmall isChecked={scrollActive}>
            <TermsText1 />
          </ScrollSmall>
        </TextOutBox>
        <div style={{ height: '2vw' }}></div>
        <CheckBoxButton01
          isChecked={individualChecks.second}
          onCustomFunction={(newCheckedValue) =>
            setIndividualChecks((prev) => ({
              ...prev,
              second: newCheckedValue,
            }))
          }
        >
          개인정보 수집 및 이용 동의 (필수)
        </CheckBoxButton01>
        <TextOutBox>
          <ScrollSmall isChecked={scrollActive}>
            <TermsText2 />
          </ScrollSmall>
        </TextOutBox>
        <div style={{ height: '2vw' }}></div>
        <CheckBoxButton01
          isChecked={individualChecks.third}
          onCustomFunction={(newCheckedValue) =>
            setIndividualChecks((prev) => ({
              ...prev,
              third: newCheckedValue,
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
        <ButtonsWrapper>
          <NextButtonFixedWidth
            state={isButtonActive ? 'pressed' : 'disabled'}
            onClick={handleNext}
            style={{ width: '100%' }}
          >
            완료
          </NextButtonFixedWidth>
        </ButtonsWrapper>
        <div ref={button} />
      </ScrollLarge>
    </SignUpPageWrapper>
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
