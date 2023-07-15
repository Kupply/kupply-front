import React from 'react';
import styled from 'styled-components';

const IDformContainer = styled.div`
    display: flex;   
    align-items: center;

    width: 30%;
    background-color: white;
    margin: 0 auto;
    margin-left: 40%;
    margin-top: 10px;
`;

const IDformInput = styled.input `
    height: 60px;
    width: 50%;
    background-color: #dde0ea; 
    border: none;
    padding: 0 10px;
`;

const IDformText = styled.span`
    margin-right: 20px;
    display: flex;
    justify-content: center;
`;

const PWformContainer = styled.div`
    display: flex;   
    align-items: center;
    width: 30%;
    background-color: white;
    margin: 0 auto;
    margin-left: 39%;
    margin-top: 20px;
`;

const PWformInput = styled.input `
    height: 60px;
    width: 50%;
    background-color: #dde0ea; 
    border: none;
    padding: 0 10px;
`;

const PWformText = styled.span`
    margin-right: 20px;
    display: flex;
    justify-content: center;
`;


/* 질문: 내 노트북 PC 풀 화면을 기준으로 하드코딩으로 숫자 박아넣고 있는데, 이렇게 하드코딩해도 되는건가 싶다. */
const FindContainer = styled.div `
    display: flex;
    justify-content: center;    
    align-items: center;
    height: 50px;
    width: 30%;
    background-color: white; 
    margin: 0 auto; 
    margin-left: 35%;
    margin-top: 40px;

    border-top: 3px solid white;
    border-color: #dde0ea;
`;

const FindText = styled.li`
    list-style-type: none;
    float: left;
    margin-left: 30px;
`;

const Title = styled.h2`
    display: flex;
    justify-content: center;    
    font-size: 50px;
    margin-top: 180px;
`;

function Login() {
    return (
        <div>
            <Title>서비스 로그인</Title>
            <IDformContainer>
                <IDformText>아이디</IDformText>
                <IDformInput type="text" />
            </IDformContainer>
            <PWformContainer>
                <PWformText>비밀번호</PWformText>
                <PWformInput type="password" />
            </PWformContainer>
            <FindContainer>
                <FindText>회원가입</FindText>
                <FindText>아이디 찾기</FindText>
                <FindText>비밀번호 찾기</FindText>
            </FindContainer>
        </div>
    )
}

export default Login