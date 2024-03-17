import TextFieldBox from '../../assets/OldTextFieldBox';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userSettingsState, userState } from '../../store/atom';
import DropDown from '../../assets/dropdown/DropDown';
import { majorAllList } from '../../common/MajorAll';
import { ReactNode, useEffect } from 'react';
import { errorMessageState } from '../../store/atom';
import { majorTargetList } from '../../common/MajorTarget';
import { inputState } from '../../pages/signUp/SignUp4Page';
import NewTextFieldBox from '../../assets/NewTextFieldBox';
import { useState } from 'react';
import { StateOptions } from '../../assets/OldTextFieldBox';

export type UserTypeOptions = 'name' | 'password' | 'password2' | 'nickname' | 'studentId' | 'firstMajor' | 'id' | 'hopeMajor1' | 'hopeMajor2' | 'doubleMajor' | 'kuEmail';

// localStorage이나 sessionStorage에서 가져올 때 각 페이지별로 설정해 둔 이름들이 모두 다른 관계로
// 강제적으로 원하는 정보를 가져올 수 있도록 userInfoTypeManual을 만들어둠

interface UserInputProps {
  userInfoType: UserTypeOptions;
  children?: ReactNode;
  userInfoTypeManual?: string | undefined;
}

export const placeholderMapping: Record<UserTypeOptions, string> = {
  name: '홍길동',
  password: '대소문자, 특수문자를 최소 하나씩 조합하여 8글자 이상',
  password2: '비밀번호 확인',
  nickname: '닉네임',
  studentId: '학번 10자리',
  firstMajor: '전공선택',
  id: '쿠플라이 아이디',
  hopeMajor1: '1지망 이중전공 선택',
  hopeMajor2: '2지망 이중전공 선택',
  doubleMajor: '진입 이중전공 선택',
  kuEmail: '고려대학교 이메일',
};

export const helpMessageMapping: Record<UserTypeOptions, string> = {
  name: '이름 입력',
  studentId: '학번 10자리',
  firstMajor: '',
  id: '',
  password: '<8~20자/1개 이상의 영문자/1개 이상의 숫자/1개 이상의 특수문자>가 포함되어야 합니다.',
  password2: '비밀번호 확인',
  nickname: '닉네임',
  hopeMajor1: '',
  hopeMajor2: '',
  doubleMajor: '',
  kuEmail: '',
};

export const errorMessageMapping: Record<UserTypeOptions, string> = {
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
  kuEmail: '유효하지 않은 이메일 주소입니다',
};

const optionList = majorTargetList;

export const NewUserInput: React.FC<UserInputProps> = ({
  userInfoType,
  children,
  userInfoTypeManual = undefined,
}) => {
  // info = {info: , infoState:, infoCheck: }
  
  const [userInfo, setUserInfo] = useState(
    localStorage.getItem(userInfoTypeManual !== undefined ? userInfoTypeManual : userInfoType) || ''
  );
  const [userInfoState, setUserInfoState] = useState<StateOptions>(
    userInfoType === 'name' || userInfoType === 'studentId' || userInfoType === 'nickname' || userInfoType === 'kuEmail' || userInfoTypeManual === 'loginedUser' ? 'filled' : 'default'
  );
  const [userInfoCheck, setUserInfoCheck] = useState(userInfoType === 'nickname' ? 'filled' : 'default');

  console.log('UserInput에서 뽑는 userInfo', userInfo);


  const firstMajor = localStorage.getItem('firstMajor') || '';

  const errorMessage = useState({
    passwordErrorMessage: '',
    nicknameErrorMessage: '',
    password2ErrorMessage: ''
  });

  const hopeMajor1 = localStorage.getItem('hopeMajor1') || '';
  const hopeMajor2 = localStorage.getItem('hopeMajor2') || '';

  const updatedMajorTargetList = [...majorTargetList];
  updatedMajorTargetList.unshift({ value1: '희망 없음', value2: '희망 없음' });


  //console.log(userInfo);
  return (
    <>
      {userInfoType === 'firstMajor' ||
      userInfoType === 'hopeMajor1' ||
      userInfoType === 'hopeMajor2' ||
      userInfoType === 'doubleMajor' ? (
        <DropDown
          title={placeholderMapping[userInfoType]}
          optionList={
            userInfoType === 'firstMajor'
              ? majorAllList
              : userInfoType === 'doubleMajor'
              ? optionList
              : userInfoType === 'hopeMajor1'
              ? optionList.filter((el) => el.value1 !== hopeMajor2 && el.value1 !== firstMajor)
              : updatedMajorTargetList.filter((el) => el.value1 !== hopeMajor1 && el.value1 !== firstMajor)
          }
          value={userInfo}
          setValue={setUserInfo}
        />
      ) : (
        <TextFieldBox
          placeholder={placeholderMapping[userInfoType]}
          value={userInfo}
          state={userInfoState}
          setState={setUserInfoState}
          setValue={setUserInfo}
          helpMessage={helpMessageMapping[userInfoType]}
          errorMessage={errorMessageMapping[userInfoType]}
          type={userInfoType === 'password' || userInfoType === 'password2' ? 'password' : undefined}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUserInfo(e.target.value);
          }}
        />)}
    </>
  );
};
