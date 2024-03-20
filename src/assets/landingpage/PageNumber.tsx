import styled from 'styled-components';

import Typography from '../Typography';

export interface PageNumberProps extends React.ComponentPropsWithRef<'div'> {
  active?: boolean;
  page?: string;
}

const Wrapper = styled.div<PageNumberProps>`
  display: flex;
  width: fit-content;
  height: fit-content;
  padding: 0.94vw 1.2vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  border-radius: 0.26vw;
  background: ${(props) => (props.active === true ? '#d85888' : '#f5f5f5')};
  box-shadow: ${(props) => (props.active === true ? '0px 4px 12px 0px rgba(216, 88, 136, 0.25)' : '0px 0px 0px 0px')};
  cursor: pointer;
`;

export default function PageNumber(props: PageNumberProps) {
  const { active = false, page = '1', ...rest } = props;
  return (
    <Wrapper active={active} {...rest}>
      <Typography size="1.04vw" bold="500" color={active ? '#FFF' : 'rgba(67, 67, 67, 0.80)'}>
        {page}
      </Typography>
    </Wrapper>
  );
}
