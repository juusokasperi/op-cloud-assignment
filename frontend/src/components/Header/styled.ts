import styled, { keyframes } from 'styled-components';

interface IconProps {
  $size?: string;
  $delay?: string;
  $duration?: string;
}

export const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  background: ${({ theme }) => theme.colors.background };
`

export const IconWrapper = styled.div`
  padding-top: 0em;
  padding-bottom: 2em;
  width: 100%;
`;

export const LogoElement = styled.div`
  padding-top: 1em;
  padding-bottom: 1em;
  width: 100%;
  font-size: 20px;
  text-align: center;
  margin: 0;
  vertical-align: middle;

  a {
    text-decoration: inherit;
  }
`;

const IconFlicker = keyframes`
  0%, 100% { opacity: 1; }
  95% { opacity: 1; }
  97% { opacity: 0.1; }
  98% { opacity: 1; }
  90% { opacity: 0.5; }
`;

export const Icon = styled.img<IconProps>`
  height: ${({ $size }) => $size || '1em '};
  filter: brightness(0) invert(1);
  padding-top: 0.25em;
  padding-left: 0.5em;
  padding-right: 0.5em;
  padding-bottom: 0em;
  will-change: filter;
  transition: filter 300ms;

  &:hover {
    filter: brightness(0) invert(1) drop-shadow(0 0 0.5em ${({ theme }) => theme.colors.secondary });
  }

  @media (prefers-reduced-motion: no-preference) {
    animation: ${IconFlicker} ${({ $duration }) => $duration || '2s' } ease-in-out infinite;
    animation-delay: ${({ $delay }) => $delay || '0s' };
  }
`;

export const Link = styled.a`
  color: white;
  text-decoration: inherit;

  will-change: filter;
  transition: filter 300ms;

  &:hover {
	filter: drop-shadow(0 0 0.5em ${({ theme }) => theme.colors.secondary });
  }
`
