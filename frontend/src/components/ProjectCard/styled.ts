import styled from 'styled-components';

interface ElementProps {
  $padbottom?: string;
  $padtop?: string;
}

export const ProjectImg = styled.img`
  max-width: 50%;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 20px;
`

export const ProjectDiv = styled.div`
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 0px;
  display: block;
  position: relative;

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 10px;
    left: 50%;
    width: 100%;
    height: 0;
    border-top: 1px solid ${({ theme }) => theme.colors.lightAccent };
    transform: translateX(-50%);
  }
`;

export const LogoWrapper = styled.div`
  padding-top: 1em;
  padding-bottom: 2em;
  width: 100%;
  flex-wrap: wrap;
`;

export const Element = styled.div<ElementProps>`
  margin: 0 auto;
  vertical-align: middle;
  padding-top: ${({ $padtop }) => $padtop || '0' };
  padding-bottom: ${({ $padbottom }) => $padbottom || '0'};
`;

export const Title = styled.div`
  font-size: ${({ theme }) => theme.titleSize };
  font-weight: bold;
  margin: 0;
  vertical-align: middle;
`;

export const Link = styled.a`
  color: white;
  text-decoration: underline;

  will-change: filter;
  transition: filter 300ms;

  &:hover {
	filter: drop-shadow(0 0 0.5em ${({ theme }) => theme.colors.secondary });
  }
`
