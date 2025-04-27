import { useRecoilState, useRecoilValue } from 'recoil';
import {
  gpaSettingsState,
  isGpaChangedState,
  semesterSettingsState,
  userProfileState,
  userState,
  userSettingsState,
} from '../store/atom';
import { client } from './HttpClient';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function useSubmit0() {
  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;
  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };

  const name = useRecoilValue(userSettingsState('name'));
  const stdID = useRecoilValue(userSettingsState('studentId'));
  const firstMajor = useRecoilValue(userSettingsState('firstMajor'));

  const firstSubmit = async () => {
    const updateData = {
      newName: name.info,
      newStudentId: stdID.info,
      newFirstMajor: firstMajor.info,
    };
    console.log('firstSubmit', updateData);
    try {
      //await axios.post('http://localhost:8080/user/updateMe', updateData, config);
      await client.post('/user/updateMe', updateData, config);
      window.location.reload(); // 페이지 새로고침.
    } catch (err) {
      console.log(err);
    }
  };

  return { firstSubmit };
}

export function useSubmit1() {
  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;
  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };

  const userProfile = useRecoilValue(userProfileState);
  const nickname = useRecoilValue(userSettingsState('nickname'));

  const secondSubmit = async () => {
    const updateData = {
      newProfilePic: userProfile.pic,
      newNickname: nickname.info,
    };
    console.log('secondSubmit', updateData);
    try {
      // await axios.post('http://localhost:8080/user/updateMe', updateData, config);
      await client.post('/user/updateMe', updateData, config);
      window.location.reload(); // 페이지 새로고침.
    } catch (err) {
      console.log(err);
    }
  };

  return { secondSubmit };
}

export function useSubmit2() {
  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;
  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };

  const semester = useRecoilValue(semesterSettingsState('candidate'));
  const hopeMajor1 = useRecoilValue(userSettingsState('hopeMajor1'));
  const hopeMajor2 = useRecoilValue(userSettingsState('hopeMajor2'));
  const { num1, num2, num3 } = useRecoilValue(gpaSettingsState('candidate'));
  const isGpaChange = useRecoilValue(isGpaChangedState);

  const thirdSubmit = async () => {
    const newHopeSemester = '20' + semester.num1 + semester.num2 + '-' + semester.num3;

    const updateData = {
      newCurGPA: parseFloat(num1 + '.' + num2 + num3),
      newHopeMajor1: hopeMajor1.info,
      newHopeMajor2: hopeMajor2.info,
      newHopeSemester: newHopeSemester,
    };

    try {
      //await axios.post('http://localhost:8080/user/updateMe', updateData, config);
      await client.post('/user/updateMe', updateData, config);
      //console.log('ok');
      window.location.reload(); // 페이지 새로고침.
    } catch (err) {
      console.log(err);
    }
  };
  return { thirdSubmit };
}

export function useSubmit3() {
  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;
  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };

  const pwd = useRecoilValue(userSettingsState('password'));
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

  return { fourthSubmit };
}
