import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() =>
      initializeApp({
        "projectId":"tesis-966c0",
        "appId":"1:885296703572:web:b27faea21b2fffd69ce5c1",
        "storageBucket":"tesis-966c0.appspot.com",
        "apiKey":"AIzaSyB19QYGsjDawcHnUPYIbytZyarHzOOPLf8",
        "authDomain":"tesis-966c0.firebaseapp.com",
        "messagingSenderId":"885296703572"
      })),
      provideStorage(() => getStorage())
  ]
};
