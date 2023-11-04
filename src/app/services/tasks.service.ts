import { Injectable } from '@angular/core';
import { ITASK } from '../models/TASK';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { url } from 'src/environment/environment';
import { Toast } from '../utils/Toast';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks$: BehaviorSubject<ITASK[]> = new BehaviorSubject<ITASK[]>([]);
  constructor(private http: HttpClient, private authService: AuthService) {
    const localTasks = localStorage.getItem('tasks');
    if (localTasks !== null) {
      this.tasks$.next(JSON.parse(localTasks));
    }
  }
  saveTasks(tasks: ITASK[]) {
    if (this.authService.isUserAuthenticated$.value) {
      this.SyncTasksWithServer(tasks).subscribe({
        next: () => {
          this.tasks$.next(tasks);
        },
        error: (err) => {
          Toast.fire({
            title: err.error.msg,
            icon: 'error',
          });
        },
      });
    }else{
      this.tasks$.next(tasks);
      localStorage.setItem('tasks', JSON.stringify(this.tasks$.value));
    }
  }
  addTask(task: ITASK) {
    let tasks = this.tasks$.value;
    tasks.unshift(task);
    this.saveTasks(tasks);
  }
  clearCompleted() {
    let tasks = this.tasks$.value;
    tasks = tasks.filter((item) => item.completed !== true);
    this.saveTasks(tasks);
  }
  changeStatus(task: ITASK) {
    let tasks = this.tasks$.value;
    tasks = tasks.map((item) => {
      if (item == task) {
        item.completed = !item.completed;
      }
      return item;
    });
    this.saveTasks(tasks);
  }
  
  SyncTasksWithServer(tasks: ITASK[]) {
    return this.http.put(url + 'tasks', tasks);
  }

  public isTasksEquals(){
    let tasks: ITASK[] = JSON.parse(JSON.stringify(this.tasks$.value));
    let userTasks: ITASK[] = JSON.parse(JSON.stringify(this.authService.user$.value?.tasks))
    return(JSON.stringify(tasks) === JSON.stringify(userTasks))
  }

  public Logout() {
    const localTasks = localStorage.getItem('tasks');
    if (localTasks !== null) {
      this.tasks$.next(JSON.parse(localTasks));
    }else this.tasks$.next([]);
  }
}
