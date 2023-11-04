import { Component, ViewChild } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthService } from './services/auth.service';
import { TasksService } from './services/tasks.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('userSwal')
  public userSwal!: SwalComponent;
  @ViewChild('authSwal')
  public authSwal!: SwalComponent;
  title = 'task-manager';
  darkMode = false;
  constructor(
    public authService: AuthService,
    private tasksService: TasksService
  ) {
    const localTheme = localStorage.getItem('dark-theme');
    if (localTheme) {
      this.darkMode = JSON.parse(localTheme);
      document.documentElement.setAttribute(
        'data-theme',
        this.darkMode ? 'dark' : 'light'
      );
    }
  }
  ngOnInit() {
    if(this.authService.GetToken()){
      this.authService.AuthUserByToken().subscribe((res) => {
        this.authService.user$.next(res);
        this.authService.isUserAuthenticated$.next(true);
        this.tasksService.saveTasks(res.tasks);
      })
    }
    // this.authService.isUserAuthenticated$.subscribe(() => {
    //   this.au
    // })
  }
  modeToggle() {
    this.darkMode = !this.darkMode;
    document.documentElement.setAttribute(
      'data-theme',
      this.darkMode ? 'dark' : 'light'
    );
    localStorage.setItem('dark-theme', JSON.stringify(this.darkMode));
  }
  logout() {
    this.authService.Logout()
    this.tasksService.Logout()
    this.userSwal.close()
  }
}
