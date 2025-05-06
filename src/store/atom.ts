import { atom, selectorFamily, atomFamily } from "recoil";
import { StateOptions } from "../assets/OldTextFieldBox";

type NumStateType = {
  num1: string;
  num2: string;
  num3: string;
  num4: string;
  num5: string;
  num6: string;
}

export const verificationCodeState = atom<NumStateType>({
  key: 'verificationCode',
  default: {
    num1: '',
    num2: '',
    num3: '',
    num4: '',
    num5: '',
    num6: ''
  }
})

export const emailStateAtom = atom<StateOptions>({
  key: 'emailState',
  default: sessionStorage.getItem('email') ? 'filled' : 'default'
});

export const emailAtom = atom({
  key: 'email',
  default: sessionStorage.getItem('email') || ''
});

export const sendNumState = atom<number>({
  key: 'sendNumState',
  default: 0
})

export const currentModalState = atom<number>({
  key: 'currentModalState',
  default: 100
});

export const isOpenModalState = atom<boolean>({
  key: 'isOpenModalState',
  default: false
});

export const nextButtonState = atom<boolean>({
  key: 'nextButtonState',
  default: false
})



type InfoState = {
  info: string;
  infoState: StateOptions;
  infoCheck: StateOptions;
}

// 이름, 비밀번호, 닉네임...
// export const userState = atomFamily<InfoState, string>({
//   key: "userState", 
//   default: (kind: string) => {
//     let infoState:StateOptions = 'default';
//     let info:string = '';
//     if (kind === 'firstMajor') {
//       info = 'firstMajor'; // sessionStorage에서 가져온 firstMajorCode를 다시 firstMajor로 저장 
//       infoState = 'filled';
//     }
//     return {
//       info: sessionStorage.getItem(info) || '',
//       infoState: infoState,
//       infoCheck: 'default'
//     }
//   }
// });
// 내부 저장용 atom
export const rawUserState = atomFamily<InfoState, string>({
  key: 'rawUserState',
  default: {
    info: '',
    infoState: 'default',
    infoCheck: 'default',
  },
});



// selectorFamily: firstMajor일 경우에만 sessionStorage 값으로 override
export const userState = selectorFamily<InfoState, string>({
  key: 'userState',
  get: (kind: string) => ({ get }) => {
    if (kind === 'firstMajor') {
      // ✅ firstMajor는 sessionStorage에서 가져온 값을 무조건 사용하고, 'filled'로 표시
      const stored = sessionStorage.getItem('firstMajor') || '';
      return {
        info: stored,
        infoState: 'filled',
        infoCheck: 'default',
      };
    } else {
      // ✅ 나머지 키들은 내부 atom에 저장된 값을 반환
      return get(rawUserState(kind));
    }
  },
  set: (kind: string) => ({ set }, newValue) => {
    // ❌ firstMajor는 수정 불가
    if (kind === 'firstMajor') return;

    // ✅ 나머지 키들은 atom에 쓰기 허용
    set(rawUserState(kind), newValue as InfoState);
  },
});

// export const userSettingsState = atomFamily<InfoState, string>({
//   key: "userSettingsState",
//   default: (kind: string) => {
//     let infoState:StateOptions = 'default';
//     if(kind === 'name' || kind === 'studentId' || kind === 'nickname' || kind === 'kuEmail' || kind === 'loginedUser'){
//       infoState = 'filled';
//     }
//     let infoCheck:StateOptions = 'default';
//     if(kind === 'nickname')
//       infoCheck = 'filled';
//     return {
//       info: localStorage.getItem(kind) || '',
//       infoState: infoState,
//       infoCheck: infoCheck
//     };
//   }
// });

// 1. 내부 저장 전용 atom
export const rawUserSettingsState = atomFamily<InfoState, string>({
  key: 'rawUserSettingsState',
  default: {
    info: '',
    infoState: 'default',
    infoCheck: 'default',
  },
});

// 2. 초기화 + 읽기/쓰기 지원 selector
export const userSettingsState = selectorFamily<InfoState, string>({
  key: 'userSettingsState',
  get: (kind: string) => ({ get }) => {
    const storedValue = localStorage.getItem(kind) || '';

    let infoState: StateOptions = 'default';
    if (
      kind === 'name' ||
      kind === 'studentId' ||
      kind === 'nickname' ||
      kind === 'kuEmail' ||
      kind === 'loginedUser'
    ) {
      infoState = 'filled';
    }

    let infoCheck: StateOptions = kind === 'nickname' ? 'filled' : 'default';

    return {
      info: storedValue,
      infoState,
      infoCheck,
    };
  },

  // 쓰기 지원
  set: (kind: string) => ({ set }, newValue) => {
    if (typeof newValue === 'object' && newValue !== null && 'info' in newValue) {
      const val = newValue as InfoState;
      localStorage.setItem(kind, val.info); // localStorage에도 반영
      set(rawUserSettingsState(kind), val);  // atom에도 저장
    }
  },
});

type errorMessageType = {
  passwordErrorMessage: string;
  nicknameErrorMessage: string;
  password2ErrorMessage: string;
};

export const errorMessageState = atom<errorMessageType>({
  key: "errorMessageState",
  default: {
    passwordErrorMessage: '',
    nicknameErrorMessage: '',
    password2ErrorMessage: ''
  }
});

// 유저가 candidate이거나 passer이고 그에 따른 state가 결정 
type userTypetype = 'candidate' | 'passer' | '';
type userStatetype = 'clicked' | 'default' | 'inactive';

export const userTypeState = atom<
{userType: userTypetype, userState: userStatetype[]}>({
  key: 'userTypeState',
  default: {
    userType: '',
    userState: ['default', 'default']
  }
});

export const appModalUserTypeState = atom<
{userType: userTypetype, userState: userStatetype[]}>({
  key: 'userTypeAppState',
  default: {
    userType: '',
    userState: ['default', 'default']
  }
});

export const appModalUserTypeMobileState = atom<
{userType: userTypetype, userState: userStatetype[]}>({
  key: 'userTypeAppMobileState',
  default: {
    userType: '',
    userState: ['default', 'default']
  }
});

type GpaSemesterType = {
  num1: string;
  num2: string;
  num3: string;
}

export type userType = 'candidate' | 'passer';

export const gpaState = atomFamily<GpaSemesterType, userType>({
  key: "GpaState",
  default: (kind: userType) => ({
    num1: sessionStorage.getItem(kind === 'candidate' ? 'curGPA' : `passGPA`)?.charAt(0) || '',
    num2: sessionStorage.getItem(kind === 'candidate' ? 'curGPA' : `passGPA`)?.charAt(2) || '',
    num3: sessionStorage.getItem(kind === 'candidate' ? 'curGPA' : `passGPA`)?.charAt(3) || '',
  })
})

// SettingsPage에서 사용할 gpa
export const gpaSettingsState = atomFamily<GpaSemesterType, userType>({
  key: "GpaSettingsState",
  default: (kind: userType) => ({
    num1: localStorage.getItem(kind === 'candidate' ? 'curGPA' : `passGPA`)?.charAt(0) || '',
    num2: localStorage.getItem(kind === 'candidate' ? 'curGPA' : `passGPA`)?.charAt(2) || '',
    num3: localStorage.getItem(kind === 'candidate' ? 'curGPA' : `passGPA`)?.charAt(3) || '',
  })
})


export const semesterState = atomFamily<GpaSemesterType, userType>({
  key: "SemesterState",
  default: (kind: userType) => ({
    num1: sessionStorage.getItem(kind === 'candidate' ? 'hopeSemester' : 'passSemester')?.charAt(2) || '',
    num2: sessionStorage.getItem(kind === 'candidate' ? 'hopeSemester' : 'passSemester')?.charAt(3) || '',
    num3: sessionStorage.getItem(kind === 'candidate' ? 'hopeSemester' : 'passSemester')?.charAt(5) || '',
  })
})

// SettingsPage에서 사용하는 gpa
export const semesterSettingsState = atomFamily<GpaSemesterType, userType>({
  key: "SemesterSettingsState",
  default: (kind: userType) => ({
    num1: localStorage.getItem(kind === 'candidate' ? 'hopeSemester' : 'passSemester')?.charAt(2) || '',
    num2: localStorage.getItem(kind === 'candidate' ? 'hopeSemester' : 'passSemester')?.charAt(3) || '',
    num3: localStorage.getItem(kind === 'candidate' ? 'hopeSemester' : 'passSemester')?.charAt(5) || '',
  })
})

type CurrentSemesterType = {
  num1: string;
  num2: string;
}


export const currentSemesterState = atomFamily<CurrentSemesterType, userType>({
  key: "CurrentSemesterState",
  default: (kind: userType) => ({
    num1: localStorage.getItem('currentSemester')?.charAt(0) || '',
    num2: localStorage.getItem('currentSemester')?.charAt(2) || ''
  })
})

// settings의 sidebar에서 어떤 번호가 selected인지
export const SBContentState = atom<number>({
  key: 'SideBarContentSelectedNumberState',
  default: 0
});


export const isAppliedState = atom<boolean>({
  key: 'isAppliedState',
  default: localStorage.getItem('isApplied') === 'true' || false
});

export const userProfileState = atom({
  key: 'userProfileState',
  default: {
    pic: localStorage.getItem('userProfilePic') || 'rectProfile1',
    link: localStorage.getItem('userProfileLink') || ''
  }
})

// gpa가 바뀐 여부와 바뀐것이 이상행동으로 감지되었는지 여부 
type gpaChangeType = {
  changed: boolean;
  strange: boolean;
};
export const isGpaChangedState = atom<gpaChangeType>({
  key: 'hasGPAChanged',
  default: {
    changed: false,
    strange: false
  }
})

export const settingsModalState = atom<boolean>({
  key: 'settingsModalState',
  default: false
})

export const selectedFileState = atom<File|null>({
  key: 'selectedFileState',
  default: null
});

export const selectedFileMobileState = atom<File|null>({
  key: 'selectedFileMobileState',
  default: null
});

export const applicationModalState = atom<number>({
  key: 'applicationModalState',
  default: 0
});

export const applicationModalMobileState = atom<number>({
  key: 'applicationModalMobileState',
  default: 0
});

export const applicationSubmittedState = atom<boolean>({
  key: 'applicationSubmittedState',
  default: false
});

export const applicationSubmittedMobileState = atom<boolean>({
  key: 'applicationSubmittedMobileState',
  // 잠시 true로 
  default: false
});

export const editSubmittedState = atom<boolean>({
  key: 'editSubmittedState',
  default: false
});

export const editModalState = atom<number>({
  key: 'editModalState',
  default: 0
});
export const editModalMobileState = atom<number>({
  key: 'editModalMobileState',
  default: 0
});


export type headerButtonStateType = 'basicMajor' | 'interestMajor' | 'currentGPA' | 'hopeSemester';

export const headerButtonState = atom<headerButtonStateType>({
  key: 'headerButtonState',
  default: 'basicMajor'
});

export const headerButtonMobileState = atom<headerButtonStateType>({
  key: 'headerButtonMobileState',
  default: 'basicMajor'
});

export const MobileSelectedState = atom<number>({
  key: 'MobileSelectedState',
  default: 0
});

