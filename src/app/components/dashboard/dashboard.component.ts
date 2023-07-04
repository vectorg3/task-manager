import { Component, ViewChild } from '@angular/core';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { Observable, map } from 'rxjs';
import { categories } from 'src/app/constants/categories';
import { filters } from 'src/app/constants/filters';
import { ICATEGORY } from 'src/app/models/CATEGORY';
import { ITASK } from 'src/app/models/TASK';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  @ViewChild('newTaskSwal')
  public newTaskSwal!: SwalComponent;
  categories: ICATEGORY[] = categories;
  tasks$!: Observable<ITASK[]>;
  filteredTasks$: Observable<ITASK[]> = this.tasks$;
  filters: string[] = filters;
  selectedFilter: string = 'All';
  constructor(
    public readonly swalTargets: SwalPortalTargets,
    private tasksService: TasksService
  ) {
    this.tasks$ = this.tasksService.getAll();
    this.filteredTasks$ = this.tasks$;
  }
  addTask(task: ITASK) {
    this.tasksService.addTask(task);
    this.newTaskSwal.close();
    this.changeFilter('All');
  }
  changeStatus(task: ITASK) {
    this.tasksService.changeStatus(task);
    this.filteredTasks$ = this.tasks$;
  }
  clearCompleted() {
    this.tasks$ = this.tasksService.clearCompleted();
    this.filteredTasks$ = this.tasks$;
  }
  changeFilter(filter: string) {
    this.selectedFilter = filter;
    switch (filter) {
      case 'All':
        this.filteredTasks$ = this.tasks$;
        break;
      case 'Active':
        this.filteredTasks$ = this.tasks$.pipe(
          map((items) => items.filter((item) => item.completed == false))
        );
        break;
      case 'Completed':
        this.filteredTasks$ = this.tasks$.pipe(
          map((items) => items.filter((item) => item.completed == false))
        );
        break;
      default:
        break;
    }
  }
}
