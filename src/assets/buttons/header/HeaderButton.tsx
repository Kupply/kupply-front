import React from "react";
import styled from "styled-components";

const MailButtonWrapper = styled.button`
	transition: 0.25s ease-in-out;
	justify-content: center;
	align-items: center;
	padding: 8px 26px;
	border-radius: 6px;

	color: #141414;
	text-align: center;
	font-family: Pretendard;
	font-size: 20px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	text-transform: uppercase;

	&:hover:not(:disabled) {
		background: rgba(216, 88, 136, 0.1);

		color: #d85888;
		text-align: center;
		font-family: Pretendard;
		font-size: 20px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
		text-transform: uppercase;
	}

	&:disabled {
		cursor: not-allowed;
		color: #141414;
		text-align: center;
		font-family: Pretendard;
		font-size: 20px;
		font-style: normal;
		font-weight: 500;
		line-height: normal;
		text-transform: uppercase;
		opacity: 0.6;
	}

	&:active:not(:disabled) {
		background: none;
		color: #141414;
		text-align: center;
		font-family: Pretendard;
		font-size: 20px;
		font-style: normal;
		font-weight: 700;
		line-height: normal;
		text-transform: uppercase;
	}
`;

export default function HeaderButton(props: React.ComponentPropsWithoutRef<"button">) {
	return <MailButtonWrapper {...props}>{props.children}</MailButtonWrapper>;
}
