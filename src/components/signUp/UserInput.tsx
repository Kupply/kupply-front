import TextFieldBox from "../../assets/OldTextFieldBox";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../store/atom";
import DropDown from "../../assets/dropdown/DropDown";
import { majorAllList } from "../../common/MajorAll";
import { ReactNode, useEffect } from "react";
import { errorMessageState } from "../../store/atom";
import { majorTargetList } from "../../common/MajorTarget";
import { inputState } from "../../pages/signUp/SignUp4Page";

export type UserTypeOptions = 'name' | 'password' | 'password2' | 'nickname' | 'studentId' | 'firstMajor' | 'email' | 'hopeMajor1' | 'hopeMajor2' | 'doubleMajor';

interface UserInputProps {
  userInfoType: UserTypeOptions;
  toNext?: boolean;
  setStateValid?: (args: inputState) => void;
  children?: ReactNode;
}

const placeholderMapping: Record<UserTypeOptions, string> = {
  name: "홍길동",
  password: "대소문자, 특수문자를 최소 하나씩 조합하여 8글자 이상",
  password2: '비밀번호 확인',
  nickname: '닉네임',
  studentId: '학번 10자리',
  firstMajor: '전공선택',
  email: '쿠플라이 아이디',
  hopeMajor1: '1지망 이중전공 선택',
  hopeMajor2: '2지망 이중전공 선택',
  doubleMajor: '진입 이중전공 선택'
}

const helpMessageMapping: Record<UserTypeOptions, string> = {
  name: "이름 입력",
  studentId: "학번 10자리",
  firstMajor: '',
  email: '',
  password: '비밀번호는 <8자 이상 20자 이하/1개 이상의 영문자/1개 이상의 숫자/1개 이상의 특수문자>가 포함되어야 합니다.',
  password2: '비밀번호 확인',
  nickname: '닉네임',
  hopeMajor1: '',
  hopeMajor2: '',
  doubleMajor: ''
}

const errorMessageMapping: Record<UserTypeOptions, string> = {
  name: '',
  studentId: '학번이 10자리 숫자가 아닙니다.',
  firstMajor: '',
  password: '',
  password2: '비밀번호가 일치하지 않아요!',
  nickname: '',
  email: '',
  hopeMajor1: '',
  hopeMajor2: '',
  doubleMajor: ''
}

const optionList = majorTargetList;

export const UserInput:  React.FC<UserInputProps> = ({ userInfoType, toNext, children, setStateValid }) => {

  const [info, setInfo] = useRecoilState(userState(userInfoType));
  const errorMessage = useRecoilValue(errorMessageState);
  const firstMajor = useRecoilValue(userState('firstMajor')).info;
  const hopeMajor1 = useRecoilValue(userState('hopeMajor1')).info;
  const hopeMajor2 = useRecoilValue(userState('hopeMajor2')).info;

  errorMessageMapping.password = errorMessage.passwordErrorMessage;
  errorMessageMapping.nickname = errorMessage.nicknameErrorMessage;

  const updatedMajorTargetList = [...majorTargetList];
  updatedMajorTargetList.unshift({ value1: '희망 없음', value2: '희망 없음' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo((prev) => ({
      ...prev,
      info: e.target.value
    }))
  };

  if (toNext){
    sessionStorage.setItem(userInfoType, info.info);
  }

  if(info.info !== ''){
    setStateValid?.('complete');
  }else{
    setStateValid?.('incomplete');
  }
  
  return (
    <>
      {
      userInfoType === 'firstMajor' || 
      userInfoType === 'hopeMajor1' || 
      userInfoType === 'hopeMajor2' ||
      userInfoType === 'doubleMajor' ?
      <DropDown
        title={placeholderMapping[userInfoType]}
        optionList={
          userInfoType === 'firstMajor' ? majorAllList :
          userInfoType === 'doubleMajor' ? optionList:
          userInfoType === 'hopeMajor1' ?  optionList.filter(
            (el) => el.value1 !== hopeMajor2 &&
            el.value1 !== firstMajor
          ):
          updatedMajorTargetList.filter(
            (el) => el.value1 !== hopeMajor1 &&
            el.value1 !== firstMajor
          )
        }
        value={info.info}
        setValue={(v) => setInfo((prev) => ({...prev, info:v}))}
      /> :
      <TextFieldBox
        placeholder={placeholderMapping[userInfoType]}
        value={info.info}
        onChange={handleInputChange}
        state={info.infoState}
        setState={(s) => setInfo((prev) => ({...prev, infoState: s}))}
        setValue={(v) => setInfo((prev) => ({...prev, info: v}))}
        helpMessage={helpMessageMapping[userInfoType]}
        errorMessage={errorMessageMapping[userInfoType]}
      />
      }
      {children}
    </>
  )
}

