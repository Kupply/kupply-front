import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Typography from '../../assets/Typography';
import MultiStepProgressBar from '../../assets/MultiStepProgressBar';
import TextFieldBox, { StateOptions } from '../../assets/TextFieldBox';
import NextButton from '../../assets/buttons/NextButton';
import PrevButton from '../../assets/buttons/PrevButton';
import DropDown from '../../assets/dropdown/dropDown';

/*
[ 참고 사항 - TextFieldBox State Option ]
  default /  hover /  focused /  typing /  filled /  error /  loading /  password
  자세한 사항: TextFieldBox.tsx 
};
*/

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 1153px;
  background-color: #fcfafb;
`;

const TitleWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding-top: 45px;
  padding-bottom: 25px;
`;

const FormWrapper = styled.div`
  // display: flex;
  // flex-direction: column;
  width: 816px;
  height: 850px;
  padding: 42px 94px 78px 94px;
  padding-left: 94px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.7);
  box-sizing: border-box;
  margin-top: 25px;
`;

const StepIndicator = styled.div`
  display: inline-flex;
  padding: 8px 18px;
  justify-content: center;
  margin-bottom: 17px;
  align-items: center;
  border-radius: 999px;
  border: 1px solid #d85888;
  background: rgba(255, 255, 255, 0.3);
  color: #d85888;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

const ContentsTitleWrapper = styled.div`
  margin-bottom: 50px;
`;

const ContentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 34px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 18px;
  margin-top: 34px;
`;

export default function SignUp2Page() {
  /* Prev/Next 버튼 동작에 따른 페이지(회원가입 단계) 이동 */
  const navigate = useNavigate();

  /* Progress Bar 동작을 위한 리액트훅 및 함수 모음 (props로 전달) */
  const [currentStep, setCurrentStep] = useState<number>(2); // 회원가입 2 단계 페이지
  const [complete, setComplete] = useState<boolean>(false);

  /* 각 input들의 값을 state를 사용하여 관리 */
  const [name, setName] = useState<string>(sessionStorage.getItem('name') || '');
  const [nameState, setNameState] = useState<StateOptions>('default');
  const [stdID, setStdID] = useState<string>(sessionStorage.getItem('studentId') || '');
  const [stdIDState, setStdIDState] = useState<StateOptions>('default');
  const [phone, setPhone] = useState<string>(sessionStorage.getItem('phoneNumber') || '');
  const [phoneState, setPhoneState] = useState<StateOptions>('default');
  const [dropdownValue, setdropDownValue] = useState<string>('');

  /* 학번의 유효성 검사 */
  useEffect(() => {
    const passwordCheck = /^\d{10}$/;
    if (stdIDState === 'filled') {
      if (!passwordCheck.test(stdID)) setStdIDState('error');
      else setStdIDState('filled');
    }
  }, [stdID, stdIDState]);

  /* 전화번호 유효성 검사 + '-' 넣은 형식으로 바꾸기*/
  useEffect(() => {
    const phoneCheck = /^010\d{8}$/;
    const phoneFormatCheck = /^010-\d{4}-\d{4}$/;
    if (phoneState === 'filled') {
      if (!phoneCheck.test(phone) && !phoneFormatCheck.test(phone)) setPhoneState('error');
      else {
        const newphoneNumber = phone;
        const newPhone = newphoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');

        setPhone(newPhone);
      }
    }
  }, [phone, phoneState]);

  /* 모든 state가 빈 문자열이 아니면 선택이 완료된 것이므로 complete를 true로 전환한다. 반대도 마찬가지. */
  useEffect(() => {
    if (nameState === 'filled' && stdIDState === 'filled' && phoneState === 'filled' && !!dropdownValue && !complete) {
      setComplete(true);
    } else if (
      !(nameState === 'filled' && stdIDState === 'filled' && phoneState === 'filled' && !!dropdownValue) &&
      complete
    ) {
      setComplete(false);
    }
  }, [nameState, stdIDState, phoneState, dropdownValue, complete]);

  /*
  //넘겨받은 데이터가 없는 경우 올바른 경로가 아니므로 main으로 돌려보낸다.
  useEffect(() => {
    if (!sessionStorage.getItem('email')) navigate('/');
    else {
      sessionStorage.removeItem('firstMajor'); //dropdown value는 초기화
      /* 나머지 세 데이터가 이미 존재하는 경우 textfield를 filled로 렌더링 시 바꿔 준다. 
      if (name !== '') setNameState('filled');
      if (stdID !== '') setStdIDState('filled');
      if (phone !== '') setPhoneState('filled');
    }
  }, []);*/
  /* 각 페이지마다 버튼 이벤트가 상이하기 때문에 개별 정의 */
  const handleNext = () => {
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('studentId', stdID);
    sessionStorage.setItem('firstMajor', dropdownValue);
    sessionStorage.setItem('phoneNumber', phone);
    navigate('/signup3');
  };

  const handlePrev = () => {
    navigate('/signUp1');
  };

  return (
    <Wrapper>
      <TitleWrapper>
        <Typography size="title1" style={{ lineHeight: '131.579%' }}>
          환영합니다!
        </Typography>
        <Typography size="mediumText" style={{ opacity: '0.8', marginTop: '5px' }}>
          회원가입을 위한 몇가지 절차를 거친 후 다양한 서비스를 이용하세요.
        </Typography>
      </TitleWrapper>
      <MultiStepProgressBar numberOfSteps={5} currentStep={currentStep} complete={complete} />
      <FormWrapper>
        <ContentsTitleWrapper>
          <StepIndicator>Step 2</StepIndicator>
          <Typography size="largeText">사용자 기본 정보 입력하기</Typography>
          <svg xmlns="http://www.w3.org/2000/svg" width="630" height="2" viewBox="0 0 630 2" fill="none">
            <path d="M1 1H629" stroke="#D85888" stroke-linecap="round" />
          </svg>
        </ContentsTitleWrapper>
        <ContentsList>
          <ContentsWrapper>
            <div style={{ display: 'flex' }}>
              <Typography size="mediumText" bold="700" style={{ opacity: '0.8' }}>
                이름
              </Typography>
              <Typography size="mediumText">을 입력해주세요.</Typography>
            </div>
            <TextFieldBox
              placeholder="홍길동"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setName(e.target.value);
              }}
              state={nameState}
              setState={setNameState}
              setValue={setName}
              helpMessage="이름 입력"
            ></TextFieldBox>
          </ContentsWrapper>
          <ContentsWrapper>
            <div style={{ display: 'flex' }}>
              <Typography size="mediumText" bold="700" style={{ opacity: '0.8' }}>
                고려대학교 학번
              </Typography>
              <Typography size="mediumText">을 입력해주세요.</Typography>
            </div>
            <TextFieldBox
              placeholder="학번 10자리"
              value={stdID}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setStdID(e.target.value);
              }}
              state={stdIDState}
              setState={setStdIDState}
              setValue={setStdID}
              helpMessage="학번 10자리"
              errorMessage="학번이 10자리 숫자가 아닙니다."
            ></TextFieldBox>
          </ContentsWrapper>
          <ContentsWrapper>
            <div style={{ display: 'flex' }}>
              <Typography size="mediumText" bold="700" style={{ opacity: '0.8' }}>
                본전공(1전공)
              </Typography>
              <Typography size="mediumText">을 입력해주세요.</Typography>
            </div>
            <DropDown
              title="전공선택"
              optionList={[
                { value1: '경영학과', value2: '경영대학' },
                { value1: '국어국문학과', value2: '문과대학' },
                { value1: '철학과', value2: '문과대학' },
                { value1: '한국사학과', value2: '문과대학' },
                { value1: '사학과', value2: '문과대학' },
                { value1: '사회학과', value2: '문과대학' },
                { value1: '한문학과', value2: '문과대학' },
                { value1: '영어영문학과', value2: '문과대학' },
                { value1: '독어독문학과', value2: '문과대학' },
                { value1: '불어불문학과', value2: '문과대학' },
                { value1: '중어중문학과', value2: '문과대학' },
                { value1: '노어노문학과', value2: '문과대학' },
                { value1: '일어일문학과', value2: '문과대학' },
                { value1: '서어서문학과', value2: '문과대학' },
                { value1: '언어학과', value2: '문과대학' },
                { value1: '생명과학부', value2: '생명과학대학' },
                { value1: '생명공학부', value2: '생명과학대학' },
                { value1: '식품공학과', value2: '생명과학대학' },
                { value1: '환경생태공학부', value2: '생명과학대학' },
                { value1: '식품자원경제학과', value2: '생명과학대학' },
                { value1: '정치외교학과', value2: '정경대학' },
                { value1: '경제학과', value2: '정경대학' },
                { value1: '통계학과', value2: '정경대학' },
                { value1: '행정학과', value2: '정경대학' },
                { value1: '수학과', value2: '이과대학' },
                { value1: '물리학과', value2: '이과대학' },
                { value1: '화학과', value2: '이과대학' },
                { value1: '지구환경과학과', value2: '이과대학' },
                { value1: '화공생명공학과', value2: '공과대학' },
                { value1: '신소재공학부', value2: '공과대학' },
                { value1: '건축사회환경공학부', value2: '공과대학' },
                { value1: '건축학과', value2: '공과대학' },
                { value1: '기계공학부', value2: '공과대학' },
                { value1: '산업경영공학부', value2: '공과대학' },
                { value1: '전기전자공학부', value2: '공과대학' },
                { value1: '반도체공학과', value2: '공과대학' },
                { value1: '융합에너지공학과', value2: '공과대학' },
                { value1: '차세대통신학과', value2: '공과대학' },
                { value1: '의과대학', value2: '의과대학' },
                { value1: '교육학과', value2: '사범대학' },
                { value1: '국어교육과', value2: '사범대학' },
                { value1: '영어교육과', value2: '사범대학' },
                { value1: '지리교육과', value2: '사범대학' },
                { value1: '역사교육과', value2: '사범대학' },
                { value1: '가정교육과', value2: '사범대학' },
                { value1: '수학교육과', value2: '사범대학' },
                { value1: '체육교육과', value2: '사범대학' },
                { value1: '간호학과', value2: '간호대학' },
                { value1: '컴퓨터학과', value2: '정보대학' },
                { value1: '데이터과학과', value2: '정보대학' },
                { value1: '디자인조형학부', value2: '디자인조형학부' },
                { value1: '국제학부', value2: '국제대학' },
                { value1: '글로벌한국융합학부', value2: '국제대학' },
                { value1: '미디어학부', value2: '미디어학부' },
                { value1: '바이오의공학부', value2: '보건과학대학' },
                { value1: '바이오시스템의과학부', value2: '보건과학대학' },
                { value1: '보건환경융합과학부', value2: '보건과학대학' },
                { value1: '보건정책관리학부', value2: '보건과학대학' },
                { value1: '자유전공학부', value2: '자유전공학부' },
                { value1: '스마트보안학부', value2: '스마트보안학부' },
                { value1: '사이버국방학과', value2: '스마트보안학부' },
                { value1: '심리학부', value2: '심리학부' },
                { value1: '스마트모빌리티학부', value2: '스마트모빌리티학부' },
              ]}
              value={dropdownValue}
              setValue={setdropDownValue}
            ></DropDown>
          </ContentsWrapper>
          <ContentsWrapper>
            <div style={{ display: 'flex' }}>
              <Typography size="mediumText" bold="700" style={{ opacity: '0.8' }}>
                전화번호
              </Typography>
              <Typography size="mediumText">를 입력해주세요.</Typography>
            </div>
            <TextFieldBox
              placeholder="마케팅 및 새로운 소식 수신을 위한 휴대폰 11자리"
              value={phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPhone(e.target.value);
              }}
              state={phoneState}
              setState={setPhoneState}
              setValue={setPhone}
              helpMessage="휴대폰 번호 입력"
              errorMessage="휴대폰 번호는 010으로 시작하는 11자리 번호여야 합니다."
            ></TextFieldBox>
          </ContentsWrapper>
        </ContentsList>
        <ButtonsWrapper>
          <PrevButton onClick={handlePrev} />
          <NextButton active={complete} onClick={handleNext} />
        </ButtonsWrapper>
      </FormWrapper>
    </Wrapper>
  );
}
