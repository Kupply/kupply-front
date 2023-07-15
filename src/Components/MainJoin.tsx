import React from 'react';
import styled from 'styled-components';

const Banner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 350px;
    width: 50%;
    background-color: #dde0ea;
    margin: 0 auto; /* 좌우축에서 위치(가운데) 정렬 */
    margin-top: 8%; /* 상하축에서 위치 정렬 */
`;

const PrevButton = styled.button`
    width: 0;
    height: 0;
    border-bottom: 50px solid white;
    border-top: 50px solid white;
    border-left: 50px solid white;
    border-right: 50px solid #dde0ea;

    position: fixed;
    top: 38%;
    left: 100px;
    transform: translateY(-50%);
`;

const NextButton = styled.button`
    width: 0;
    height: 0;
    border-bottom: 50px solid white;
    border-top: 50px solid white;
    border-left: 50px solid #dde0ea;
    border-right: 50px solid white;

    /* 질문: position fixed 를 삭제하면 삼각형이 오른쪽 화면에 붙지 않는다. 그 이유는?  */
    position: fixed;
    top: 38%;
    /* 질문: '10px' 라고 쓰지 않고, '10' 이라 쓰면 default 로 어떻게 인식되는 것이지? */
    right: 100px;
    transform: translateY(-50%);
`;

/* 질문: 검은색 테두리는 왜 생기는가? 난 설정한 적이 없다. */
const JoinButton = styled.button`
    display: flex;
    justify-content: center;    
    align-items: center;
    height: 60px;
    width: 15%;
    background-color: #dde0ea; 
    margin: 0 auto; 
    margin-top: 3%;

    font-size: 20px;
`;


function MainJoin() {
    return (
        <div>
            <PrevButton />
            <Banner />
            <NextButton />
            <JoinButton>서비스 가입하기</JoinButton>
        </div>
    )
}

export default MainJoin