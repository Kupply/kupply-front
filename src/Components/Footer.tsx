import React from 'react';
import styled from 'styled-components';

const Footer = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 100px;
    margin-top: auto;
    background-color: #dde0ea;
    align-items: center;
`;

const Contents = styled.div`
    display: flex;
    width: 96%;
    max-width: 1100px;
    height: 100%;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
`;

const Title = styled.h2`
    font-weight: 100;
    font-size: 20px;
    align-items: center;
`;

function FooterTemplate() {
    return (
        <Footer>
            <Contents>
                <Title>고려대학교 소프트웨어 개발/연구 학회 DevKor</Title>
            </Contents>
        </Footer>
    )
}

export default FooterTemplate