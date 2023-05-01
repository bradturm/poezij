import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { Trans } from 'react-i18next';
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

import './css/index.css';
import { AppProvider } from "./context/AppContext";
import App from './App';

import { accountService } from './services/account-service';

import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === 'production') disableReactDevTools();

// attempt silent token refresh before startup
accountService.refreshToken().finally(startApp);

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'fy', 'nl'],
    fallbackLng: 'en',
    debug: false,
    // Options for language detector
    detection: {
      order: ['path', 'cookie', 'htmlTag'],
      caches: ['cookie'],
    },
    // react: { useSuspense: false },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },
  })

const loadingMarkup = (
  <div>
    <Trans
      i18nKey="index_loading" />
  </div>
)

const root = ReactDOM.createRoot(document.getElementById('root'));

function startApp() {
  root.render(
    <Suspense fallback={loadingMarkup}>
      <React.StrictMode>
        <AppProvider>
          <App />
        </AppProvider>
      </React.StrictMode>
    </Suspense>
  );

}
