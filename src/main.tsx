import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Provider } from '@/components/ui/provider.tsx';
import { CookiesProvider } from 'react-cookie';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CookiesProvider>
      <Provider>
        <App />
      </Provider>
    </CookiesProvider>
  </StrictMode>
);
