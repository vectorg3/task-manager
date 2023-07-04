import { Injectable } from '@angular/core';
import { ITASK } from '../models/TASK';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks: ITASK[] = [
    {
      completed: true,
      body: 'Memorize the fifty states and their capitals',
      category: {
        label: 'Completed',
        background: '#4CAF50',
      },
    },
    {
      completed: true,
      body: 'Memorize the fifty states and their capitals',
      category: {
        label: 'Urgent',
        background: '#FF5252',
      },
    },
    {
      completed: true,
      body: 'Memorize the fifty states and their capitals',
      category: {
        label: 'Important',
        background: '#FFC107',
      },
    },
    {
      completed: true,
      body: 'Memorize the fifty states and their capitals',
      category: {
        label: 'Later',
        background: '#9C27B0',
      },
    },
    {
      completed: true,
      body: 'Memorize the fifty states and their capitals',
      category: {
        label: 'To study',
        background: '#25A7B8',
      },
    },
  ];
  constructor() {}
  getAll(): Observable<ITASK[]> {
    return of(this.tasks);
  }
  addTask(task: ITASK) {
    this.tasks.unshift(task);
  }
  clearCompleted(): Observable<ITASK[]> {
    this.tasks = this.tasks.filter((item) => item.completed !== true);
    return of(this.tasks);
  }
  changeStatus(task: ITASK): Observable<ITASK[]> {
    this.tasks = this.tasks.map((item) => {
      if (item == task) {
        item.completed = !item.completed;
      }
      return item;
    });
    return of(this.tasks);
  }
}
