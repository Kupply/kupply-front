import styled from 'styled-components';

import Typography from '../Typography';

export interface AlertMessageProps extends React.ComponentPropsWithoutRef<'div'> {}

function ToolTip02(props: AlertMessageProps) {
  const { children, ...rest } = props;
  return (
    <MainWrapper {...rest}>
      <MessageBox>
        <Typography size="0.73vw" bold="500" color="var(--White, #FFF)" style={{ lineHeight: '114.286%' }}>
          {children}
        </Typography>
      </MessageBox>
      <NotchImage src="../../designImage/toolTips/ToolTip02Notch.svg" alt="NochIcon" />
      <AlertImage src="../../designImage/toolTips/ToolTip02Default.svg" alt="AlertIcon" />
    </MainWrapper>
  );
}

const MainWrapper = styled.div<AlertMessageProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const AlertImage = styled.img`
  width: 0.94vw;
  height: 0.94vw;
  margin: 0.21vw 0 0 0.31vw;
  cursor: pointer;
`;

const NotchImage = styled.img`
  width: 0.63vw;
  height: 0.42vw;
  margin: 0 0 0 0.42vw;
  display: none;

  ${MainWrapper}:hover & {
    display: flex;
  }
`;

const MessageBox = styled.div`
  width: 12.03vw;
  height: auto;
  box-sizing: border-box;
  padding: 10px 0.42vw;
  margin-left: -5vw;
  display: none;
  justify-content: center;
  align-items: center;
  gap: 0.52vw;
  border-radius: 5px;
  align-self: stretch;
  text-align: center;
  background: rgba(20, 20, 20, 0.6);

  ${MainWrapper}:hover & {
    display: flex;
  }
`;

export default ToolTip02;
