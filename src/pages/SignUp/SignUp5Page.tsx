import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Typography from '../../assets/Typography';
import MultiStepProgressBar from '../../assets/MultiStepProgressBar';
import NextButton from '../../assets/buttons/NextButton';
import LoginButton from '../../assets/buttons/LoginButton';
import PrevButton from '../../assets/buttons/PrevButton';
import { check } from 'prettier';
import { ScrollBarSmall, ScrollBarLarge } from '../../assets/ScrollButton';
import axios from 'axios';
import { useTable } from 'react-table';
import { AnyCnameRecord } from 'dns';
import client from '../../utils/httpClient';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  max-width: 2560px;
  height: 1153px;
  background-color: #fcfafb;
`;

const TitleWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
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

const ContentsTitleWrapper = styled.div`
  margin-bottom: 50px;
`;

const TextTitleWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  text-align: center;
`;

const TextTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 11px;
`;

const TextOutBox = styled.div`
  width: 628px;
  height: 228px;
  flex-shrink: 0;
  border-radius: 10px;
  background: var(--White, #fff);
  border: 1px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;

  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 123.54%;
`;

const ButtonsTextWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: 22px;
  margin-bottom: 22px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 18px;
  margin-top: 20px;
  margin-bottom: 50px;
  margin-right: 18px;
`;

const FixedWidth = css`
  // 628px 너무 길어서 길이 조절했습니다
  width: 475px;
`;

const NextButtonFixedWidth = styled(NextButton)`
  ${FixedWidth}
`;

const ArrowImage = styled.img`
  //display: flex;
  width: 28px;
  height: 28px;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
`;

/* Asset에 있는 CheckButton 수정하기 애매해서 여기에 살짝 수정했습니다 */
const CheckButtonWrapper = styled.button<{ isChecked: boolean }>`
  width: 28px;
  height: 28px;
  transition: 0.25s ease-in-out;
  justify-content: center;
  align-items: center;

  & > svg {
    width: 28px;
    height: 28px;
    transition: 0.25s ease-in-out;
    stroke: #a8a8a8;
    fill: #ffffff;
  }

  ${(props) =>
    props.isChecked &&
    css`
      & > svg > path {
        stroke: #ffffff;
        fill: rgba(216, 88, 136, 0.75);
        border: none;
      }
    `}
`;

const StyledTable = styled.table`
  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 123.54%;
  border-collapse: collapse;
  border: 1px solid black;
  border-radius: 10px;

  th {
    text-align: center;
    background-color: #dfdfdf;
    border: 1px solid black;
    padding: 2px 2px;
  }

  td {
    text-align: left;
    border: 1px solid black;
  }
`;

interface CustomCheckButtonProps {
  isChecked: boolean;
  onChange: (isChecked: boolean) => void; //  이 부분 수정했습니다
}

const CustomCheckButton: React.FC<CustomCheckButtonProps> = ({ isChecked, onChange }) => {
  return (
    <CheckButtonWrapper
      isChecked={isChecked}
      onClick={() => onChange(!isChecked)} //  이 부분 수정했습니다
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path
          d="M14.0002 25.6666C20.4435 25.6666 25.6668 20.4432 25.6668 13.9999C25.6668 7.5566 20.4435 2.33325 14.0002 2.33325C7.55684 2.33325 2.3335 7.5566 2.3335 13.9999C2.3335 20.4432 7.55684 25.6666 14.0002 25.6666Z"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M17.8891 11.0833L12.5419 16.4305L10.1113 13.9999"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </CheckButtonWrapper>
  );
};

const join = async (role: string) => {
  const url = 'https://api.kupply.devkor.club/auth/join'; // 만든 API 주소로 바뀌어야 함.
  const commonData = {
    name: sessionStorage.getItem('name'),
    studentId: Number(sessionStorage.getItem('studentId')),
    nickname: sessionStorage.getItem('nickname'),
    email: sessionStorage.getItem('email'),
    password: sessionStorage.getItem('password'),
    firstMajor: sessionStorage.getItem('firstMajor'),
    role: sessionStorage.getItem('role'),
  };
  if (role === 'passer') {
    // await axios.post(url, {
    //   ...commonData,
    //   passSemester: sessionStorage.getItem('passSemester'),
    //   passGPA: parseFloat(sessionStorage.getItem('passedGPA') || ''),
    //   secondMajor: sessionStorage.getItem('secondMajor'),
    // });
    await client.post('/auth/join', {
      ...commonData,
      passSemester: sessionStorage.getItem('passSemester'),
      passGPA: parseFloat(sessionStorage.getItem('passedGPA') || ''),
      secondMajor: sessionStorage.getItem('secondMajor'),
    });
  } else {
    // await axios.post(url, {
    //   ...commonData,
    //   curGPA: sessionStorage.getItem('GPA'),
    //   hopeMajor1: sessionStorage.getItem('hopeMajor1'),
    //   hopeMajor2: sessionStorage.getItem('hopeMajor2'),
    //   hopeSemester: sessionStorage.getItem('hopeSemester'),
    // });
    await client.post('/auth/join', {
      ...commonData,
      curGPA: sessionStorage.getItem('GPA'),
      hopeMajor1: sessionStorage.getItem('hopeMajor1'),
      hopeMajor2: sessionStorage.getItem('hopeMajor2'),
      hopeSemester: sessionStorage.getItem('hopeSemester'),
    });
  }
};

/* 개인정보처리방침에 삽입되는 표
const columnData = [
  { accessor: 'objective', Header: '수집 이용목적' },
  { accessor: 'contents', Header: '수집 내용' },
  { accessor: 'method', Header: '수집 방법' },
  { accessor: 'period', Header: '보유 및 이용기간' },
];

const columns = useMemo(() => columnData, []);
const data = useMemo(
  () => [
    {
      objective: '회원관리',
      contents:
        '- (필수항목): 고려대학교 이메일, 이름, 고려대학교 학번, 본전공(1전공), 아이디, 비밀번호, 닉네임, 희망 이중전공 1, 2지망 <br/> - (선택항목): 전화번호, 학점, 희망 이중 지원학기',
      method: '회원가입',
      period: '회원 탈퇴 시까지',
    },
  ],
  [],
);

const [info, setInfo] = useState();
const getTable = () => {
  data.getTable().then(item => setInfo(item));
};
const data = useMemo(() => info, [info])


const Table = ({ columns, data }: any) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <TableSheet {...getTableProps()}>
      <TableHead>
        {headerGroups.map((header) => (
          // header 배열 호출
          <Header {...headerGroups.getHeaderGroupProps()}>
            {header.headers.map((col) => (
              // getHeaderProps 가 각 셀 순서에 맞게 header 호출
              <Th {...col.getHeaderProps()}>{col.render('Header')}</Th>
            ))}
          </Header>
        ))}
      </TableHead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            // 각 row data 호출
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                // 각 cell data 호출
                <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </TableSheet>
  );
};
*/

const ContentsText = styled.div`
  // mediumText
  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 122.836%;
  text-align: left;
`;

const TitleText = styled.div`
  // bodyText
  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 122.836%; /* 22.11px */
  text-align: left;
`;
// ------------------------------------------------------------------------------------------------

// 페이지
function SignUp5Page() {
  /*각 체크박스의 상태를 state로 관리*/
  const [allChecked, setAllChecked] = useState(false);
  const [allCheckedUI, setAllCheckedUI] = useState(false);
  const [individualChecks, setIndividualChecks] = useState({
    first: false,
    second: false,
  });

  const [isButtonActive, setIsButtonActive] = useState(false);

  /* 모든 약관에 동의했는지 확인 */
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
    setAllCheckedUI(isChecked);
  };

  useEffect(() => {
    const isAllChecked = allStateAgreed();
    setIsButtonActive(individualChecks.first && individualChecks.second);
    setAllCheckedUI(isAllChecked);
  }, [individualChecks]);

  /* Prev/Next 버튼 동작에 따른 페이지(회원가입 단계) 이동 */
  const navigate = useNavigate();

  /* Progress Bar 동작을 위한 리액트훅 및 함수 모음 (props로 전달) */
  const [currentStep, setCurrentStep] = useState<number>(5); // 회원가입 5 단계 페이지
  const [complete, setComplete] = useState<boolean>(true);

  const receivedData = useLocation().state;

  //넘겨받은 데이터가 없는 경우 올바른 경로가 아니므로 main으로 돌려보낸다.
  useEffect(() => {
    if (!sessionStorage.getItem('GPA') && !sessionStorage.getItem('passedGPA')) navigate('/');
  }, []);

  /* 각 페이지마다 버튼 이벤트가 상이하기 때문에 개별 정의 */
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

  const handlePrev = () => {
    navigate('/signUp4');
  };

  const [scrollActive, setActive] = useState(false);

  const button = useRef<HTMLDivElement>(null);

  const onClickCheck = () => {
    const body = document.getElementsByTagName('body')[0];
    if (body) {
      button.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <Wrapper>
      <TitleWrapper>
        <Typography size="title1" style={{ lineHeight: '131.579%' }}>
          거의 다왔습니다!
        </Typography>
        <Typography size="mediumText" style={{ opacity: '0.8', marginTop: '5px' }}>
          쿠플라이의 몇 가지 약관을 확인하면 서비스를 이용하실 수 있어요.
        </Typography>
      </TitleWrapper>

      <div style={{ width: '976.8px', height: '30px' }}>
        <MultiStepProgressBar numberOfSteps={5} currentStep={currentStep} complete={complete} />
      </div>
      <FormWrapper>
        <ContentsTitleWrapper>
          <StepIndicator>Step 5</StepIndicator>
          <Typography size="largeText">약관 읽고 서비스 이용하기</Typography>
          <svg xmlns="http://www.w3.org/2000/svg" width="630" height="2" viewBox="0 0 630 2" fill="none">
            <path d="M1 1H629" stroke="#D85888" stroke-linecap="round" />
          </svg>
        </ContentsTitleWrapper>

        <TextTitleWrapper>
          <TextTitle>
            <CustomCheckButton
              isChecked={allCheckedUI}
              onChange={(isChecked) => {
                handleAllCheckedClick(isChecked);
                onClickCheck();
              }}
            />
            <Typography
              size="largeText"
              style={{
                fontWeight: '600',
                marginBottom: '-5px',
                justifyContent: 'center',
              }}
            >
              아래 약관에 모두 동의합니다.
            </Typography>
          </TextTitle>
        </TextTitleWrapper>

        <ScrollBarLarge isChecked={scrollActive}>
          <ButtonsTextWrapper>
            <CustomCheckButton
              isChecked={individualChecks.first}
              onChange={(newCheckedValue) =>
                setIndividualChecks((prev) => ({
                  ...prev,
                  first: newCheckedValue,
                }))
              }
            />
            <Typography
              size="mediumText"
              style={{
                fontWeight: '600',
                marginBottom: '-5px',
                justifyContent: 'center',
              }}
            >
              서비스 이용약관 동의 (필수)
              <ArrowImage src="design_image/carousel/carousel_right_button.png" alt="right arrow" />
            </Typography>
          </ButtonsTextWrapper>

          <TextOutBox style={{ lineHeight: '122.836%' }}>
            <ScrollBarSmall isChecked={scrollActive}>
              <Typography size="largeText" style={{ textAlign: 'left', marginBottom: '10px' }}>
                제 1장 총칙
              </Typography>
              <TitleText>제 1조 (목적)</TitleText>
              <ContentsText>
                1. 본 약관은 이용자가 고려대학교 이중전공 지원/합격정보 통계 서비스 쿠플라이 (이하 “쿠플라이”라
                합니다)에서 제공하는 인터넷 관련 서비스(이하 "서비스"라 합니다)를 이용함에 있어 쿠플라이 및 쿠플라이의
                서비스와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다. <br />
                2. 본 약관이 규정한 내용 이외의 ‘쿠플라이’와 ‘이용자’ 간의 권리, 의무 및 책임사항에 관하여서는
                전기통신사업법 기타 대한민국의 관련 법령과 상관습에 의합니다.
              </ContentsText>
              <br />
              <TitleText>제 2조 (정의)</TitleText>
              <ContentsText>
                본 약관에서 사용하는 용어의 정의는 다음과 같습니다. <br />
                1. 사이트: 회사가 정보 및 재화 또는 용역을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여
                정보 및 재화 또는 용역을 거래할 수 있도록 설정한 가상의 영업장 또는 회사가 운영하는 웹사이트
                <br />
                2. 이용자: 사이트에 접속하여 본 약관에 따라 서비스를 제공 받는 회원 및 비회원
                <br />
                3. 회원: 쿠플라이에 개인정보를 제공하여 회원가입을 한 자로서, 쿠플라이와 서비스 이용계약을 체결하고
                사이트 내 모든 서비스를 계속적으로 이용할 수 있는 자<br />
                4. 비회원: 회원에 가입하지 않고 서비스를 이용하는 자로서, 사이트 내 일부 서비스를 일시적으로 이용할 수
                있는 자<br />
                5. 아이디(ID): 회원의 고려대학교 학생 인증과 서비스 이용을 위하여 회원이 입력한 본인의 고려대학교 이메일
                주소
                <br />
                6. 비밀번호(Password): 이용자가 등록회원과 동일인인지 신원을 확인하고, 회원의 통신상 개인정보를 보호하기
                위하여 회원이 정한 문자, 숫자, 특수문자의 조합
                <br />
                7. 회원 탈퇴: 회원이 이용계약을 종료시키는 행위
                <br />
                8. 컨텐츠(Contents): 회사에서 제공하는 학과(부)별 합격자료, 실시및 지원자 통계 및 기타정보
              </ContentsText>
              <br />
              <TitleText>제 3조 (약관의 명시, 효력 및 개정)</TitleText>
              <ContentsText>
                1. 쿠플라이는 약관의 내용과 주소지, 관리자의 성명, 개인정보보호 담당자의 성명, 연락처(이메일 주소) 등을
                이용자가 알 수 있도록 쿠플라이 사이트의 초기 서비스 화면에 게시합니다.
                <br />
                2. 이 약관은 그 내용을 쿠플라이의 사이트에 게시하거나 에메일 등 기타의 방법으로 회원에게 공지함으로써
                효력이 발생합니다.
                <br />
                3. 서비스 이용 시 화면에서 제시되는 경고 메세지의 효력은 본 약관의 효력과 동일합니다.
                <br />
                4. 쿠플라이 약관의 규제에 관한 법률, 전자거래기본법, 전자서명법, 정보통신망 이용촉진 및 정보 보호 이용에
                관한 법률 기타 관련 법령을 위배하지 않는 범위 내에서, 사정 변경의 경우와 영업상 중요 사유가 있을 때 약
                변경할 수 있으며, 변경된 약관은 2항과 같은 방법으로 효력을 발생합니다.
                <br />
                5.이 약관에 동의하는 것은 정기적으로 사이트를 방문하여 약관의 변경사항을 확인하는 것에 동의함을
                의미합니다. 변경된 약관에 대한 정보를 알지 못해 발생하는 이용자의 피해는 쿠플라이에서 책임지지 않습니다.
                <br />
                6.회원은 변경된 약관에 동의하지 않을 경우 회원 탈퇴(해지)를 요청할 수 있으며, 변경된 약관의 효력
                발생일로부터 7일 이내의 거부의사를 표시하지 아니하고 서비스를 계속 사용할 경우 약관의 변경 사항에 동의한
                것으로 간주됩니다. 회원은 변경된 약관에 동의하지 않을 경우 회원 탈퇴(해지)를 요청할 수 있으며, 변경된
                약관의 효력 발생일로부터 7일 이내의 거부의사를 표시하지 아니하고 서비스를 계속 사용할 경우 약관의 변경
                사항에 동의한 것으로 간주됩니다.
              </ContentsText>
              <br />
              <TitleText>제 4조 (약관 외 준칙)</TitleText>
              <ContentsText>
                1. 이 약관은 쿠플라이가 제공하는 개별 서비스에 관한 이용안내(이하 “서비스별 안내”라 합니다)와 함께
                적용합니다.
                <br />
                2. 이 약관에 명시되지 않은 사항에 대해서는 전기 통신 기본법, 전기 통신 사업법, 기타 관련법령 및 서비스별
                안내의 규정에 의합니다.
              </ContentsText>
              <br />
              <br />
              <Typography size="largeText" style={{ textAlign: 'left', marginBottom: '10px' }}>
                제 2장 서비스 이용 계약
              </Typography>
              <TitleText>제 5조 (이용 계약의 성립)</TitleText>
              <ContentsText>
                1. 이용 계약은 서비스 이용 희망자의, 본 이용 약관에 대해 동의한다는 의사표시와 이용 신청에 대한
                쿠플라이의 승낙으로 성립됩니다. <br />
                2. 본 이용약관에 대한 동의는 회원 가입 또는 이용 신청 당시 사이트의 ‘동의함’ 버튼을 누름으로써 그
                의사표시를 합니다.
              </ContentsText>
              <br />
              <TitleText>제 6조 (회원가입 및 승낙)</TitleText>
              <ContentsText>
                1. 이용자가 회원에 가입하여 사이트의 서비스를 이용하고자 하는 경우, 이용자는 사이트에서 요청하는 개인
                신상정보를 제공해야 합니다.
                <br />
                2. 이용자의 서비스 이용 신청에 대하여 운영진이 승낙한 경우, 사이트는 회원 ID/Password와 기타 사이트가
                필요하다고 인정하는 내용을 이용자에게 통지합니다.
                <br />
                3. 쿠플라이는 다음 각 호에 해당하는 이용 신청에 대하여는 이를 승낙하지 아니합니다.
                <br />
                (1) 고려대학교 소속이 아닌 이용자가 신청하는 경우
                <br />
                *서울캠퍼스/세종캠퍼스 무관
                <br />
                **재학생, 휴학생, 수료생, 졸업생 모두 고려대학교 소속으로 인정
                <br />
                (2) 본인 실명이 아니거나 다른 사람의 명의를 사용하여 신청한 경우
                <br />
                (3) 서비스 이용 계약 신청서의 내용을 허위로 기재한 경우
                <br />
                (4) 사회의 안녕과 질서 혹은 미풍양속을 저해할 목적으로 신청한 경우
                <br />
                (5) 부정한 용도로 본 서비스를 이용하고자 하는 경우
                <br />
                (6) 영리를 추구할 목적으로 본 서비스를 이용하고자 하는 경우
                <br />
                (7) 본 서비스와 경쟁관계에 있는 이용자가 신청하는 경우
                <br />
                (8) 기타 이용 신청자의 귀책사유로 이용승낙이 곤란한 경우
                <br />
                4. 쿠플라이는 서비스 이용신청이 다음 각 호에 해당하는 경우에는 그 신청에 대하여 승낙 제한사유가 해소될
                때까지 승낙을 유보할 수 있습니다.
                <br />
                (1) 쿠플라이의 설비가 여유가 없는 경우
                <br />
                (2) 쿠플라이의 기술상 지장이 있는 경우
                <br />
                (3) 기타 쿠플라이의 귀책사유로 이용승낙이 곤란한 경우
              </ContentsText>
              <br />
              <TitleText>제 7조 (회원 정보의 변경 등)</TitleText>
              <ContentsText>
                1. 회원은 마이페이지를 통하여 언제든지 본인의 개인정보를 열람할 수 있고, 회사가 인정하는 경미한 내용을
                변경 또는 수정할 수 있습니다. 단, 본래 영구적인 학교 이메일 및 안정적인 서비스 운영을 위해 필요한 기타
                회사가 정한 사항은 변경 또는 수정할 수 없습니다.
                <br />
                2. 회원은 회원가입 신청 시 기재한 사항이 변경되었을 경우, 즉시 개인정보 관리화면을 통하여 이를
                수정하거나 이메일 등 기타 회사가 정한 방법으로 회사에게 그 변경사항을 알려야 합니다.
                <br />
                3. 2항의 변경사항을 회사에 알리지 아니함으로써, 회원이 입은 불이익에 대하여 회사는 회원 또는 제3자에
                대하여 손해배상 기타 일체의 책임을 부담하지 아니하고, 회사 또는 회사와 제휴한 온라인서비스 제공자가 입은
                불이익에 대하여 회원은 손해배상 기타 일체의 책임을 부담합니다.
              </ContentsText>
              <br />
              <TitleText>제 8조 (서비스 이용)</TitleText>
              <ContentsText>
                1. 회원은 회원 가입 시 발급된 계정 하나로 사이트 내 모든 서비스를 이용할 수 있습니다. 단, 일부 서비스의
                경우 해당 서비스 이용에 앞서 추가적인 개인 정보를 요청할 수 있습니다.
                <br />
                2. 비회원은 회사가 정한 일부 서비스에 한해 사이트를 이용할 수 있습니다.
                <br />
                3. 쿠플라이의 서비스 이용은 사이트의 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴, 1일 24시간을
                원칙으로 합니다. 단, 일부 서비스의 경우 고려대학교 학사일정에 따라 회사가 정한 일정 기간 동안에만
                운영됩니다.
                <br />
                4. 쿠플라이에서 제공하는 서비스는 기본적으로 무료입니다.
                <br />
                5. 쿠플라이는 제공하는 서비스 이용과 관련하여 이용자에게 발생한 어떠한 손해에 대해서도 책임을 지지
                않습니다.
              </ContentsText>
              <br />
              <br />
              <Typography size="largeText" style={{ textAlign: 'left', marginBottom: '10px' }}>
                제 3장 서비스 제공 및 변경
              </Typography>

              <TitleText>제 9조 (서비스 내용)</TitleText>
              <ContentsText>
                쿠플라이가 제공하는 서비스의 내용은 다음과 같습니다.
                <br />
                1. 고려대학교 이중전공 지원 관련 정보의 제공
                <br />
                2. 각 학과(부)별 이중전공 합격 관련 정보의 제공 (*현재는 베타버전으로서 경영학과, 경제학과, 통계학과,
                미디어학부, 심리학부, 수학과, 식품자원경제학과, 컴퓨터학과, 화학과에 한해 정보 제공)
                <br />
                3. 각 학과(부)별 지원 안정 정도 평가의 제공
                <br />
                4. 모의지원을 바탕으로 각 학과(부)별 실시간 지원자 통계의 제공
                <br />
                5. 기타 회사가 추가 개발하거나 다른 회사와의 제휴계약 등을 통해 회원에게 제공하는 일체의 서비스 제공
              </ContentsText>
              <br />
              <TitleText>제 10조 (정보의 제공 및 광고의 게재)</TitleText>
              <ContentsText>
                1. 쿠플라이는 회원에게 서비스 이용에 필요하다고 인정되는 각종 정보에 대해서 사이트 및 이메일, SMS 발송
                등 각종 매체에 게재하는 방법 등으로 회원에게 제공할 수 있습니다.
                <br />
                2. 쿠플라이는 서비스 개선 및 소개 등을 목적으로 회원의 동의 하에 추가적인 개인정보를 요청할 수 있습니다.
                <br />
                3. 쿠플라이는 서비스의 운영과 관련하여 사이트, 이메일, SMS 등에 광고 등을 게재할 수 있습니다.
              </ContentsText>
              <br />
              <TitleText>제 11조 (서비스 제공의 제한 및 중단)</TitleText>
              <ContentsText>
                1. 쿠플라이는 정기점검, 보수, 교체 등 쿠플라이가 필요한 경우 및 부득이한 사유로 인하여 서비스 이용에
                지장이 있는 경우에는 서비스 이용의 전부 또는 일부를 제한하거나 일시 중단할 수 있습니다.
                <br />
                2. 전시, 사변, 천재지변 또는 이에 준하는 국가 비상사태가 발생하거나 발생할 우려가 있는 경우 정전, 서비스
                이용 폭주 등으로 정상적인 서비스가 불가능한 경우 등 불가항력적인 사유가 있는 경우에는 서비스 이용의 전부
                또는 일부를 제한하거나 중지할 수 있습니다.
                <br />
                3. 제 1항에 의한 서비스 중단의 경우에는 사이트는 회원에게 제11조의 방법으로 통지를 합니다. 단, 사이트가
                통제할 수 없는 사유로 인한 서비스 중단으로 사전 통지가 불가능한 경우에는 그러하지 아니합니다.
                <br />
                4. 쿠플라이는 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 이용자 또는 제3자가 입은
                손해에 대하여 배상합니다. 단, 쿠플라이의 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다.
              </ContentsText>
              <br />
              <TitleText>제 12조 (회원에 대한 통지)</TitleText>
              <ContentsText>
                1. 쿠플라이는 회원에 대한 통지를 하는 경우에는 회원이 서비스 이용 신청 시 사이트 화면 또는 회원가입 시
                제출한 이메일 주소로 할 수 있습니다.
                <br />
                2. 1. 2. 쿠플라이는 불특정다수 회원에 대한 통지의 경우 7일 이상 사이트 사이트 화면에 게시함으로써
                개별통지에 갈음할 수 있습니다.
              </ContentsText>
              <br />
              <TitleText>제 13조 (회원탈퇴 및 자격상실)</TitleText>
              <ContentsText>
                1. 회원이 이용계약을 해지하고자 하는 때에는 회원 본인이 쿠플라이 웹페이지 내의 환경설정 메뉴를 통해
                가입해지를 신청할 수 있으며, 쿠플라이는 즉시 회원 탈퇴 처리를 합니다.
                <br />
                2. 회원 탈퇴가 이루어짐과 동시에 탈퇴회원의 서비스 이용 정보는 삭제되며, 이로 인해 발생하는 불이익에
                대한 책임은 회원 본인에게 있습니다.
                <br />
                3. 회원이 다음 각 호의 사유에 해당하는 경우, 쿠플라이는 회원의 회원자격을 적절한 방법으로 제한 및 정지,
                상실시킬 수 있습니다.
                <br />
                (1) 가입 신청 시에 허위 내용을 등록한 경우
                <br />
                (2) 다른 사람의 서비스 이용을 방해하거나 그 정보를 도용하는 등 전자거래질서를 위협하는 경우
                <br />
                (3) 서비스를 이용하여 법령과 본 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우
                <br />
                (4) 쿠플라이가 회원 자격을 제한 및 정지 시킨 후, 동일한 행위가 2회 이상 반복되거나 10일 이내에 그 사유가
                시정되지 아니하는 경우
                <br />
                5. 쿠플라이가 회원자격을 상실시키는 경우에는 회원등록을 말소합니다. 이 경우 회원에게 이를 통지하고,
                회원등록 말소 전에 소명할 기회를 부여합니다.
              </ContentsText>
              <br />
              <br />
              <Typography size="largeText" style={{ textAlign: 'left', marginBottom: '10px' }}>
                제 4장 서비스 관련 권한, 의무 관계
              </Typography>
              <TitleText>제 14조 (회사의 의무)</TitleText>
              <ContentsText>
                1. 쿠플라이는 회원이 희망한 서비스 제공 개시일에 특별한 사정이 없는 한 서비스를 이용할 수 있도록 하여야
                합니다.
                <br />
                2. 쿠플라이는 계속적이고 안정적인 서비스의 제공을 위하여 설비에 장애가 생기거나 명실된 때에는 부득이한
                사유가 없는 한 지체없이 이를 수리 또는 복구합니다.
                <br />
                3. 쿠플라이는 개인정보 보호를 위해 보안시스템을 구축하며 개인정보 보호정책을 공시하고 준수합니다.
                <br />
                4. 쿠플라이는 회원으로부터 제기되는 의견이나 불만이 정당하다고 객관적으로 인정될 경우에는 적절한 절차를
                거쳐 즉시 처리하여야 합니다. 다만, 즉시 처리가 곤란한 경우는 이용자에게 그 사유와 처리 일정을 통보하여야
                합니다.
              </ContentsText>
              <br />
              <TitleText>제 15조 (회원의 의무)</TitleText>
              <ContentsText>
                1. 회원은 다음 각 호의 행위를 하여서는 안됩니다.
                <br />
                (1) 회원가입 신청 또는 변경 시 허위내용을 등록하는 행위
                <br />
                (2) 쿠플라이에 게시된 정보를 변경하는 행위
                <br />
                (3) 쿠플라이 기타 제3자의 인격권 또는 지적재산권을 침해하거나 업무를 방해하는 행위
                <br />
                (4) 다른 회원의 계정을 도용하는 행위
                <br />
                (5) 관련 법령에 의하여 그 전송 또는 게시가 금지되는 정보(컴퓨터 프로그램 등)을 전송 또는 게시하는 행위
                <br />
                (6) 쿠플라이 운영진을 가장, 사칭하거나 또는 타인의 명의를 도용하여 글을 게시하거나 메일을 발송하는 행위
                <br />
                (7) 컴퓨터 소프트웨어, 하드웨어, 전기통신 장비의 정상적인 가동을 방해, 파괴할 목적으로 고안된 소프트웨어
                바이러스, 기타 다른 컴퓨터 코드, 파일, 프로그램을 포함하고 있는 자료를 게시하거나 전자우편으로 발송하는
                행위
                <br />
                (8) 스토킹(stalking) 등 다른 회원을 괴롭히는 행위
                <br />
                (9) 다른 회원에 대한 개인정보를 그 동의 없이 수집, 저장, 공개하는 행위
                <br />
                (10) 쿠플라이가 제공하는 서비스에서 정한 약관 기타 서비스 이용에 관한 규정을 위반하는 행위
                <br />
                (11) 외설 또는 폭력적인 메세지, 화상, 음성 기타 공서양속에 반하는 정보를 공개 또는 게시하는 행위
                <br />
                (12) 사실관계를 왜곡하는 정보 제공 등 기타 쿠플라이가 부적절하다고 판단하는 행위
                <br />
                2. 회원이 개인의 정보를 허위 또는 잘못 기재하여 생기는 불이익에 대한 책임은 회원 본인에게 있으며, 이에
                쿠플라이는 면책합니다.
                <br />
                3. 쿠플라이가 사이트 운영상 부적절하다고 판단한 정보가 게시된 경우, 쿠플라이는 게시를 행한 자의 승낙없이
                게재된 해당 정보를 삭제할 수 있습니다. 단, 쿠플라이는 이러한 정보의 삭제 등을 할 의무를 지지 않습니다.
                <br />
                4. 제 1항에 해당하는 행위를 한 회원이 있을 경우 쿠플라이는 본 약관 제12조에서 정한 바에 따라 회원의
                회원자격을 적절한 방법으로 제한 및 정지, 상실시킬 수 있습니다.
                <br />
                5. 회원은 그 귀책사유로 인하여 쿠플라이나 다른 회원이 입은 손해를 배상할 책임이 있습니다.
              </ContentsText>
              <br />
              <TitleText>제 16조 (저작권의 귀속 및 권리 의무)</TitleText>
              <ContentsText>
                1. 서비스에 대한 저작권 및 지적재산권은 회사에 있습니다.
                <br />
                2. 회원이 서비스상에 게시한 게시물(이하 “게시물’”)의 저작권은 해당 게시물의 저작자에게 있습니다.
                <br />
                3. 2. 3. 게시물은 반드시 본인에게 저작권이 있는 자료만 등록하여야 합니다. 만일 저작권 관련 분쟁 시 모든
                책임은 판매자 본인에게 있으며, 저작권법 등 관련법령 및 회사가 정한 절차에 따라 필요한 조치를 취합니다.
                <br />
                4. 회원은 “쿠플라이”의 서비스를 이용함으로써 얻은 정보를 “쿠플라이”의 사전승낙 없이 복제, 전송, 출판,
                배포, 방송 기타 방법에 의하여 영리 목적으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다.
                <br />
                5. 쿠플라이는 회원이 쿠플라이에 게시한 게시물을 사용, 복제, 수정, 출판, 배포할 수 있습니다.
                <br />
                6. 회원이 서비스상에 게시한 게시물은 검색결과 내지 서비스 프로모션 등에 노출될 수 있으며, 해당 노출을
                위하여 필요한 경우, 회사는 게시물을 일부 수정하거나 편집 기타 방법으로 이를 게시할 수 있습니다. 이 경우,
                회원은 회사에 대하여 해당 게시물의 삭제, 검색결과 제외, 비공개 기타 필요한 조치를 요청할 수 있습니다.
              </ContentsText>
              <br />
              <TitleText>제 17조 (게시물 관리)</TitleText>
              <ContentsText>
                1. 쿠플라이는 회원에 대한 별도의 조치 없이 회원이 서비스상에 게시한 게시물을 편집하거나 이동할 수 있는
                권리를 보유합니다.
                <br />
                2. 회원의 게시물이 저작권법, 정보보호법 기타 관련법령에 위반되는 내용을 포함하는 경우, 권리자는
                관련법령이 정한 절차에 따라 해당 게시물의 게시중단, 삭제 기타 필요한 조치를 요청할 수 있고, 회사는
                관련법령 및 회사가 정한 절차에 따라 필요한 조치를 취합니다.
                <br />
                3. 2항에 따른 권리자의 요청이 없는 경우라도 다음 각호의 1에 해당하는 경우, 회사는 관련법령 및 이 약관에
                따라 별도의 사전 통지나 동의 없이 해당 게시물에 대한 게시중단, 삭제 기타 필요한 조치를 취할 수 있습니다.
                <br />
                (1) 해당 게시물이 저작권법 기타 관련법령을 위반하거나 위반할 우려가 있는 경우
                <br />
                (2) 해당 게시물이 제3자의 권리를 침해하거나 침해할 우려가 있는 경우
                <br />
                (3) 해당 게시물이 이 약관이나 회사의 정책에 위반되거나 위반될 우려가 있는 경우
                <br />
                (4) 기타 해당 게시물의 게시중단, 삭제 기타 조치를 취할 필요가 있다고 회사가 인정한 경우
                <br />
                4. 회원의 게시물이 제3자의 저작권 기타 재산권을 침해함으로써 발생하는 일체의 민ㆍ형사상 책임에 대하여,
                회사는 이를 일체 부담하지 아니합니다.
              </ContentsText>
              <br />
              <TitleText>제 18조 (광고주 및 연결 사이트와의 관계)</TitleText>
              <ContentsText>
                1. 쿠플라이의 공식 사이트 이외의 쿠플라이 웹페이지 및 이메일에서 링크된 사이트에서는 쿠플라이의
                ‘개인정보처리방침’이 적용되지 않습니다.
                <br />
                2. 쿠플라이는 쿠플라이 웹페이지 또는 이메일상에 게재되어 있거나 본 서비스를 통한 광고주의 판촉활동에
                회원이 참여하거나 교신 또는 거래를 함으로써 발생하는 손실과 손해에 대해 책임을 지지 않습니다.
              </ContentsText>
              <br />
              <br />
              <Typography size="largeText" style={{ textAlign: 'left', marginBottom: '10px' }}>
                제 5장 기타
              </Typography>
              <TitleText>제 19조 (양도의 금지)</TitleText>
              <ContentsText>
                회원은 서비스 이용권리를 타인에게 대여, 양도 또는 증여 등을 할 수 없으며, 또한 질권의 목적으로도 사용할
                수 없습니다.
              </ContentsText>
              <br />
              <TitleText>제 20조 (면책 및 배상)</TitleText>
              <ContentsText>
                1. 쿠플라이는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스
                제공에 관한 책임이 면제됩니다.
                <br />
                2. 쿠플라이는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 지지 않습니다.
                <br />
                3. 쿠플라이는 회원이 서비스를 이용하여 기대하는 수익을 상실한 것이나 서비스를 통하여 얻은 자료로 인한
                손해에 관하여 책임을 지지 않습니다.
                <br />
                4. 쿠플라이는 회원이 서비스에 게재한 정보, 자료, 사실의 신뢰도, 정확성 등 내용에 관하여는 책임을 지지
                않습니다.
                <br />
                5. 쿠플라이는 서비스 이용과 관련하여 가입자에게 발생한 손해 가운데 가입자의 고의, 과실에 의한 손해에
                대하여 책임을 지지 않습니다.
              </ContentsText>
              <br />
              <TitleText>제 21조 (재판권 및 준거법)</TitleText>
              <ContentsText>
                1. 쿠플라이와 이용자간에 발생한 분쟁에 관한 소송은 서울중앙지방법원을 관할법원으로 합니다.
                <br />
                2. 쿠플라이와 이용자간에 제기된 소송에는 대한민국법을 적용합니다.
              </ContentsText>
              <br />
              <TitleText>부칙</TitleText>
              <ContentsText>1. 본 약관은 2023년 10월 20일부터 시행합니다.</ContentsText>
            </ScrollBarSmall>
          </TextOutBox>

          <ButtonsTextWrapper>
            <CustomCheckButton
              isChecked={individualChecks.second}
              onChange={(newCheckedValue) =>
                setIndividualChecks((prev) => ({
                  ...prev,
                  second: newCheckedValue,
                }))
              }
            />
            <Typography
              size="mediumText"
              style={{
                fontWeight: '600',
                marginBottom: '-5px',
                justifyContent: 'center',
              }}
            >
              개인정보 수집 및 이용 동의 (필수)
              <ArrowImage src="design_image/carousel/carousel_right_button.png" alt="right arrow" />
            </Typography>
          </ButtonsTextWrapper>

          <TextOutBox>
            <ScrollBarSmall isChecked={scrollActive}>
              <ContentsText>
                쿠플라이는 이용자들의 정보를 매우 중요시하며, 이용자가 쿠플라이에서 제공하는 서비스(이하 “서비스”라
                함)를 이용함과 동시에 온라인 상에서 각 운영 서비스에 제공한 개인정보가 보호받을 수 있도록 최선을 다하고
                있습니다.
                <br />
                <br />
                쿠플라이는 ‘개인정보보호법’에 따라 정보주체의 개인정보를 보호하고 있으며 이와 관련한 고충을 신속하고
                원활하게 처리할 수 있도록 하기 위하여 ’개인정보보호법’ 제30조에 따라 다음과 같이 개인정보 처리방침을
                수립하고 공개합니다. 서비스 운영팀은 개인정보처리방침을 홈페이지의 첫 화면에 공개함으로써 이용자들이
                언제나 용이하게 확인할 수 있도록 조치하고 있습니다.
                <br />
                <br />
                쿠플라이의 개인정보처리방침은 관련 법령 및 지침 변경이나 서비스 운영팀 내부 방침 변경 등으로 인하여
                수시로 변경될 수 있으며, 개인정보처리방침의 지속적인 개선을 위하여 필요한 절차를 정하고 있습니다.
                개인정보처리방침을 개정하는 경우 서비스 운영팀은 그 변경 사항을 홈페이지에 게시하여 이용자들이 개정된
                사항을 쉽게 알아볼 수 있도록 하고 있습니다.
                <br />
                <br />
                쿠플라이의 개인정보처리방침은 다음과 같은 내용을 담고 있습니다.
                <br />
                <br />
              </ContentsText>
              <ContentsText style={{ fontWeight: '600' }}>
                1. 정보 수집에 대한 동의
                <br />
                2. 개인정보 수집•이용 목적, 수집하는 개인정보의 항목 및 수집방법
                <br />
                3. 개인정보의 제3자 제공
                <br />
                4. 개인정보의 보유 및 이용 기간, 개인정보의 파기절차 및 방법
                <br />
                5. 개인정보 보호책임자 및 개인정보에 관한 민원 서비스
                <br />
                6. 개인정보의 안전성 확보조치에 관한 사항
                <br />
                7. 고지의 의무
                <br />
                <br />
              </ContentsText>
              <TitleText>1. 정보 수집에 대한 동의</TitleText>
              <ContentsText>
                (1) 쿠플라이는 개인정보를 개인의 동의 없이 수집하지 않습니다. 쿠플라이는 회원가입 및 서비스 이용
                과정에서 개인정보 수집에 대한 '동의' 버튼을 클릭할 수 있는 절차를 마련하여 개인정보 수집에 대해 동의를
                구하고 있습니다. (2) 쿠플라이는 수집한 개인정보를 특정 개인을 알아볼 수 없도록 가명처리하고, 통계 작성,
                과학적 연구, 공익적 기록 보존 등을 위하여 가명정보를 처리할 수 있습니다. 쿠플라이는 가명정보가
                재식별되지 않도록 추가정보와 분리하여 별도 저장 관리하고 필요한 기술적 관리적 보호조치를 취합니다.
                (3)쿠플라이는 스크래핑 등의 기술을 이용하여 이용자의 데이터를 수집하는 행위를 불허합니다. 쿠플라이는
                입력하신 정보를 이용자들에게 사전에 밝힌 목적 이외에 다른 목적으로는 사용하지 않으며, 외부로 유출하지
                않습니다. 단, 쿠플라이에 링크되어 있는 웹사이트들이 개인정보를 수집하는 행위에 대해서는 본
                ‘개인정보처리방침’이 적용되지 않음을 알려드립니다.
                <br />
                <br />
                개인정보란 살아 있는 개인에 관한 정보로서 다음 어느 하나에 해당하는 정보를 말합니다.
                <br />
                - 성명, 주민등록번호 및 영상 등을 통하여 개인을 식별할 수 있는 정보
                <br />
                - 해당 정보만으로는 특정 개인을 식별할 수 없더라도 다른 정보와 쉽게 결합하여 알아볼 수 있는 정보, 이
                경우 쉽게 결합할 수 있는지 여부는 다른 정보의 입수 가능성 등 개인을 알아보는 데 소요되는 시간, 비용,
                기술 등을 합리적으로 고려하여야 합니다.
                <br />- 가명정보
              </ContentsText>
              <br />
              <br />
              <TitleText>2. 개인정보 수집, 이용 목적, 수집하는 개인정보의 항목 및 수집방법</TitleText>
              <br />

              <StyledTable>
                <thead>
                  <tr>
                    <th>수집이용 및 목적</th>
                    <th>수집항목</th>
                    <th>수집방법</th>
                    <th>보유 및 이용기간</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>회원관리</td>
                    <td>
                      - (필수항목): 고려대학교 이메일, 이름, 고려대학교 학번, 본전공(1전공), 아이디, 비밀번호, 닉네임,
                      희망 이중전공 1, 2지망, 희망 이중 지원학기
                    </td>
                    <td>회원가입</td>
                    <td>회원 탈퇴 시까지</td>
                  </tr>
                  <tr>
                    <td>모의지원</td>
                    <td>
                      - (필수항목): 학점, 1,2지망 지원 학과(부), 재지원 여부, 현재 학년 <br />- (선택항목): 지원 시
                      제출한 자기소개서 원문
                    </td>
                    <td>모의지원 서비스 이용</td>
                    <td>모의지원 서비스를 이용한 해당 학기 종강 후 1개월</td>
                  </tr>
                  <tr>
                    <td>
                      합격자료 업데이트
                      <br />
                      (회원정보와 학교 포탈시스템에 공시되는 당학기 이중전공 합격자 발표 자료 대조)
                    </td>
                    <td>- (필수항목): 이름, 고려대학교 학번, 1, 2지망 지원학과</td>
                    <td>회원가입 및 모의지원 서비스 이용</td>
                    <td>모의지원 서비스를 이용한 해당 학기 종강 후 1개월</td>
                  </tr>
                </tbody>
              </StyledTable>
              <br />
              <br />
              <TitleText>3. 개인정보의 제3자 제공</TitleText>
              <ContentsText>
                쿠플라이는 이용자의 사전 동의 없이 개인정보를 외부에 제공하지 않습니다. 단, 이용자가 외부 제휴사의
                서비스를 이용하기 위하여 개인정보 제공에 직접 동의를 한 경우, 그리고 관련 법령에 의거해 쿠플라이에
                개인정보 제출 의무가 발생한 경우, 이용자의 생명이나 안전에 급박한 위험이 확인되어 이를 해소하기 위한
                경우에 한하여 개인정보를 제공하고 있습니다.
              </ContentsText>
              <br />
              <TitleText>4. 개인정보의 보유 및 이용 기간, 개인정보의 파기절차 및 방법</TitleText>
              <ContentsText>
                (1) 이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체 없이 파기합니다. 회원
                탈퇴를 요청하거나 개인정보의 수집 및 이용에 대한 동의를 철회하는 경우, 수집 및 이용목적이 달성되거나
                보유 및 이용기간이 종료한 경우 해당 개인정보를 지체 없이 파기합니다. 단, 관련 법령에 의하여 보존할
                필요가 있는 경우 아래와 같이 관련 법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.
                <br />
                - 서비스 이용 관련 개인정보 (로그인 방문 기록)
                <br />
                - 보존 근거: 통신비밀보호법
                <br />
                - 보존 기간: 3개월 이상
                <br />
                (2) 쿠플라이는 개인정보의 수집 및 이용목적이 달성된 개인정보는 재생이 불가능한 방법으로 파기하고
                있습니다.
              </ContentsText>
              <br />
              <TitleText>5. 개인정보 보호책임자 및 개인정보에 관한 민원 서비스</TitleText>
              <ContentsText>
                쿠플라이는 이용자의 개인정보 관련 문의사항 및 불만 처리 등을 위하여 아래와 같이 개인정보 보호 책임자를
                지정하고 있습니다.
                <br />
                <br />
                [개인정보 보호책임자]
                <br />
                - 이름: 오윤진
                <br />
                - 이메일: dhdbsrlw@korea.ac.kr
                <br />
                쿠플라이는 고려대학교 재학생들이 운영하는 서비스로서, 즉각적인 문의 응답은 어렵습니다. 다만, 개인정보
                관련 민원 발생 시 아래 이메일로 문의주시면 최대한 빠르게 도와드리겠습니다.
                <br />- 이메일: kupply.devkor@gmail.com
                <br />
                <br />
                기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다.
                <br />
                - 개인정보 분쟁조정위원회 (www.kopico.go.kr/ 1833-6972) <br />
                - 개인정보침해신고센터 (privacy.kisa.or.kr / 국번없이 118) <br />
                - 대검찰청 사이버범죄수사과 (www.spo.go.kr / 국번없이 1301) <br />- 경찰청 사이버수사국
                (ecrm.police.go.kr / 국번없이 182)
              </ContentsText>
              <br />
              <TitleText>6.개인정보의 안전성 확보조치에 관한 사항</TitleText>
              <ContentsText>
                쿠플라이는 이용자의 개인정보를 안전하게 관리하기 위하여 최선을 다하고 있으며, 개인정보보호법에 따라
                개인정보를 안전하게 보호하고 있습니다. 또한 개인정보를 처리하는 인원을 최소한으로 제한하고 정기적인
                교육과 비밀번호 변경을 통해 개인정보가 유출되지 않도록 안전하게 관리하고 있습니다. 다만, 이용자 본인의
                부주의나 인터넷 상의 문제로 아이디, 비밀번호 등의 개인정보가 유출되어 발생한 문제에 대해 쿠플라이는
                책임을 지지 않습니다.
              </ContentsText>
              <br />
              <TitleText>7. 고지의 의무</TitleText>
              <ContentsText>
                개인정보처리방침의 내용의 추가, 삭제 및 수정이 있을 경우에는 시행하기 최소 7일 전에 홈페이지 등에
                공지하도록 하겠습니다.
                <br />
                - 개인정보처리방침 버전 번호: v1.0
                <br />
                - 공고일자: 2023년 10월 10일
                <br />- 시행일자:2023년 10월 20일
              </ContentsText>
            </ScrollBarSmall>
          </TextOutBox>

          <ButtonsWrapper>
            <PrevButton onClick={handlePrev} />
            <NextButtonFixedWidth active={isButtonActive} onClick={handleNext}>
              완료
            </NextButtonFixedWidth>
          </ButtonsWrapper>
          <div ref={button}></div>
        </ScrollBarLarge>
      </FormWrapper>
    </Wrapper>
  );
}

const Wrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  //background: #FCFAFB;
  background: linear-gradient(180deg, #fcfafb 69.56%, rgba(252, 250, 251, 0) 115.91%);
`;

function SignUp5Complete() {
  const [isButtonActive, setIsButtionActive] = useState(true);
  const navigate = useNavigate();
  const handleNext = () => {
    navigate('/login');
  };

  //넘겨받은 데이터가 없는 경우 올바른 경로가 아니므로 main으로 돌려보낸다.
  useEffect(() => {
    if (!sessionStorage.getItem('GPA') && !sessionStorage.getItem('passedGPA')) navigate('/');
  }, []);

  //회원가입 때 입력된 정보는 회원가입이 완료되면 지워져야 함.
  useEffect(() => {
    sessionStorage.clear();
  }, []);

  return (
    <Wrapper2>
      <div style={{ textAlign: 'center' }}>
        <Typography size="heading1" style={{ marginTop: '140px', lineHeight: '104.167%' }}>
          축하합니다!
        </Typography>
      </div>
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <Typography
          size="largeText"
          style={{ marginTop: '24px', opacity: '0.8', lineHeight: '125%', fontWeight: '500' }}
        >
          이제 쿠플라이의 회원이 되셨습니다.
          <br />
          로그인 후, 다양한 쿠플라이의 서비스를 이용해보세요!
        </Typography>
      </div>
      <img
        src="design_image/check_ani.webp"
        alt="completeImage"
        style={{
          width: '781px',
          height: '836px',
          background: 'url(design_image/check_ani.webp), lightgray 50% / cover no-repeat',
          transform: 'translateY(-84px)',
        }}
      />
      <div style={{ transform: 'translateY(-221px)' }}>
        <LoginButton active={isButtonActive} onClick={handleNext}>
          <Typography size="bodyText" color="var(--White, #FFF)">
            로그인하고 쿠플라이로 이동하기
          </Typography>
        </LoginButton>
      </div>
    </Wrapper2>
  );
}

export { SignUp5Page, SignUp5Complete };
