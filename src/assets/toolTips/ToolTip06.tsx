import styled from 'styled-components';

import Typography from '../Typography';

export interface AlertMessageProps extends React.ComponentPropsWithoutRef<'div'> {
  hoverState?: boolean;
}

function ToolTip06(props: AlertMessageProps) {
  const { children, hoverState, ...rest } = props;

  return (
    <MainWrapper {...rest}>
      <AlertImage src="../../designImage/toolTips/ToolTip06.svg" alt="AlertIcon" />
      {hoverState && (
        <div style={{ position: 'absolute', top: '-3.18vw', zIndex: 999 }}>
          <MessageBox>
            <Typography size="0.73vw" bold="500" color="var(--White, #FFF)" style={{ lineHeight: '114.286%' }}>
              {children}
            </Typography>
          </MessageBox>
          <NotchImage src="../../designImage/toolTips/ToolTip02Notch.svg" alt="NochIcon" />
        </div>
      )}
    </MainWrapper>
  );
}

const MainWrapper = styled.div<AlertMessageProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const AlertImage = styled.img`
  width: 0.94vw;
  height: 0.94vw;
  opacity: 0.8;
  cursor: pointer;
`;

const NotchImage = styled.img`
  width: 0.63vw;
  height: 0.42vw;
  margin: 0 0 0 8.15vw;
  display: none;

  ${MainWrapper}:hover & {
    display: flex;
  }
`;

const MessageBox = styled.div`
  width: 17vw;
  height: auto;
  box-sizing: border-box;
  overflow: hidden;
  padding: 0.521vw 0.42vw;
  //margin-left: -8vw;
  display: none;
  justify-content: center;
  align-items: center;
  gap: 0.52vw;
  border-radius: 0.26vw;
  align-self: stretch;
  text-align: center;
  background: rgba(20, 20, 20, 0.6);

  ${MainWrapper}:hover & {
    display: flex;
  }
`;

export default ToolTip06;
