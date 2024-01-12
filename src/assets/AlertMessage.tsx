import styled from 'styled-components';

import Typography from './Typography';

export interface AlertMessageProps extends React.ComponentPropsWithoutRef<'div'> {}

function AlertMessage(props: AlertMessageProps) {
  const { children, ...rest } = props;
  return (
    <MainWrapper {...rest}>
      <MessageBox>
        <Typography size="0.73vw" bold="500" color="var(--White, #FFF)">
          {children}
        </Typography>
      </MessageBox>
      <NotchImage src="../../design_image/notch.svg" alt="NotchImage" />
      <AlertImage src="../../design_image/fi_alert-circle1.svg" alt="AlertIcon" />
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
  margin: 0.21vw 0 0 0.31vw;
  cursor: pointer;
`;

const NotchImage = styled.img`
  width: 0.63vw;
  height: 0.42vw;
  margin: -0.16vw 0 0 0.42vw;
  display: none;

  ${MainWrapper}:hover & {
    display: flex;
  }
`;

const MessageBox = styled.div`
  width: auto;
  height: auto;
  box-sizing: border-box;
  padding: 10px 0.42vw;
  display: none;
  justify-content: center;
  align-items: center;
  gap: 0.52vw;
  border-radius: 5px;
  background: var(--PRIMARY, #d85888);

  ${MainWrapper}:hover & {
    display: flex;
  }
`;

export default AlertMessage;
