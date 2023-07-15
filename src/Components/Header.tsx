import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 80px;
    background-color: #dde0ea;
`;

const Contents = styled.div`
    display: flex;
    width: 96%;
    max-width: 1100px;
    height: 100%;
    margin: 0 auto;
    align-items: center;
    justify-content: space-between;
`;

const Menu = styled.li`
    list-style-type: none;
    float: left;
    margin-left: 30px;
`;

function HeaderTemplate() {
    return (
        <Header>
            <Contents>서비스 로고
                    <Menu>메뉴 1</Menu>
                    <Menu>메뉴 2</Menu>
                    <Menu>메뉴 3</Menu>
            </Contents>
        </Header>
    )
}

export default HeaderTemplate