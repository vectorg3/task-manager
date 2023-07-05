import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'task-manager';
  darkMode = false;
  constructor() {
    const localTheme = localStorage.getItem('dark-theme');
    if (localTheme) {
      this.darkMode = JSON.parse(localTheme);
      document.documentElement.setAttribute(
        'data-theme',
        this.darkMode ? 'dark' : 'light'
      );
    }
  }
  modeToggle() {
    this.darkMode = !this.darkMode;
    document.documentElement.setAttribute(
      'data-theme',
      this.darkMode ? 'dark' : 'light'
    );
    localStorage.setItem('dark-theme', JSON.stringify(this.darkMode));
  }
}
