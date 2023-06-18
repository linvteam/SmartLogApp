import { InjectionToken } from '@angular/core';

/**
 * Token per il dependency injector che rappresenta l'URL per raggiungere il backend
 */
export const BaseURL = new InjectionToken<string>('Url relativo al backend');