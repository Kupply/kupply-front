import styled from 'styled-components';

import Typography from '../Typography';

export interface AlertMessageProps extends React.ComponentPropsWithoutRef<'div'> {}

function ToolTip05(props: AlertMessageProps) {
  const { children, ...rest } = props;
  return (
    <MainWrapper {...rest}>
      <MessageBox>
        <Typography size="0.73vw" bold="500" color="#141414">
          {children}
        </Typography>
      </MessageBox>
      <NotchImage src="../../designImage/toolTips/ToolTip05Notch.svg" alt="NotchImage" />
      <AlertImage src="../../designImage/toolTips/ToolTip05Default.svg" alt="AlertIcon" />
    </MainWrapper>
  );
}

const MainWrapper = styled.div<AlertMessageProps>`
  display: flex;
  flex-direction: column;
`;

const AlertImage = styled.img`
  width: 0.94vw;
  height: 0.94vw;
  cursor: pointer;
`;

const NotchImage = styled.img`
  position: absolute;
  width: 0.63vw;
  height: 0.42vw;
  margin: -0.56vw 0 0 0.22vw;
  display: none;

  ${MainWrapper}:hover & {
    display: flex;
  }
`;

const MessageBox = styled.div`
  position: absolute;
  justify-content: flex-start;
  align-items: center;
  width: 28.5vw; //27.5vw;
  height: auto;
  box-sizing: border-box;
  padding: 0.52vw 0.42vw;
  display: none;
  gap: 0.52vw;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.8);

  ${MainWrapper}:hover & {
    display: flex;
  }
  margin-left: -2vw;
  top: -2.1vw;
`;

export default ToolTip05;
