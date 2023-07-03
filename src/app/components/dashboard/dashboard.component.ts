import { Component, ViewChild } from '@angular/core';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { categories } from 'src/app/constants/categories';
import { filters } from 'src/app/constants/filters';
import { ICATEGORY } from 'src/app/models/CATEGORY';
import { ITASK } from 'src/app/models/TASK';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  @ViewChild('newTaskSwal')
  public newTaskSwal!: SwalComponent;
  categories: ICATEGORY[] = categories;
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
  filteredTasks: ITASK[] = this.tasks;
  filters: string[] = filters;
  selectedFilter: string = 'All';
  constructor(public readonly swalTargets: SwalPortalTargets) {}
  addTask(task: ITASK) {
    this.tasks.unshift(task);
    this.newTaskSwal.close();
  }
  changeStatus(task: ITASK) {
    this.tasks = this.tasks.map((item) => {
      if (item == task) {
        item.completed = !item.completed;
      }
      return item;
    });
    this.filteredTasks = this.tasks;
  }
  clearCompleted() {
    this.tasks = this.tasks.filter((item) => item.completed !== true);
    this.filteredTasks = this.tasks;
  }
  changeFilter(filter: string) {
    this.selectedFilter = filter;
    switch (filter) {
      case 'All':
        this.filteredTasks = this.tasks;
        break;
      case 'Active':
        this.filteredTasks = this.tasks.filter(
          (item) => item.completed == false
        );
        console.log(this.tasks);
        break;
      case 'Completed':
        this.filteredTasks = this.tasks.filter(
          (item) => item.category.label == 'Completed'
        );
        break;
      default:
        break;
    }
  }
}
