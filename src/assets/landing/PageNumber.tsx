import styled from 'styled-components';
import Typography from '../Typography';

export interface PageNumberProps extends React.ComponentPropsWithRef<'div'> {
  active?: boolean;
  page?: string;
}

const Wrapper = styled.div<PageNumberProps>`
  display: flex;
  width: 14px;
  height: 14px;
  padding: 18px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  border-radius: 5px;
  background: ${(props) => (props.active === true ? '#d85888' : '#f5f5f5')};
  box-shadow: ${(props) => (props.active === true ? '0px 4px 12px 0px rgba(216, 88, 136, 0.25)' : '0px 0px 0px 0px')};
  cursor: pointer;
`;

export default function PageNumber(props: PageNumberProps) {
  const { active = false, page = '1', ...rest } = props;
  return (
    <Wrapper active={active} {...rest}>
      <Typography size="bodyText" bold="500" color={active ? '#FFF' : 'rgba(67, 67, 67, 0.80)'}>
        {page}
      </Typography>
    </Wrapper>
  );
}
