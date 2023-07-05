import { animate, style, transition, trigger } from '@angular/animations';

const enterTransition = transition(':enter', [
  style({ position: 'relative', top: -100, opacity: 0 }),
  animate('0.5s linear', style({ position: 'relative', top: 0, opacity: 1 })),
]);
const exitTransition = transition(':leave', [
  style({ opacity: 1, position: 'relative', top: 0 }),
  animate('0.5s linear', style({ position: 'relative', top: -80, opacity: 0 })),
]);
export const fadeIn = trigger('fadeIn', [enterTransition]);
export const fadeOut = trigger('fadeOut', [exitTransition]);
