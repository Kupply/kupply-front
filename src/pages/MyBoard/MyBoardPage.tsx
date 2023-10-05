import React, { useState, ChangeEvent, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '../../assets/Typography';
import { InterestMajorEditButton, EditButton } from '../../assets/buttons/InterestMajorEditButton';
import MockApplicationButton from '../../assets/buttons/MockApplication';
import InterestMajorButton from '../../assets/buttons/InterestMajorButton';
import PieChartComponent from '../../assets/MyBoardChart';
import { ProfileEditPage, InterestMajorPage, GpaPage, GpaSavePage, HopeSemester } from '../MyBoard/MyBoardEditModal';

/* 
공통 정보: 이름, 학번, 1전공, 전화번호, 아이디, 비밀번호, 도전생 or 진입생

도전생 : 희망 1지망, 2지망 전공, 현재 학점, 희망 이중 지원학기
진입생 : 제2전공, 지원 당시 학점, 진입학기
*/

/* 
1지망, 2지망 바꾸려면, 서버로부터 데이터 받아오는 것 먼저 해야겠다. 

로직) 
1. 서버(DB)로부터 회원구분(도전생 or 진입생)에 따라 정보를 받아 리스트로 저장한다.
2. 조건문(삼항조건문)에 따라 회원의 1지망, 2지망에 따라 다른 데이터를 보여준다. 
*/

const major = {
  Business: {
    image: 'path/to/computerScience.jpg',
    title: '경영대학',
    text: 'Business School',
  },
  Psychology: {
    image: 'path/to/computerScience.jpg',
    title: '심리학부',
    text: 'School of Psychology',
  },
  Economics: {
    image: 'path/to/computerScience.jpg',
    title: '경제학과',
    text: 'Department of Economics',
  },
  Statistics: {
    image: 'path/to/computerScience.jpg',
    title: '통계학과',
    text: 'Department of Statistics',
  },
  Media: {
    image: 'path/to/computerScience.jpg',
    title: '미디어학부',
    text: 'School of Media and Communication',
  },
  Computer: {
    image: 'path/to/computerScience.jpg',
    title: '컴퓨터학과',
    text: 'Department of Computer Science and Engineering',
  },
  FoodandResources: {
    image: 'path/to/computerScience.jpg',
    title: '식품자원경제학과',
    text: 'Department of Food and Resources',
  },
  Math: {
    image: 'path/to/computerScience.jpg',
    title: '수학과',
    text: 'Department of Mathematics',
  },
  Chemistry: {
    image: 'path/to/computerScience.jpg',
    title: '화학과',
    text: 'Department of Chemistry',
  },
};

export default function MyBoardPage() {
  const [isApplied, setIsApplied] = useState<boolean>(false);
  const [onViewMajor, setOnViewMajor] = useState<number>(1); // 1지망 학과를 보고 있다는 의미
  // 회원의 1, 2지망 학과에 따라 다른 화면을 보여주어야 할 것이다. 현재는 하드코딩이므로 수정 필요하다.
  const [scrollY, setScrollY] = useState(0);

  const onClickApplication = useCallback(() => {
    setIsApplied(true);
    console.log('모의지원 완료');
  }, [isApplied]);

  const onClickInterest1 = useCallback(() => {
    setOnViewMajor(1);
    console.log('1지망 선택');
  }, [onViewMajor]);

  const onClickInterest2 = useCallback(() => {
    setOnViewMajor(2);
    console.log('2지망 선택');
  }, [onViewMajor]);

  useEffect(() => {
    const handleScroll = () => {
      let newPositionY = window.scrollY - 200; // 내 노트북에는 화면 안에 모의지원버튼까지 보이지 않아서 임의로 조정해놨습니다
      if (newPositionY < 0) {
        newPositionY = 0;
      }

      if (newPositionY > 916) {
        newPositionY = 916;
      }
      setScrollY(newPositionY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Wrapper>
        <LeftSideWrapper>
          <div style={{ marginTop: '-82px' }}>
            <MyInformationBox translateY={scrollY}>
              <CharacterImageBox style={{ marginLeft: '128.01px', marginTop: '150px' }}>
                <CharacterImage src="design_image/character/chick profile.png" alt="chick image" />
              </CharacterImageBox>
              <div style={{ display: 'flex', alignItems: 'baseline', marginLeft: '128.01px' }}>
                <Typography
                  size="heading2"
                  style={{ color: 'var(--Main-Black, #141414)', marginTop: '20px', lineHeight: '125%' }}
                >
                  고대빵
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography
                    size="bodyText"
                    style={{ color: 'rgba(20, 20, 20, 0.60)', fontWeight: '500', marginLeft: '6px' }}
                  >
                    도전자 님
                  </Typography>
                  <EditButton />
                </div>
              </div>
              <div style={{ marginTop: '15px' }}>
                <Typography
                  size="bodyText"
                  style={{ color: 'rgba(67, 67, 67, 0.60)', fontWeight: '500', marginLeft: '128.01px' }}
                >
                  디자인조형학부 20학번
                </Typography>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="284"
                height="2"
                viewBox="0 0 284 2"
                fill="none"
                style={{ marginTop: '30px', marginLeft: '128.01px' }}
              >
                <path d="M283 1L0.999992 1" stroke="#DFDFDF" stroke-linecap="round" />
              </svg>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '44px', marginLeft: '128.01px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M17.4993 8.33325C17.6088 8.33328 17.7172 8.31174 17.8183 8.26987C17.9194 8.22801 18.0113 8.16662 18.0887 8.08924C18.1661 8.01185 18.2274 7.91997 18.2693 7.81885C18.3112 7.71774 18.3327 7.60936 18.3327 7.49992V4.99992C18.3328 4.82506 18.2778 4.65463 18.1755 4.51279C18.0733 4.37095 17.9289 4.26491 17.763 4.20972L10.263 1.70972C10.0919 1.65275 9.90684 1.65275 9.73567 1.70972L2.23567 4.20972C2.06976 4.26491 1.92544 4.37095 1.82319 4.51279C1.72093 4.65463 1.66594 4.82506 1.66602 4.99992V7.49992C1.66599 7.60936 1.68752 7.71774 1.72939 7.81885C1.77126 7.91997 1.83264 8.01185 1.91003 8.08924C1.98742 8.16662 2.0793 8.22801 2.18041 8.26987C2.28153 8.31174 2.38991 8.33328 2.49935 8.33325H3.33268V14.3201C2.84663 14.4914 2.42549 14.8088 2.12707 15.2289C1.82866 15.6491 1.6676 16.1513 1.66602 16.6666V18.3333C1.66599 18.4427 1.68752 18.5511 1.72939 18.6522C1.77126 18.7533 1.83264 18.8452 1.91003 18.9226C1.98742 19 2.0793 19.0613 2.18041 19.1032C2.28153 19.1451 2.38991 19.1666 2.49935 19.1666H17.4993C17.6088 19.1666 17.7172 19.1451 17.8183 19.1032C17.9194 19.0613 18.0113 19 18.0887 18.9226C18.1661 18.8452 18.2274 18.7533 18.2693 18.6522C18.3112 18.5511 18.3327 18.4427 18.3327 18.3333V16.6666C18.3311 16.1513 18.17 15.6491 17.8716 15.2289C17.5732 14.8088 17.1521 14.4914 16.666 14.3201V8.33325H17.4993ZM16.666 17.4999H3.33268V16.6666C3.3329 16.4456 3.42077 16.2338 3.577 16.0776C3.73324 15.9213 3.94507 15.8335 4.16602 15.8333H15.8327C16.0536 15.8335 16.2655 15.9213 16.4217 16.0776C16.5779 16.2338 16.6658 16.4456 16.666 16.6666V17.4999ZM4.99935 14.1666V8.33325H6.66602V14.1666H4.99935ZM8.33268 14.1666V8.33325H11.666V14.1666H8.33268ZM13.3327 14.1666V8.33325H14.9993V14.1666H13.3327ZM3.33268 6.66658V5.6005L9.99935 3.378L16.666 5.6005V6.66658H3.33268Z"
                    fill="#434343"
                    fill-opacity="0.6"
                  />
                </svg>
                <Typography
                  size="bodyText"
                  style={{ color: 'rgba(67, 67, 67, 0.60)', fontWeight: '400px', marginLeft: '10px' }}
                >
                  관심 전공
                </Typography>
              </div>
              <div style={{ display: 'flex', marginTop: '14px', marginLeft: '128px' }}>
                <InterestMajorBox>
                  <MajorSymbolShadow>
                    <MajorSymbol src="design_image/major_symbol/bussiness_trans.png" alt="business school" />
                    <svg xmlns="http://www.w3.org/2000/svg" width="112" height="112" viewBox="0 0 112 112" fill="none">
                      <circle cx="56" cy="56" r="56" fill="url(#paint0_radial_3725_3779)" fill-opacity="0.7" />
                      <defs>
                        <radialGradient
                          id="paint0_radial_3725_3779"
                          cx="0"
                          cy="0"
                          r="1"
                          gradientUnits="userSpaceOnUse"
                          gradientTransform="translate(56 58.5751) rotate(90) scale(53.4249)"
                        >
                          <stop stop-color="#926853" stop-opacity="0.58" />
                          <stop offset="1" stop-color="white" stop-opacity="0" />
                        </radialGradient>
                      </defs>
                    </svg>
                  </MajorSymbolShadow>
                  <div style={{ marginTop: '16px', marginLeft: '130px' }}>
                    <Typography
                      size="bodyText"
                      style={{ color: 'rgba(67, 67, 67, 0.60)', fontWeight: '400', lineHeight: '20px' }}
                    >
                      1지망
                    </Typography>
                    <Typography size="bodyText" style={{ color: 'var(--Main-Black, #141414)', marginTop: '16px' }}>
                      경영대학
                    </Typography>
                    <Typography
                      size="normalText"
                      style={{
                        color: 'var(--Main-Black, #141414)',
                        fontWeight: '400',
                        lineHeight: '128.571%',
                        opacity: 0.8,
                      }}
                    >
                      Business School
                    </Typography>
                  </div>
                </InterestMajorBox>
              </div>
              <div style={{ display: 'flex', marginTop: '14px', marginLeft: '128px' }}>
                <InterestMajorBox>
                  <MajorSymbolShadow>
                    <MajorSymbol src="design_image/major_symbol/media_trans.png" alt="school fo media" />
                    <svg xmlns="http://www.w3.org/2000/svg" width="112" height="112" viewBox="0 0 112 112" fill="none">
                      <circle cx="56" cy="56" r="56" fill="url(#paint0_radial_3725_1679)" fill-opacity="0.7" />
                      <defs>
                        <radialGradient
                          id="paint0_radial_3725_1679"
                          cx="0"
                          cy="0"
                          r="1"
                          gradientUnits="userSpaceOnUse"
                          gradientTransform="translate(56 58.5751) rotate(90) scale(53.4249)"
                        >
                          <stop stop-color="#7BBEEE" stop-opacity="0.6" />
                          <stop offset="1" stop-color="white" stop-opacity="0" />
                        </radialGradient>
                      </defs>
                    </svg>
                  </MajorSymbolShadow>
                  <div style={{ marginTop: '16px', marginLeft: '130px' }}>
                    <Typography
                      size="bodyText"
                      style={{ color: 'rgba(67, 67, 67, 0.60)', fontWeight: '400', lineHeight: '20px' }}
                    >
                      1지망
                    </Typography>
                    <Typography size="bodyText" style={{ color: 'var(--Main-Black, #141414)', marginTop: '8px' }}>
                      미디어학부
                    </Typography>
                    <Typography
                      size="normalText"
                      style={{
                        color: 'var(--Main-Black, #141414)',
                        fontWeight: '400',
                        lineHeight: '114.286%',
                        opacity: 0.8,
                      }}
                    >
                      School of Media
                      <br /> Communication
                    </Typography>
                  </div>
                </InterestMajorBox>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="284"
                height="2"
                viewBox="0 0 284 2"
                fill="none"
                style={{ marginTop: '30px', marginLeft: '128.01px' }}
              >
                <path d="M283 1L0.999992 1" stroke="#DFDFDF" stroke-linecap="round" />
              </svg>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '44px', marginLeft: '128.01px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4.15323 17.5L15.7787 17.5C16.6959 17.5 17.4395 16.7538 17.4395 15.8333L17.4395 4.16667C17.4395 3.24619 16.6959 2.5 15.7787 2.5L4.15323 2.5C3.23601 2.5 2.49246 3.24619 2.49246 4.16667L2.49245 15.8333C2.49245 16.7538 3.23601 17.5 4.15323 17.5Z"
                    stroke="#434343"
                    stroke-opacity="0.6"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5.81352 14.1665L8.30469 14.1665L8.30469 9.99984L5.81352 9.99984L5.81352 14.1665Z"
                    stroke="#434343"
                    stroke-opacity="0.6"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11.626 14.1665L14.1172 14.1665L14.1172 6.6665L11.626 6.6665L11.626 14.1665Z"
                    stroke="#434343"
                    stroke-opacity="0.6"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <Typography
                  size="bodyText"
                  style={{ color: 'rgba(67, 67, 67, 0.60)', fontWeight: '400px', marginLeft: '9.97px' }}
                >
                  현재 내 학점
                </Typography>
                <Typography
                  size="bodyText"
                  style={{ color: 'var(--Main-Black, #141414)', fontWeight: '500', marginLeft: '71.74px' }}
                >
                  4.2
                </Typography>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="284"
                height="2"
                viewBox="0 0 284 2"
                fill="none"
                style={{ marginTop: '44px', marginLeft: '128.01px' }}
              >
                <path d="M283 1L0.999992 1" stroke="#DFDFDF" stroke-linecap="round" />
              </svg>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '44px', marginLeft: '128.01px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M15.7765 3.3335H4.15101C3.23379 3.3335 2.49023 4.07969 2.49023 5.00016V16.6668C2.49023 17.5873 3.23379 18.3335 4.15101 18.3335H15.7765C16.6937 18.3335 17.4372 17.5873 17.4372 16.6668V5.00016C17.4372 4.07969 16.6937 3.3335 15.7765 3.3335Z"
                    stroke="#8B8B8B"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2.49023 8.3335H17.4372"
                    stroke="#8B8B8B"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13.2871 1.6665V4.99984"
                    stroke="#8B8B8B"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6.64258 1.6665V4.99984"
                    stroke="#8B8B8B"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <Typography
                  size="bodyText"
                  style={{ color: 'rgba(67, 67, 67, 0.60)', fontWeight: '400', marginLeft: '9.97px' }}
                >
                  희망 진입학기
                </Typography>
                <Typography
                  size="bodyText"
                  style={{ color: 'var(--Main-Black, #141414)', fontWeight: '500', marginLeft: '59.4px' }}
                >
                  2023-2R
                </Typography>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="284"
                height="2"
                viewBox="0 0 284 2"
                fill="none"
                style={{ marginTop: '44px', marginLeft: '128.01px' }}
              >
                <path d="M283 1L0.999992 1" stroke="#DFDFDF" stroke-linecap="round" />
              </svg>
              <div style={{ marginTop: '44px', marginLeft: '128.01px' }}>
                <MockApplicationButton onClick={onClickApplication} />
              </div>
            </MyInformationBox>
          </div>
        </LeftSideWrapper>
        <div style={{ marginTop: '-82px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <InterestMajorButton onClick={onClickInterest1} style={{ marginTop: '154px', marginLeft: '551px' }} />
            <InterestMajorButton onClick={onClickInterest2} style={{ marginTop: '154px', marginLeft: '18px' }}>
              2지망
            </InterestMajorButton>
          </div>
          {onViewMajor === 1 ? (
            <>
              <div style={{ marginLeft: '551px' }}>
                <BigMajorSymbolBox style={{ marginTop: '32px' }}>
                  <BigMajorSymbol
                    src="design_image/major_symbol/bussiness_trans.png"
                    alt="business school"
                    style={{ marginTop: '107px', marginLeft: '105px' }}
                  />
                  <Typography
                    size="title2"
                    style={{
                      lineHeight: '138.889%',
                      marginTop: '34px',
                      textAlign: 'center',
                    }}
                  >
                    경영대학
                  </Typography>
                  <Typography
                    size="largeText"
                    style={{
                      fontWeight: '500',
                      opacity: '0.8',
                      marginTop: '0px',
                      textAlign: 'center',
                    }}
                  >
                    Business School
                  </Typography>
                </BigMajorSymbolBox>
                <div style={{ marginTop: '-571px', marginLeft: '424px' }}>
                  <CompetitionRateBox>
                    <Typography
                      size="bodyText"
                      style={{
                        marginTop: '26px',
                        marginLeft: '36px',
                        marginBottom: '14px',
                      }}
                    >
                      실시간 경쟁률
                    </Typography>
                    <svg xmlns="http://www.w3.org/2000/svg" width="392" height="2" viewBox="0 0 392 2" fill="none">
                      <path d="M0 1L392 1" stroke="#DFDFDF" />
                    </svg>
                    <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '52px', marginLeft: '36px' }}>
                      <Typography size="heading1" style={{ color: '#D85888', lineHeight: '104.167%' }}>
                        {`3.14\u00A0`}
                      </Typography>
                      <Typography
                        size="heading1"
                        style={{ color: 'rgba(67, 67, 67, 0.80)', fontWeight: '400', lineHeight: '50px' }}
                      >
                        : 1
                      </Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '37px', marginLeft: '36px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M13.416 2.3335V5.8335H9.91602"
                          stroke="#A8A8A8"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M11.9521 8.74985C11.5729 9.82313 10.8552 10.7441 9.90703 11.374C8.95888 12.0038 7.8317 12.3085 6.69535 12.242C5.55899 12.1755 4.47503 11.7415 3.60679 11.0054C2.73856 10.2693 2.1331 9.27089 1.88165 8.16071C1.6302 7.05053 1.74638 5.8887 2.21269 4.8503C2.679 3.8119 3.47017 2.95318 4.46698 2.40355C5.46379 1.85392 6.61223 1.64315 7.73925 1.80301C8.86626 1.96287 9.9108 2.48469 10.7154 3.28985L13.4163 5.83318"
                          stroke="#A8A8A8"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <Typography size="smallText" style={{ color: '#A8A8A8', marginLeft: '4px' }}>
                        Last Update 5:58 PM
                      </Typography>
                    </div>
                  </CompetitionRateBox>
                </div>
                <div style={{ marginTop: '23px', marginLeft: '424px' }}>
                  <CompetitionRateBox>
                    <Typography
                      size="bodyText"
                      style={{
                        marginTop: '26px',
                        marginLeft: '36px',
                        marginBottom: '14px',
                      }}
                    >
                      실시간 지원자
                    </Typography>
                    <svg xmlns="http://www.w3.org/2000/svg" width="392" height="2" viewBox="0 0 392 2" fill="none">
                      <path d="M0 1L392 1" stroke="#DFDFDF" />
                    </svg>
                    <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '52px', marginLeft: '36px' }}>
                      <Typography size="heading1" style={{ color: '#D85888', lineHeight: '104.167%' }}>
                        {`32\u00A0`}
                      </Typography>
                      <Typography
                        size="heading1"
                        style={{ color: 'rgba(67, 67, 67, 0.80)', fontWeight: '400', lineHeight: '50px' }}
                      >
                        / 12
                      </Typography>
                      <Typography
                        size="normalText"
                        style={{
                          color: 'var(--Black2, #434343)',
                          fontWeight: '400',
                          lineHeight: '112.5%',
                          marginLeft: '13px',
                        }}
                      >
                        {`\u00A0 명`}
                      </Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '37px', marginLeft: '36px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M13.416 2.3335V5.8335H9.91602"
                          stroke="#A8A8A8"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M11.9521 8.74985C11.5729 9.82313 10.8552 10.7441 9.90703 11.374C8.95888 12.0038 7.8317 12.3085 6.69535 12.242C5.55899 12.1755 4.47503 11.7415 3.60679 11.0054C2.73856 10.2693 2.1331 9.27089 1.88165 8.16071C1.6302 7.05053 1.74638 5.8887 2.21269 4.8503C2.679 3.8119 3.47017 2.95318 4.46698 2.40355C5.46379 1.85392 6.61223 1.64315 7.73925 1.80301C8.86626 1.96287 9.9108 2.48469 10.7154 3.28985L13.4163 5.83318"
                          stroke="#A8A8A8"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <Typography size="smallText" style={{ color: '#A8A8A8', marginLeft: '4px' }}>
                        Last Update 5:58 PM
                      </Typography>
                    </div>
                  </CompetitionRateBox>
                </div>
                <div style={{ marginTop: '-575px', marginLeft: '847px' }}>
                  <ThreeYearCumulativeDataBox>
                    <Typography
                      size="bodyText"
                      style={{ color: 'var(--Main-Black, #141414)', marginTop: '26px', marginLeft: '36px' }}
                    >
                      3개년 합격지표
                    </Typography>
                    <EachYearHeadBox style={{ marginTop: '10px', marginLeft: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <EachYearBox style={{ marginTop: '8px', marginLeft: '45px' }}>
                          <Typography
                            size="smallText"
                            style={{
                              color: 'var(--White, #FFF)',
                              fontWeight: '500',
                              lineHeight: '103.949%',
                              marginTop: '7px',
                              marginLeft: '16px',
                            }}
                          >
                            2023-1R
                          </Typography>
                        </EachYearBox>
                        <EachYearBox style={{ marginTop: '8px', marginLeft: '4px' }}>
                          <Typography
                            size="smallText"
                            style={{
                              color: 'var(--White, #FFF)',
                              fontWeight: '500',
                              lineHeight: '103.949%',
                              marginTop: '7px',
                              marginLeft: '16px',
                            }}
                          >
                            2022-2R
                          </Typography>
                        </EachYearBox>
                        <EachYearBox style={{ marginTop: '8px', marginLeft: '4px' }}>
                          <Typography
                            size="smallText"
                            style={{
                              color: 'var(--White, #FFF)',
                              fontWeight: '500',
                              lineHeight: '103.949%',
                              marginTop: '7px',
                              marginLeft: '16px',
                            }}
                          >
                            2022-1R
                          </Typography>
                        </EachYearBox>
                      </div>
                    </EachYearHeadBox>
                    <svg xmlns="http://www.w3.org/2000/svg" width="392" height="2" viewBox="0 0 392 2" fill="none">
                      <path d="M0 1L392 1" stroke="#DFDFDF" />
                    </svg>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '41px' }}>
                      <Typography
                        size="bodyText"
                        style={{
                          color: 'var(--Main-Black, #141414)',
                          fontWeight: '600',
                          lineHeight: '90%',
                          marginLeft: '36px',
                        }}
                      >
                        2024-1R 경영대학 모집정보
                      </Typography>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="60"
                        height="60"
                        viewBox="0 0 60 60"
                        fill="none"
                        style={{ marginLeft: '6px' }}
                      >
                        <path
                          d="M26 37L34 30"
                          stroke="#141414"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M34 30L26 22"
                          stroke="#141414"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '51px' }}>
                      <Typography size="mediumText" style={{ color: 'rgba(20, 20, 20, 0.60)', marginLeft: '36px' }}>
                        24-1 선발 인원
                      </Typography>
                      <Typography size="mediumText" style={{ color: 'rgba(20, 20, 20, 0.60)', marginLeft: '85px' }}>
                        경쟁률
                      </Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '9px' }}>
                      <Typography
                        size="largeText"
                        style={{ color: 'var(--Main-Black, #141414)', fontWeight: '600', marginLeft: '36px' }}
                      >
                        25명
                      </Typography>
                      <Typography
                        size="largeText"
                        style={{ color: 'var(--Main-Black, #141414)', fontWeight: '600', marginLeft: '143px' }}
                      >
                        3.59 : 1
                      </Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '60.98px' }}>
                      <Typography size="mediumText" style={{ color: 'rgba(20, 20, 20, 0.60)', marginLeft: '36px' }}>
                        합격자 평균 학점
                      </Typography>
                      <Typography size="mediumText" style={{ color: 'rgba(20, 20, 20, 0.60)', marginLeft: '76px' }}>
                        합격자 최저 학점
                      </Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '9px' }}>
                      <Typography
                        size="largeText"
                        style={{ color: 'var(--Main-Black, #141414)', fontWeight: '600', marginLeft: '36px' }}
                      >
                        4.23
                      </Typography>
                      <Typography
                        size="largeText"
                        style={{ color: 'var(--Main-Black, #141414)', fontWeight: '600', marginLeft: '142px' }}
                      >
                        4.12
                      </Typography>
                    </div>
                  </ThreeYearCumulativeDataBox>
                </div>
              </div>
              <div style={{ marginLeft: '551px', marginTop: '30px' }}>
                <RangeBox>
                  <Typography
                    size="bodyText"
                    style={{
                      color: 'var(--Main-Black, #141414)',
                      marginTop: '26px',
                      marginLeft: '36px',
                      marginBottom: '14px',
                    }}
                  >
                    내 학점 위치 파악하기
                  </Typography>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1239" height="2" viewBox="0 0 1239 2" fill="none">
                    <path d="M0 1L1239 1" stroke="#DFDFDF" />
                  </svg>
                  <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px', marginTop: '7px' }}>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="247"
                        height="174"
                        viewBox="0 0 247 174"
                        fill="none"
                      >
                        <g filter="url(#filter0_d_3391_8955)">
                          <path
                            d="M30 25C30 22.2386 32.2386 20 35 20H212C214.761 20 217 22.2386 217 25V129C217 131.761 214.761 134 212 134H35C32.2386 134 30 131.761 30 129V25Z"
                            fill="white"
                            stroke="black"
                            stroke-width="2"
                          />
                        </g>
                        <defs>
                          <filter
                            id="filter0_d_3391_8955"
                            x="0"
                            y="0"
                            width="247"
                            height="174"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                          >
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feOffset dy="10" />
                            <feGaussianBlur stdDeviation="15" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 0.505726 0 0 0 0 0.847059 0 0 0 0 0.345098 0 0 0 0.1 0"
                            />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3391_8955" />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="effect1_dropShadow_3391_8955"
                              result="shape"
                            />
                          </filter>
                        </defs>
                      </svg>
                    </div>
                    <div style={{ marginLeft: '-73px' }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="260"
                        height="174"
                        viewBox="0 0 260 174"
                        fill="none"
                      >
                        <g filter="url(#filter0_d_3391_8959)">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M48 20C45.2386 20 43 22.2386 43 25V35.4944L30 43L43 50.5056V129C43 131.761 45.2386 134 48 134H225C227.761 134 230 131.761 230 129V25C230 22.2386 227.761 20 225 20H48Z"
                            fill="white"
                            stroke="black"
                            stroke-width="2"
                          />
                        </g>
                        <defs>
                          <filter
                            id="filter0_d_3391_8959"
                            x="0"
                            y="0"
                            width="260"
                            height="174"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                          >
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feOffset dy="10" />
                            <feGaussianBlur stdDeviation="15" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 0.270588 0 0 0 0 0.4 0 0 0 0 0.886275 0 0 0 0.1 0"
                            />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3391_8959" />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="effect1_dropShadow_3391_8959"
                              result="shape"
                            />
                          </filter>
                        </defs>
                      </svg>
                    </div>
                    <div style={{ marginLeft: '-73px' }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="259"
                        height="174"
                        viewBox="0 0 259 174"
                        fill="none"
                      >
                        <g filter="url(#filter0_d_3391_8962)">
                          <mask id="path-1-inside-1_3391_8962" fill="white">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M48 20C45.2386 20 43 22.2386 43 25V35.4944L30 43L43 50.5056V129C43 131.761 45.2386 134 48 134H224C226.761 134 229 131.761 229 129V25C229 22.2386 226.761 20 224 20H48Z"
                            />
                          </mask>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M48 20C45.2386 20 43 22.2386 43 25V35.4944L30 43L43 50.5056V129C43 131.761 45.2386 134 48 134H224C226.761 134 229 131.761 229 129V25C229 22.2386 226.761 20 224 20H48Z"
                            fill="#E96D6D"
                            fill-opacity="0.8"
                            shape-rendering="crispEdges"
                          />
                          <path
                            d="M43 35.4944L43.5 36.3605L44 36.0718V35.4944H43ZM30 43L29.5 42.134L28 43L29.5 43.866L30 43ZM43 50.5056H44V49.9282L43.5 49.6395L43 50.5056ZM44 25C44 22.7909 45.7909 21 48 21V19C44.6863 19 42 21.6863 42 25H44ZM44 35.4944V25H42V35.4944H44ZM42.5 34.6284L29.5 42.134L30.5 43.866L43.5 36.3605L42.5 34.6284ZM29.5 43.866L42.5 51.3716L43.5 49.6395L30.5 42.134L29.5 43.866ZM44 129V50.5056H42V129H44ZM48 133C45.7909 133 44 131.209 44 129H42C42 132.314 44.6863 135 48 135V133ZM224 133H48V135H224V133ZM228 129C228 131.209 226.209 133 224 133V135C227.314 135 230 132.314 230 129H228ZM228 25V129H230V25H228ZM224 21C226.209 21 228 22.7909 228 25H230C230 21.6863 227.314 19 224 19V21ZM48 21H224V19H48V21Z"
                            fill="#E96D6D"
                            mask="url(#path-1-inside-1_3391_8962)"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M48 20C45.2386 20 43 22.2386 43 25V35.4944L30 43L43 50.5056V129C43 131.761 45.2386 134 48 134H224C226.761 134 229 131.761 229 129V25C229 22.2386 226.761 20 224 20H48Z"
                            stroke="black"
                            stroke-width="2"
                          />
                        </g>
                        <defs>
                          <filter
                            id="filter0_d_3391_8962"
                            x="0"
                            y="0"
                            width="259"
                            height="174"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                          >
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feOffset dy="10" />
                            <feGaussianBlur stdDeviation="15" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 0.913725 0 0 0 0 0.427451 0 0 0 0 0.427451 0 0 0 0.2 0"
                            />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3391_8962" />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="effect1_dropShadow_3391_8962"
                              result="shape"
                            />
                          </filter>
                        </defs>
                      </svg>
                    </div>
                    <div style={{ marginLeft: '-73px' }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="260"
                        height="174"
                        viewBox="0 0 260 174"
                        fill="none"
                      >
                        <g filter="url(#filter0_d_3391_8965)">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M48 20C45.2386 20 43 22.2386 43 25V35.4944L30 43L43 50.5056V129C43 131.761 45.2386 134 48 134H225C227.761 134 230 131.761 230 129V25C230 22.2386 227.761 20 225 20H48Z"
                            fill="white"
                            stroke="black"
                            stroke-width="2"
                          />
                        </g>
                        <defs>
                          <filter
                            id="filter0_d_3391_8965"
                            x="0"
                            y="0"
                            width="260"
                            height="174"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                          >
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feOffset dy="10" />
                            <feGaussianBlur stdDeviation="15" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 0.916667 0 0 0 0 0.034375 0 0 0 0 0.034375 0 0 0 0.2 0"
                            />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3391_8965" />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="effect1_dropShadow_3391_8965"
                              result="shape"
                            />
                          </filter>
                        </defs>
                      </svg>
                    </div>
                  </div>
                  <div style={{ marginLeft: '828px', marginTop: '-145px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2" height="102" viewBox="0 0 2 102" fill="none">
                      <path d="M1 101L0.999996 1" stroke="#DFDFDF" stroke-linecap="round" />
                    </svg>
                  </div>
                  <Typography
                    size="bodyText"
                    style={{ color: 'var(--Main-Black, #141414)', marginLeft: '883px', marginTop: '-91px' }}
                  >
                    내 등수
                    <br />
                    상위 몇프로
                  </Typography>
                </RangeBox>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginLeft: '551px',
                  marginTop: '30px',
                  gap: '30px',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <Graph_1_1Box>
                    <Typography
                      size="bodyText"
                      style={{
                        color: 'var(--Main-Black, #141414)',
                        marginLeft: '36px',
                        marginTop: '26px',
                        marginBottom: '14px',
                      }}
                    >
                      지원자 정보 살펴보기
                    </Typography>
                    <svg xmlns="http://www.w3.org/2000/svg" width="674" height="2" viewBox="0 0 674 2" fill="none">
                      <path d="M0 1L674 1" stroke="#DFDFDF" />
                    </svg>
                    <PieChartComponent />
                  </Graph_1_1Box>
                  <Graph_2_1Box />
                </div>
                <Graph_2Box>
                  <Typography
                    size="bodyText"
                    style={{
                      color: 'var(--Main-Black, #141414)',
                      marginLeft: '36px',
                      marginTop: '26px',
                      marginBottom: '14px',
                    }}
                  >
                    이중전공 지원자 학과 분포
                  </Typography>
                  <svg xmlns="http://www.w3.org/2000/svg" width="535" height="2" viewBox="0 0 535 2" fill="none">
                    <path d="M0 1L535 1" stroke="#DFDFDF" />
                  </svg>
                </Graph_2Box>
              </div>
            </>
          ) : null}
          {isApplied ? null : (
            <BlurWrapper>
              <BlurMsg>
                <Typography size="largeText">쿠플라이에서 모의지원 후 열람 가능해요!</Typography>
                <Typography size="mediumText" style={{ lineHeight: '136.111%' }}>
                  모의지원을 완료한 후, 나와 함께 경영학과를 지원한 지원자의 실시간 지원통계를 열람해보세요.
                  <br />
                  모의지원하라는 홍보성 문구가 필요해요.
                </Typography>
              </BlurMsg>
            </BlurWrapper>
          )}
        </div>
      </Wrapper>
    </>
  );
}
// null 수정 필요

/* 
전체 페이지 크기 (헤더, 풋터 포함)
width: 1921px;
height: 2378px;   
*/

const Wrapper = styled.div`
  width: 100%; // 1920px;
  height: 2020px; // 100%; // (헤더, 풋터 제외 크기) 이 크기로 퍼센트 계산
  background: #fcfcfc;
  display: flex;
  flex-direction: column;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 1564px;
    height: 1564px;
    border-radius: 1564px;
    filter: blur(75px);
    opacity: 0.7;
    background: radial-gradient(
      60.96% 60.96% at 58.12% 41.5%,
      rgba(216, 88, 136, 0.5) 0%,
      rgba(255, 175, 189, 0.05) 100%
    );
    z-index: -1;
    top: -833px;
    left: -1px;
  }

  &::after {
    content: '';
    position: absolute;
    width: 1494px;
    height: 1494px;
    border-radius: 1494px;
    filter: blur(75px);
    opacity: 0.5;
    background: radial-gradient(47.7% 47.7% at 50% 52.3%, rgba(232, 88, 136, 0.25) 0%, rgba(255, 255, 255, 0) 100%);
    z-index: -1;
    top: 199px;
    right: -518px;
  }
`;

const LeftSideWrapper = styled.div`
  width: 522px;
  height: 100%;
  position: absolute;
  flex-shrink: 0;
  background: linear-gradient(89deg, rgba(238, 238, 238, 0.44) 10.94%, rgba(217, 217, 217, 0) 99.54%);
  left: 0;
  top: 0;
  //border: 1px solid gray; // 외곽선 추가 (나중에 삭제)
`;

// ----------------Box----------------
const MyInformationBox = styled.div<{ translateY: number }>`
  width: 521px;
  height: 1104px;
  position: absolute;
  border: 0px solid var(--White, #fff);
  background: rgba(255, 255, 255, 0.3);
  transform: ${(props) => `translateY(${props.translateY}px)`};
`;

const InterestMajorBox = styled.div`
  // 나중에 학과별로 에셋 만들기
  width: 282px;
  height: 114px;
  position: relative;
  border-radius: 5px;
  border: 1px solid #eee;
  backdrop-filter: blur(9px);
`;

const MajorSymbolShadow = styled.div`
  width: 112px;
  height: 112px;
  position: absolute;
  fill: radial-gradient(47.7% 47.7% at 50% 52.3%, rgba(146, 104, 83, 0.41) 0%, rgba(255, 255, 255, 0) 100%);
  margin-top: 16px;
  margin-left: 3px;
`;

const BigMajorSymbolBox = styled.div`
  width: 394px;
  height: 571px;
  border-radius: 10px;
  border: 1px solid var(--DF_Grey-2, #dfdfdf);
  background: radial-gradient(231.86% 143.11% at 1.23% 100%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 100%);
  backdrop-filter: blur(12px);
`;

const CompetitionRateBox = styled.div`
  width: 393px;
  height: 274px;
  border-radius: 10px;
  border: 1px solid var(--DF_Grey-2, #dfdfdf);
  background: radial-gradient(230.3% 140.56% at 1.23% 100%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 100%);
  backdrop-filter: blur(12px);
`;

const ThreeYearCumulativeDataBox = styled.div`
  width: 394px;
  height: 571px;
  border-radius: 10px;
  border: 1px solid var(--DF_Grey-2, #dfdfdf);
  background: radial-gradient(230.3% 140.56% at 1.23% 100%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 100%);
  backdrop-filter: blur(12px);
`;

const EachYearHeadBox = styled.div`
  width: 362px;
  height: 44px;
  border-radius: 5px;
  border: 1px solid #eee;
  box-shadow: 0px 2.91057px 145.52846px 0px rgba(20, 20, 20, 0.05);
`;

const EachYearBox = styled.div`
  width: 88px;
  height: 28px;
  border-radius: 3.638px;
  background: #d85888;
`;

const RangeBox = styled.div`
  width: 1241px;
  height: 252px;
  border-radius: 10px;
  border: 1px solid var(--DF_Grey-2, #dfdfdf);
  background: radial-gradient(230.3% 140.56% at 1.23% 100%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 100%);
  backdrop-filter: blur(12px);
`;

const Graph_1_1Box = styled.div`
  width: 676px;
  height: 520px;
  border-radius: 10px;
  border: 1px solid var(--DF_Grey-2, #dfdfdf);
  background: radial-gradient(230.3% 140.56% at 1.23% 100%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 100%);
  backdrop-filter: blur(12px);
`;

const Graph_2_1Box = styled.div`
  width: 676px;
  height: 288px;
  border-radius: 10px;
  border: 1px solid var(--DF_Grey-2, #dfdfdf);
  background: radial-gradient(230.3% 140.56% at 1.23% 100%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 100%);
  backdrop-filter: blur(12px);
`;

const Graph_2Box = styled.div`
  width: 535px;
  height: 828px;
  flex-shrink: 0;
  fill: radial-gradient(230.3% 140.56% at 1.23% 100%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 100%);
  stroke-width: 1px;
  stroke: var(--DF_Grey-2, #dfdfdf);
  border-radius: 10px;
  border: 1px solid var(--DF_Grey-2, #dfdfdf);
  background: radial-gradient(230.3% 140.56% at 1.23% 100%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 100%);
  backdrop-filter: blur(12px);
`;

// ----------------ImageBox----------------
const CharacterImageBox = styled.div`
  width: 111px;
  height: 111px;
  top: 0px;
  left: 0px;
  position: relative;
  overflow: hidden;
  background: rgba(255, 208, 208, 0.96);
  border-radius: 10px;
`;

const CharacterImage = styled.img`
  width: 179.618px;
  height: 179.618px;
  //background: lightgray;
  position: absolute;
  top: 2.02x;
  left: -34px;
`;

const MajorSymbol = styled.img`
  //width: 48.345px;
  //height: 63.473px;    이미지가 작아보여서 2배로 늘림
  width: 96.69px;
  height: 126.95px;
  position: absolute;
  //background: url(<path-to-image>), lightgray -23.265px -22.448px / 200.309% 193.598% no-repeat;
  margin-top: -12.4px; // 11.6
  margin-left: 15.29px; // 40.29
`;

const BigMajorSymbol = styled.img`
  width: 184px;
  height: 241px;
  //background: url(<path-to-image>), lightgray -88.544px -85.232px / 200.309% 193.598% no-repeat;
`;

// ----------------SVG----------------

const BlurWrapper = styled.div`
  display: flex;
  width: 1242px;
  height: 829px;
  border-radius: 10px;
  background: rgba(248, 248, 248, 0.45);
  backdrop-filter: blur(15px);
  box-shadow: 0px 0px 28px 0px rgba(20, 20, 20, 0.05);
  position: absolute;
  top: 1045px; // 1115px;
  left: 550px;
  z-index: 2;
`;

const BlurMsg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  text-align: center;
  margin: 0 auto;
  gap: 24px;
`;
// ---------------Blur Wrapper for non-applied user---------------
