import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { TasksService } from 'src/app/services/tasks.service';
import { Toast } from 'src/app/utils/Toast';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  constructor(
    private authService: AuthService,
    private taskService: TasksService
  ) {}

  @Output() successAuth = new EventEmitter<boolean>();
  authForm = new FormGroup({
    userName: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  authError: string = '';

  handleSubmit(type: 'login' | 'sign up') {
    switch (true) {
      case type == 'login':
        this.authService.Login(this.authForm.getRawValue()).subscribe({
          next: (res) => {
            this.authService.user$.next(res);
            this.authService.isUserAuthenticated$.next(true);
            this.authService.SaveToken(res.token);
            Toast.fire({
              title: 'Success auth',
              icon: 'success',
            });
            if (
              this.taskService.tasks$.value.length !== 0 &&
              !this.taskService.isTasksEquals()
            ) {
              Swal.fire({
                text: 'Your local and cloud tasks are different. Do you want to overwrite your local tasks?(In that case local tasks will be erased)',
                showConfirmButton: true,
                showDenyButton: true,
                confirmButtonText: 'Overwrite',
                denyButtonText: 'Do not overwrite',
                allowOutsideClick: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire('Local tasks was rewrited', '', 'success');
                  this.taskService.tasks$.next(res.tasks);
                } else if (result.isDenied) {
                  this.taskService
                    .SyncTasksWithServer(this.taskService.tasks$.value)
                    .subscribe(() => {
                      Swal.fire('Local tasks saved', '', 'success');
                    });
                }
              });
            } else {
              this.taskService.tasks$.next(res.tasks);
            }
          },
          error: (err) => {
            this.authError = err.error.msg;
          },
        });
        break;
      case type == 'sign up':
        let user = {
          userName: this.authForm.getRawValue().userName,
          password: this.authForm.getRawValue().password,
          tasks: this.taskService.tasks$.value,
        };
        this.authService.SignUp(user).subscribe({
          next: (res) => {
            this.authService.user$.next(res);
            this.authService.isUserAuthenticated$.next(true);
            this.authService.SaveToken(res.token);
            Toast.fire({
              title: 'Success sign up',
              icon: 'success',
            });
          },
          error: (err) => {
            this.authError = err.error.msg;
          },
        });
        break;

      default:
        break;
    }
  }
}
