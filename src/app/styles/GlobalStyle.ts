import { createGlobalStyle } from 'styled-components';
import { designTokens } from './tokens';

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    min-height: 100vh;
    margin: 0;
    background: ${designTokens.colors.background};
    color: ${designTokens.colors.text};
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  button,
  input,
  textarea {
    font: inherit;
  }

  #root {
    min-height: 100vh;
  }
`;

export { GlobalStyle };
