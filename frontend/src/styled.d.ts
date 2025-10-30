import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      buttonBg: string;
      secondary: string;
      accent: string;
      background: string;
      lightAccent: string;
      text: string;
    };
    font: string;
    fontSize: string;
  }
}
