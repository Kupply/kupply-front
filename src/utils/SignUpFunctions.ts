import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { errorMessageState, userState } from "../store/atom";
import { useEffect, useState } from "react";

export const sendEmail = async (email: string) => {
  const url = 'https://api.kupply.devkor.club/auth/sendEmail';
  try {
    await axios.post(url, { email: email });
    return true;
  } catch (e: any){
    alert(e.response.data.error.message);
    console.log(e);
    return false;
  }
}

export function useSignUp2Validation(){
  const [name, setName] = useRecoilState(userState('name'));
  const [stdId, setStdId] = useRecoilState(userState('studentId'));
  const [firstM, setFirstM] = useRecoilState(userState('firstMajor'));
  const [complete, setComplete] = useState(false);
  const navigate = useNavigate();

  // 잠시 수정 
  // useEffect(() => {
  //   if (!sessionStorage.getItem('email')) navigate('/');
  //   else {
  //     sessionStorage.removeItem('firstMajor'); //dropdown value는 초기화
  //     if (name.info !== '') setName((prev) => ({...prev, infoState: 'filled'}));
  //     if (stdId.info !== '') setStdId((prev) => ({...prev, infoState: 'filled'}));
  //   }
  // }, []);

  useEffect(() => {
    const passwordCheck = /^\d{10}$/;
    if (stdId.infoState === 'filled') {
      if (!passwordCheck.test(stdId.info)) 
        setStdId((prev) => ({...prev, infoState: 'error'}));
      else setStdId((prev) => ({...prev, infoState: 'filled'}));
    }
  }, [stdId.info, stdId.infoState]);

  useEffect(() => {
    if (name.infoState === 'filled' && stdId.infoState === 'filled' && !!firstM.info && !complete) {
      setComplete(true);
    } else if (!(name.infoState === 'filled' && stdId.infoState === 'filled' && !!firstM.info) && complete) {
      setComplete(false);
    }
  }, [name.infoState, stdId.infoState, firstM.info, complete]);

  return {
    complete
  }
}

// 이것자체가 지금 문제임 Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.
export function useSignUp3Validation(){
  const [password, setPassword] = useRecoilState(userState('password'));
  const [password2, setPassword2] = useRecoilState(userState('password2'));
  const [nickname, setNickname] = useRecoilState(userState('nickname'));
  const [errorMessages, setErrorMessages] = useRecoilState(errorMessageState);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (password.infoState === 'filled' && password2.infoState === 'filled' && nickname.infoState === 'filled' && !complete) {
      setComplete(true);
    } else if (!(password.infoState === 'filled' && password2.infoState === 'filled' && nickname.infoState === 'filled') && complete) {
      setComplete(false);
    }
  }, [password.infoState, password2.infoState, nickname.infoState, complete]);

  /* password의 유효성 검사 + 알맞은 errorMessage 설정 */
  useEffect(() => {
    const passwordCheck = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*?])[a-zA-Z\d~!@#$%^&*?ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{8,20}$/;
    if (password.infoState === 'filled') {
      if (!passwordCheck.test(password.info)) {
        let errorMessage = '비밀번호가 ';

        if (!/(?=.*[a-zA-Z])/.test(password.info)) {
          errorMessage += ' 영문자를 포함하고 있지 않아요!';
        } else if (!/(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\-])/.test(password.info)) {
          errorMessage += ' 특수 문자를 포함하고 있지 않아요!';
        } else if (!/(?=.*[0-9])/.test(password.info)) {
          errorMessage += ' 숫자를 포함하고 있지 않아요!';
        } else if (password.info.length < 8) errorMessage += ' 최소 8자 이상이어야 해요!';
        else if (password.info.length > 20) errorMessage = '비밀번호는 20자를 넘어갈 수 없어요!';
        else errorMessage = '비밀번호에 허용되지 않은 문자가 포함되었어요!';
        setErrorMessages({
          ...errorMessages,
          passwordErrorMessage: errorMessage,
        });
        setPassword((prev) => ({...prev, infoState: 'error'}));
      } else setPassword((prev) => ({...prev, infoState: 'filled'}));
    }
  }, [password.info, password.infoState]);

  /* password2의 일치 여부 검사 */
  
  useEffect(() => {
    if (!!password.info && !!password2.info && password.infoState === 'filled' && password2.infoState === 'filled') {
      if (password.info === password2.info) {
        setPassword2((prev) => ({...prev, infoState: 'filled'}));
      } else {
        setPassword2((prev) => ({...prev, infoState: 'error'}));
      }
    }
  }, [password.info, password.infoState, password2.info, password2.infoState]);

  //nicknameState가 바뀔 때, 즉 창을 클릭할 때에 대한 대처이다.
  // 닉네임 제한 10->7자 수정
  useEffect(() => {
    if ((nickname.info.length === 1 || nickname.info.length > 7) && nickname.infoState !== 'focused') {
      setNickname((prev) => ({...prev, infoState: 'error'}));
      setErrorMessages({
        ...errorMessages,
        nicknameErrorMessage: '닉네임은 2자 이상 7자 이하여야 해요.',
      });
    } else if (nickname.infoCheck === 'error' && nickname.infoState !== 'focused') {
      setNickname((prev) => ({...prev, infoState: 'error'}));
      setErrorMessages({
        ...errorMessages,
        nicknameErrorMessage: '중복되는 닉네임이에요!',
      });
    } else if (nickname.infoCheck !== 'filled') {
      if (!(nickname.infoState === 'default' || nickname.infoState === 'focused' || nickname.infoState === 'hover')) {
        setNickname((prev) => ({...prev, infoState: 'error'}));
        setErrorMessages({
          ...errorMessages,
          nicknameErrorMessage: '닉네임 중복 검사를 완료해 주세요.',
        });
      }
    }
  }, [nickname.infoState]);

  //nickname이 바뀌면 중복 확인 검사 결과도 처음으로 돌아가야 함.
  useEffect(() => {
    setNickname((prev) => ({...prev, infoCheck: 'default'}));
  }, [nickname.info]);

  //중복 체크의 결과에 따라 nicknameState가 바뀐다.
  useEffect(() => {
    if (nickname.infoCheck === 'filled') setNickname((prev) => ({...prev, infoState: 'filled'}));
    else if (nickname.infoCheck === 'error') {
      setNickname((prev) => ({...prev, infoState: 'error'}));
      setErrorMessages({
        ...errorMessages,
        nicknameErrorMessage: '중복되는 닉네임이에요!',
      });
    }
  }, [nickname.infoCheck]);

  return {complete};
}

