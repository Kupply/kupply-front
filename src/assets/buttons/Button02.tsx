import styled from 'styled-components';

import Typography from '../Typography';

export interface Button02Props extends React.ComponentPropsWithoutRef<'button'> {
  // variant?: 'solid' | 'outline';
  state?: 'default' | 'hover' | 'pressed' | 'disabled';
  size?:  string;
}

// 고파스 통합 후 Join 버튼 (w/ 고파스 로고)
function Button02(props: Button02Props) {
  const { children = '고파스 아이디로 로그인하기', state = 'default', size ='1.30vw', ...rest } = props;
  return (
    <ButtonWrapper state={state} {...rest}>
      <ImageWrapper
        size={size}
        src={'../../designImage/ButtonKoreapas.svg'}
      />
      <Typography
        bold="500"
        color="#FFF"
      >
        {children}
      </Typography>
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.button<Button02Props>`
  width: fit-content;
  height: fit-content;
  box-sizing: border-box;
  border: none;
  padding: 1.25vw 1.77vw;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.42vw;
  border-radius: 0.52vw;
  background: ${(props) =>
    props.state === 'default' || props.state === 'disabled'
      ? '#D85888'
      : props.state === 'hover' 
      ? 'rgba(216, 88, 136, 0.75)'
      : 'rgba(216, 88, 136, 0.10)'}; // props.state === 'pressed' 
  opacity: ${(props) => (props.state === 'disabled' ? '0.45' : '1')};
  box-shadow: ${(props) =>
    props.state === 'hover' ? '0px 4px 12px 0px rgba(216, 88, 136, 0.25)' : 'none'};
`;

const ImageWrapper = styled.img<Button02Props>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
`;

export default Button02;


// 고파스 통합 전 Join 버튼
// function Button02(props: Button02Props) {
//   const { children = 'Join!', variant = 'solid', state = 'default', ...rest } = props;
//   return (
//     <ButtonWrapper variant={variant} state={state} {...rest}>
//       <ImageWrapper
//         src={
//           (variant === 'solid' && state === 'pressed') || (variant === 'outline' && state !== 'pressed')
//             ? '../../designImage/ButtonIconPink.svg'
//             : '../../designImage/ButtonIconWhite.svg'
//         }
//       />
//       <Typography
//         bold="500"
//         color={
//           (variant === 'solid' && state === 'pressed') || (variant === 'outline' && state !== 'pressed')
//             ? '#D85888'
//             : '#FFF'
//         }
//       >
//         {children}
//       </Typography>
//     </ButtonWrapper>
//   );
// }

// const ButtonWrapper = styled.button<Button02Props>`
//   width: fit-content;
//   height: fit-content;
//   box-sizing: border-box;
//   border: ${(props) =>
//     props.variant === 'outline' && (props.state === 'default' || props.state === 'disabled')
//       ? '1px solid #D85888'
//       : 'none'};
//   padding: 1.25vw 1.77vw;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   gap: 0.42vw;
//   border-radius: 0.52vw;
//   background: ${(props) =>
//     props.variant === 'solid' && props.state === 'hover'
//       ? 'rgba(216, 88, 136, 0.75)'
//       : (props.variant === 'solid' && props.state === 'pressed') ||
//         (props.variant === 'outline' && props.state === 'hover')
//       ? 'rgba(216, 88, 136, 0.10)'
//       : props.variant === 'outline' && (props.state === 'default' || props.state === 'disabled')
//       ? 'none'
//       : '#D85888'};
//   opacity: ${(props) => (props.state === 'disabled' ? '0.45' : '1')};
//   box-shadow: ${(props) =>
//     props.variant === 'solid' && props.state === 'hover' ? '0px 4px 12px 0px rgba(216, 88, 136, 0.25)' : 'none'};
// `;

// const ImageWrapper = styled.img`
//   width: 1.04vw;
//   height: 1.04vw;
// `;
