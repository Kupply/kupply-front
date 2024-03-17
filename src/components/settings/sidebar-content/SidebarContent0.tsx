import styled from "styled-components";
import TextFieldBox from "../../../assets/OldTextFieldBox";
import { UserInput } from "../../signUp/UserInput";
import { NewUserInput } from "../UserInputSettings";
//import SubmitButton from "../../../assets/buttons/OldSubmitButton";
import Button03 from "../../../assets/buttons/Button03";
import { useRecoilState } from "recoil";
import { isAppliedState } from "../../../store/atom";
import client from "../../../utils/HttpClient";
import { useSubmit0 } from "../../../utils/SettingSubmitFunctions";
import { useStudentIdVerification } from "../../../utils/UserInputVerification";
import { useState, useEffect } from "react";
import { StateOptions } from "../../../assets/OldTextFieldBox";
import { useCookies } from "react-cookie";
import DropDown from "../../../assets/dropdown/DropDown";
import { majorAllList } from "../../../common/MajorAll";

export function SidebarContent0(){
  const [isApplied, setIsApplied] = useRecoilState(isAppliedState);
  const [name, setName] = useState<string>(localStorage.getItem('name') || '');
  const [nameState, setNameState] = useState<StateOptions>('filled');
  const [stdID, setStdID] = useState<string>(localStorage.getItem('studentId') || '');
  const [stdIDState, setStdIDState] = useState<StateOptions>('filled');
  const [firstMajor, setFirstMajor] = useState<string>(localStorage.getItem('firstMajor') || '');
  const majorAll = majorAllList;
  
  useEffect(() => {
    const passwordCheck = /^\d{10}$/;
    if (stdIDState === 'filled') {
      if (!passwordCheck.test(stdID)) setStdIDState('error');
      else setStdIDState('filled');
    }
  }, [stdID, stdIDState]);
  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };

  const firstSubmit = async () => {
    const updateData = {
      newName: name,
      newStudentId: stdID,
      newFirstMajor: firstMajor,
    };
    console.log(updateData); // 요거는 맞음 
    try {
      // await axios.post('http://localhost:8080/user/updateMe', updateData, config);
      await client.post('/user/updateMe', updateData, config);
      window.location.reload(); // 페이지 새로고침. 그러고서 새로고침을 하고 다시 reload가 될때 반영이 안됨 
    } catch (err) {
      console.log(err);
    }
  };

  console.log(name, stdID, firstMajor);
  return (
    <BodyContainer>
          <BodyTitle>나의 기본정보 수정하기</BodyTitle>
          <BodyContent>나의 기본 사항과 맞지 않는 정보를 수정하세요.</BodyContent>

          <TextFieldTitle>
            <strong>이름</strong> 수정하기
          </TextFieldTitle>
          <TextFieldBox
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
            }}
            state={nameState}
            setState={setNameState}
            setValue={setName}
          />
          
          
          <TextFieldTitle>
            <strong>고려대학교 학번</strong> 수정하기
          </TextFieldTitle>
          <TextFieldBox
            value={stdID}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setStdID(e.target.value);
            }}
            state={stdIDState}
            setState={setStdIDState}
            setValue={setStdID}
          />
          

          <TextFieldTitle>
            <strong>본전공(1전공)</strong> 수정하기
          </TextFieldTitle>
          
          <DropDown
          title="전공선택" // 수정필요
          optionList={majorAll}
          value={firstMajor}
          setValue={setFirstMajor}
          />
          
          <Button03
            style={{ marginTop: '60px', width: '100%'}}
            state={!isApplied ? 'pressed' : 'disabled'}
            onClick={() => {
              firstSubmit();
              console.log('submitted');
            }}
          >
            저장하기
          </Button03>
        </BodyContainer>
  )
}

const BodyContainer = styled.div`
  //padding-left: 262px;
  padding-left: 13.645vw;
  padding-top: 3.646vw; //70px;
  //width: 628px;
  width: 32.7083vw;
`;

const BodyTitle = styled.div`
  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  font-size: 1.25vw;
  font-style: normal;
  font-weight: 700;
  line-height: 1.25vw; /* 100% */
`;

const BodyContent = styled.div`
  color: var(--Main-Black, #141414);
  text-shadow: 0px 4px 16px rgba(255, 255, 255, 0.33);
  font-family: Pretendard;
  font-size: 0.9375vw;
  font-style: normal;
  font-weight: 400;
  line-height: 111.111%; //22px; /* 111.111% */
  opacity: 0.6;
  margin-top: 0.625vw; //12px;
`;

const TextFieldTitle = styled.div`
  margin-top: 3.021vw; //58px;
  margin-bottom: 0.4688vw; //9px;
  opacity: 0.8;
  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  font-size: 0.9375vw;
  font-style: normal;
  font-weight: 400;
  line-height: 0.9375vw;
`;