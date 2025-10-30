import github from '../../assets/github.svg'
import linkedin from '../../assets/linkedin.svg'
import { HeaderWrapper, LogoElement, Icon, Link, IconWrapper } from './styled.ts'

const Header = () => {
	return (
    <>
    <HeaderWrapper>
      <LogoElement>
        <Link href="https://www.github.com/juusokasperi" target="_blank">
          Juuso Rinta {"</>"} Portfolio
        </Link>
       </LogoElement>
    </HeaderWrapper>
      <IconWrapper>
        <Link href="https://www.github.com/juusokasperi" target="_blank">
          <Icon src={github} alt="Github" $size="2em" $duration="2s" $delay="0.5s"/>
        </Link>
        <Link href="https://linkedin.com/in/juuso-rinta/" target="_blank">
          <Icon src={linkedin} alt="Linkedin" $size="2em" $duration="3s" $delay="0.25s"/>
        </Link>
      </IconWrapper>
    </>
	);
};

export default Header;
