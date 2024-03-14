import TextFieldBox from "../../assets/OldTextFieldBox";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userSettingsState, userState } from "../../store/atom";
import DropDown from "../../assets/dropdown/DropDown";
import { majorAllList } from "../../common/MajorAll";
import { ReactNode, useEffect } from "react";
import { errorMessageState } from "../../store/atom";
import { majorTargetList } from "../../common/MajorTarget";
import { inputState } from "../../pages/signUp/SignUp4Page";
import { majorNameMappingBySID } from '../../utils/Mappings';

export type UserTypeOptions = 'name' | 'password' | 'password2' | 'nickname' | 'studentId' | 'firstMajor' | 'id' | 'hopeMajor1' | 'hopeMajor2' | 'doubleMajor' | 'kuEmail';

// localStorage이나 sessionStorage에서 가져올 때 각 페이지별로 설정해 둔 이름들이 모두 다른 관계로 
// 강제적으로 원하는 정보를 가져올 수 있도록 userInfoTypeManual을 만들어둠 

interface UserInputProps {
  userInfoType: UserTypeOptions;
  toNext?: boolean;
  setValue?: (args: string) => void;
  setStateValid?: (args: inputState) => void;
  children?: ReactNode;
  userInfoTypeManual?: string | undefined;
  locationUsed?: 'signUp' | 'settings';
  onCustomFunction?: () => void;
}

const placeholderMapping: Record<UserTypeOptions, string> = {
  name: "홍길동",
  password: "대소문자, 특수문자를 최소 하나씩 조합하여 8글자 이상",
  password2: '비밀번호 확인',
  nickname: '닉네임',
  studentId: '학번 10자리',
  firstMajor: '전공선택',
  id: '쿠플라이 아이디',
  hopeMajor1: '1지망 이중전공 선택',
  hopeMajor2: '2지망 이중전공 선택',
  doubleMajor: '진입 이중전공 선택',
  kuEmail: '고려대학교 이메일'
}

const helpMessageMapping: Record<UserTypeOptions, string> = {
  name: "이름 입력",
  studentId: "학번 10자리",
  firstMajor: '',
  id: '',
  password: '비밀번호는 <8자 이상 20자 이하/1개 이상의 영문자/1개 이상의 숫자/1개 이상의 특수문자>가 포함되어야 합니다.',
  password2: '비밀번호 확인',
  nickname: '닉네임',
  hopeMajor1: '',
  hopeMajor2: '',
  doubleMajor: '',
  kuEmail: ''
}

const errorMessageMapping: Record<UserTypeOptions, string> = {
  name: '',
  studentId: '학번이 10자리 숫자가 아닙니다.',
  firstMajor: '',
  password: '',
  password2: '',
  nickname: '',
  id: '',
  hopeMajor1: '',
  hopeMajor2: '',
  doubleMajor: '',
  kuEmail: '유효하지 않은 이메일 주소입니다'
}

const optionList = majorTargetList;

export const UserInput:  React.FC<UserInputProps> = ({ userInfoType, toNext, children, setStateValid, userInfoTypeManual=undefined, locationUsed='signUp', onCustomFunction}) => {

  // info = {info: , infoState:, infoCheck: }
  const [userInfo, setUserInfo] = useRecoilState(locationUsed === 'signUp' ? userState(userInfoTypeManual || userInfoType) : 
  userSettingsState(userInfoTypeManual || userInfoType));

  const [firstMajor, setFirstMajor] = useRecoilState(locationUsed === 'signUp' ? userState('firstMajor') : userSettingsState('firstMajor'));

  const errorMessage = useRecoilValue(errorMessageState);

  const hopeMajor1 = useRecoilValue(locationUsed === 'signUp' ?userState('hopeMajor1') : userSettingsState('hopeMajor1')).info;

  const hopeMajor2 = useRecoilValue(locationUsed === 'signUp' ?userState('hopeMajor2') : userSettingsState('hopeMajor2')).info;

  errorMessageMapping.password = errorMessage.passwordErrorMessage;
  errorMessageMapping.nickname = errorMessage.nicknameErrorMessage;
  errorMessageMapping.password2 = errorMessage.password2ErrorMessage;

  const updatedMajorTargetList = [...majorTargetList];
  updatedMajorTargetList.unshift({ value1: '희망 없음', value2: '희망 없음' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newData = e.target.value;
    setUserInfo((prev) => ({
      ...prev,
      info: newData
    }))

    if(userInfoType === 'studentId'){
      if(newData.length === 10){
        // 학번 중간 4자리에 해당하는 학과 데이터가 있으면 자동으로 채워줌, 없으면 무시
        const key = parseInt(userInfo.info.substring(4, 8));
        // firstMajor에 해당하는 dropdown value를 바꿔준다
        setFirstMajor((prev) => ({
          ...prev,
          info: majorNameMappingBySID[key] || firstMajor.info
        }))

      }
    }
  };

  if (toNext && locationUsed === 'signUp'){
    sessionStorage.setItem(userInfoType, userInfo.info);
  }

  if(userInfo.info !== ''){
    setStateValid?.('complete');
  }else{
    setStateValid?.('incomplete');
  }
  
  //console.log(userInfo);
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
            el.value1 !== firstMajor.info
          ):
          updatedMajorTargetList.filter(
            (el) => el.value1 !== hopeMajor1 &&
            el.value1 !== firstMajor.info
          )
        }
        value={userInfo.info}
        setValue={(v) => setUserInfo((prev) => ({...prev, info:v}))}
      /> :
        <TextFieldBox
        placeholder={placeholderMapping[userInfoType]}
        value={userInfo.info}
        onChange={handleInputChange}
        state={userInfo.infoState}
        setState={(s) => setUserInfo((prev) => ({...prev, infoState: s}))}
        setValue={(v) => setUserInfo((prev) => ({...prev, info: v}))}
        helpMessage={helpMessageMapping[userInfoType]}
        errorMessage={errorMessageMapping[userInfoType]}
        type={userInfoType === 'password' || userInfoType === 'password2' ? 'password' : undefined}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === 'Enter') {
            console.log('This is the onKeyDown');
            onCustomFunction?.();
          }
        }}
      />
      }
    </>
  )
}

