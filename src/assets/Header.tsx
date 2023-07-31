import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

type MenuOptions =
  | "main"
  | "previous"
  | "myBoard"
  | "community"
  | "message"
  | "settings"
  | "join";

export interface HeaderProps extends React.ComponentPropsWithoutRef<"button"> {
  menu?: MenuOptions;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1920px;
  height: 96px;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.2);
`;

const LeftWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-left: 129px;
`;

const RightWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 128px;
`;

const Previous = styled.button<{ menu: MenuOptions }>`
  display: inline-flex;
  padding: 8px 26px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 6px;
  border: none;
  background: none;
  color: #141414;
  text-align: center;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  text-transform: uppercase;
  opacity: ${(props) => {
    switch (props.menu) {
      case "previous":
      case "main":
      case "join":
        return 1;
      default:
        return 0.6000000238418579;
    }
  }};
  font-weight: ${(props) => {
    switch (props.menu) {
      case "previous":
        return 700;
      default:
        return 500;
    }
  }};

  &:hover {
    background: rgba(216, 88, 136, 0.1);
    color: #d85888;
    opacity: 1;
    font-weight: 600;
  }
`;

const MyBoard = styled.button<{ menu: MenuOptions }>`
  display: inline-flex;
  padding: 8px 26px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 6px;
  border: none;
  background: none;
  color: #141414;
  text-align: center;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  text-transform: uppercase;
  opacity: ${(props) => {
    switch (props.menu) {
      case "myBoard":
      case "main":
      case "join":
        return 1;
      default:
        return 0.6000000238418579;
    }
  }};
  font-weight: ${(props) => {
    switch (props.menu) {
      case "myBoard":
        return 700;
      default:
        return 500;
    }
  }};

  &:hover {
    background: rgba(216, 88, 136, 0.1);
    color: #d85888;
    opacity: 1;
    font-weight: 600;
  }
`;

const Community = styled.button<{ menu: MenuOptions }>`
  display: inline-flex;
  padding: 8px 26px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 6px;
  border: none;
  background: #fff;
  color: #141414;
  text-align: center;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  text-transform: uppercase;
  opacity: ${(props) => {
    switch (props.menu) {
      case "community":
      case "main":
      case "join":
        return 1;
      default:
        return 0.6000000238418579;
    }
  }};
  font-weight: ${(props) => {
    switch (props.menu) {
      case "community":
        return 700;
      default:
        return 500;
    }
  }};

  &:hover {
    background: rgba(216, 88, 136, 0.1);
    color: #d85888;
    opacity: 1;
    font-weight: 600;
  }
`;

const Icon = styled.button`
  display: flex;
  padding: 1.667px 2px 2.333px 2px;
  justify-content: center;
  align-items: center;
  flex-shrink: center;
  border: none;
  background: none;
  padding-left: 26px;
`;

const IconImage = styled.img`
  width: 30px;
  height: 30px;
`;

const Join = styled.button`
  display: flex;
  width: 108px;
  height: 52px;
  padding: 16px 32px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #d85888;
  background: none;
`;

const JoinText = styled.div`
  color: #d85888;
  text-align: center;
  font-family: pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
`;

function Header(props: HeaderProps) {
  const { menu = "main", ...rest } = props;
  const navigate = useNavigate();
  const handleMenu1Click = () => {
    navigate("/previous");
  };
  const handleMenu2Click = () => {
    navigate("/myboard");
  };
  const handleMenu3Click = () => {
    navigate("/community");
  };
  const handleSettingsClick = () => {
    navigate("/settings");
  };
  const handleMessageClick = () => {
    navigate("/message");
  };
  const handleJoinClick = () => {
    navigate("/join");
  };

  return (
    <Wrapper>
      <LeftWrapper>
        <Logo />
        <Previous onClick={handleMenu1Click} menu={menu} {...rest}>
          합격자료
        </Previous>
        <MyBoard onClick={handleMenu2Click} menu={menu} {...rest}>
          마이보드
        </MyBoard>
        <Community onClick={handleMenu3Click} menu={menu} {...rest}>
          커뮤니티
        </Community>
      </LeftWrapper>
      <RightWrapper>
        {menu != "join" && (
          <>
            <Icon onClick={handleMessageClick}>
              <IconImage src="../../design_image/fi_mail.png" />
            </Icon>
            <Icon onClick={handleSettingsClick}>
              <IconImage src="../../design_image/fi_settings.png" />
            </Icon>
          </>
        )}
        {menu === "join" && (
          <Join onClick={handleJoinClick}>
            <JoinText>Join!</JoinText>
          </Join>
        )}
      </RightWrapper>
    </Wrapper>
  );
}

export default Header;
