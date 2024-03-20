import styled from "styled-components";
// import { userProfileState, userSettingsState } from "../../../../store/atom";
// import { useRecoilState } from "recoil";
// import PrevButton from "../../../../assets/buttons/PrevButton";
// import { UserInput } from "../../../signUp/UserInput";
// import MoveButton from "../MoveButton";
// import NicknameCheckButton from "../../../../assets/progressIndicator/Loader";
// import { useNicknameVerification, useStudentIdVerification } from "../../../../utils/UserInputVerification";

// type StateOptions = 'default' | 'hover' | 'loading' | 'filled' | 'error' ;
// export interface EditCurrentModalProps{
//   isOpenModal: boolean;
//   setOpenModal: (isOpenModal: boolean) => void;
//   onClickSubmit: () => void; // 함수;
//   isApplied: boolean; 
// };

// export default function CurrentModal0(props: EditCurrentModalProps){
//   const {isOpenModal, setOpenModal, onClickSubmit, isApplied} = props;
//   const [userProfile, setUserProfile] = useRecoilState(userProfileState);
//   const [nickname, setNickname] = useRecoilState(userSettingsState('nickname'));
//   const handleProfileClick = (pic: string) => {
//     setUserProfile((prev) => ({
//       ...prev, 
//       pic: pic
//     }))
//   };
//   useNicknameVerification("settings");
//   useStudentIdVerification("settings");

//   return (
//     <ContentsWrapper
//       style={{
//         marginBottom: '5.260vw',
//       }}
//     >
//       <SubContentsWrapper>
//         <ContentsTitle>프로필 사진 변경하기</ContentsTitle>
//         <div style={{ display: 'flex', flexDirection: 'row', gap: '1.042vw' }}>
//           <CurrentImg
//             src={
//               userProfile.pic === 'customProfile'
//                 ? userProfile.link
//                 : `designImage/character/rectProfile/${userProfile.pic}.png`
//             }
//             alt="current profile"
//           />
//           <div>
//             <CandidateImgsWrapper>
//               {Array.from({ length: 4 }, (_, index) => (
//                 <CandidateImg
//                   src={`designImage/character/rectProfile/RectProfile${index+1}.png`}
//                   alt={`candidate profile ${index+1}`}
//                   onClick={()=>handleProfileClick(`rectProfile${index+1}`)}
//                 />
//               ))}
//             </CandidateImgsWrapper>
//             <div style={{ gap: '0.260vw', marginTop: '2.708vw' }}></div>
//             <div style={{ marginLeft: '4.427vw', marginTop: '-1.458vw' }}></div>
//           </div>
//         </div>
//       </SubContentsWrapper>

//       <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5vw' }}>
//         <SubContentsWrapper>
//           <ContentsTitle>닉네임 변경하기</ContentsTitle>
//           <div style={{position: 'relative'}}>
//             <UserInput userInfoType="nickname" locationUsed="settings"/>
//             {nickname.info === '' || nickname.infoState === 'filled' ? (
//               <></>
//             ) : (
//               <NicknameCheckButtonWrapper>
//                 <NicknameCheckButton
//                   nickname={nickname.info}
//                   state={nickname.infoCheck as StateOptions}
//                   setState={(so) => setNickname((prev) => ({...prev, infoCheck: so}))}
//                 />
//               </NicknameCheckButtonWrapper>
//             )}
//           </div>
//         </SubContentsWrapper>
//         <SubContentsWrapper>
//           <ContentsTitle>학번 변경하기</ContentsTitle>
//           <UserInput userInfoType="studentId" locationUsed="settings"/>
//         </SubContentsWrapper>
//         <SubContentsWrapper>
//           <ContentsTitle>본전공 변경하기</ContentsTitle>
//           <UserInput userInfoType="firstMajor" locationUsed="settings"/>
//         </SubContentsWrapper>
//       </div>
//       <MoveButton
//         isOpenModal={isOpenModal}
//         setOpenModal={setOpenModal}
//         onClickSubmit={onClickSubmit}
//         isApplied={isApplied}
//         style={{marginTop: '1.042vw'}}
//       />

//     </ContentsWrapper>
//   )
// }

// const ContentsWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   //width: 628px;
//   width: 32.708vw;
//   align-items: left;
//   margin-left: auto;
//   margin-right: auto;
//   //margin-top: 58px;
//   margin-top: 3.021vw;
//   //gap: 35px;
//   gap: 1.823vw;
// `;

// const SubContentsWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   //gap: 9px;
//   gap: 0.469vw;
// `;

// const ContentsTitle = styled.text`
//   color: var(--Main-Black, #141414);
//   font-family: Pretendard;
//   //font-size: 18px;
//   font-size: 0.9375vw;
//   font-style: normal;
//   font-weight: 700;
//   line-height: 100%;
//   opacity: 0.8;
// `;

// const CurrentImg = styled.img`
//   //width: 153px;
//   width: 7.969vw;
//   //height: 153px;
//   height: 7.969vw;
//   object-fit: cover;
// `;

// const CandidateImg = styled.img`
//   //width: 74px;
//   width: 3.854vw;
//   //height: 74px;
//   height: 3.854vw;
//   object-fit: cover;
//   cursor: pointer;
// `;

// const CandidateImgsWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   //gap: 14px;
//   gap: 0.729vw;
// `;

// const NicknameCheckButtonWrapper = styled.div`
//   position: absolute;
//   top: 1.15vw; //20.2px;
//   left: 25.3vw; //490px;
//   z-index: 2;
// `;