import styled from 'styled-components';

export const ContainerDiv = styled.div`
	background-color: ${({ theme }) => theme.colors.background };
	width: 60vw;
	max-width: 50vw;
	min-height: 100vh;
	margin: 0 auto;
	box-sizing: border-box;
	flex-wrap: wrap;
	display: block;
	text-align: center;
	font-family: ${({ theme }) => theme.font };
	color: ${({ theme }) => theme.colors.text };
`

export const Link = styled.a`
  color: white;
  text-decoration: underline;

  will-change: filter;
  transition: filter 300ms;

  &:hover {
	filter: drop-shadow(0 0 0.5em ${({ theme }) => theme.colors.secondary });
  }
`
export const Footer = styled.div`
  padding-top: 1em;
  padding-bottom: 0.25em;
`
