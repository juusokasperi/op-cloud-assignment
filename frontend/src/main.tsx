import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import './index.css';
import App from './App.js';

interface AppConfig {
  apiUrl: string;
}

declare global {
  interface Window {
    APP_CONFIG: AppConfig;
  }
}

async function main() {
  try {
    let config: AppConfig;
    //console.log('Fetching configuration..');
    const response = await fetch('/config.json');
    if (!response.ok) {
      //console.log(`Failed to fetch 'config.json', defaulting apiUrl to http://localhost:3000`);
      config = { apiUrl: 'http://localhost:3000' };
    }
    else {
      config = await response.json();
    }
    //console.log('Configuration loaded:', config);
    window.APP_CONFIG = config;

    const container = document.getElementById('root');
    if (!container)
      throw new Error('Root element not found in DOM');
    const root = createRoot(container);
    root.render(
      <StrictMode>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </StrictMode>,
    );
  } catch (error) {
    console.error('Failed to load config:', error);
    const container = document.getElementById('root');
    if (container) {
      const root = createRoot(container);
      root.render(<h1>Error: Could not load app configuration. Please try again later.</h1>);
    }
  }
}

main();
