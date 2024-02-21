import { useRecoilState, useRecoilValue } from "recoil";
import { gpaState, isGpaChangedState, semesterState, userProfileState, userState } from "../store/atom";
import client from "./HttpClient";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";

export function useSubmit(){

  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;
  const navigate = useNavigate();


  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };

  // 너무 마음에 안 든다ㅠㅠ
  const name = useRecoilValue(userState('name'));
  const stdID = useRecoilValue(userState('studentId'));
  const firstMajor = useRecoilValue(userState('firstMajor'));
  const userProfile = useRecoilValue(userProfileState);
  const nickname = useRecoilValue(userState('nickname'));
  const semester = useRecoilValue(semesterState('candidate'));
  const hopeMajor1 = useRecoilValue(userState('hopeMajor1'));
  const hopeMajor2 = useRecoilValue(userState('hopeMajor2'));
  const pwd = useRecoilValue(userState('password'));
  const {num1, num2, num3} = useRecoilValue(gpaState('candidate'));
  const isGpaChange = useRecoilValue(isGpaChangedState);

  const firstSubmit = async () => {
    const updateData = {
      newName: name.info,
      newStudentId: stdID.info,
      newFirstMajor: firstMajor.info,
    };
    //console.log('firstSubmit');
    try {
      await axios.post('http://localhost:8080/user/updateMe', updateData, config);
      await client.post('/user/updateMe', updateData, config);
      window.location.reload(); // 페이지 새로고침.
    } catch (err) {
      console.log(err);
    }
  };

  const secondSubmit = async () => {
    const updateData = {
      newProfilePic: userProfile.pic,
      newNickname: nickname.info,
    };
    try {
      // await axios.post('http://localhost:8080/user/updateMe', updateData, config);
      await client.post('/user/updateMe', updateData, config);
      window.location.reload(); // 페이지 새로고침.
    } catch (err) {
      console.log(err);
    }
  };

  const thirdSubmit = async () => {
    
    if (isGpaChange.strange) {
      alert('비정상적인 학점 변경이 감지되었습니다. 이메일로 문의바랍니다.');
      navigate('/settings');
    } else {
      const newHopeSemester = '20' + semester.num1 + semester.num2 + '-' + semester.num3;

      const updateData = {
        newCurGPA: parseFloat(num1 + '.' + num2 + num3),
        newHopeMajor1: hopeMajor1.info,
        newHopeMajor2: hopeMajor2.info,
        newHopeSemester: newHopeSemester,
      };

      try {
        // await axios.post('http://localhost:8080/user/updateMe', updateData, config);
        await client.post('/user/updateMe', updateData, config);
        window.location.reload(); // 페이지 새로고침.
      } catch (err) {
        console.log(err);
      }
    }
  };

  const fourthSubmit = async () => {
    const updateData = {
      newPassword: pwd.info,
    };
    try {
      // await axios.post('http://localhost:8080/user/updateMe', updateData, config);
      await client.post('/user/resetPassword', updateData, config);
      window.location.reload(); // 페이지 새로고침.
    } catch (err) {
      console.log(err);
    }
  };

  return {firstSubmit, secondSubmit, thirdSubmit, fourthSubmit};
}