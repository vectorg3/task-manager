import { Injectable } from '@angular/core';
import { ITASK } from '../models/TASK';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks: ITASK[] = [];
  constructor() {
    const localTasks = localStorage.getItem('tasks');
    console.log(localTasks);
    if (localTasks !== null) {
      this.tasks = JSON.parse(localTasks);
    }
  }
  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
  getAll(): Observable<ITASK[]> {
    return of(this.tasks);
  }
  addTask(task: ITASK) {
    this.tasks.unshift(task);
    this.saveTasks();
  }
  clearCompleted(): Observable<ITASK[]> {
    this.tasks = this.tasks.filter((item) => item.completed !== true);
    this.saveTasks();
    return of(this.tasks);
  }
  changeStatus(task: ITASK): Observable<ITASK[]> {
    this.tasks = this.tasks.map((item) => {
      if (item == task) {
        item.completed = !item.completed;
      }
      return item;
    });
    this.saveTasks();
    return of(this.tasks);
  }
}
