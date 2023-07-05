import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { Observable, map } from 'rxjs';
import { filters } from 'src/app/constants/filters';
import { ICATEGORY } from 'src/app/models/CATEGORY';
import { ITASK } from 'src/app/models/TASK';
import { CategoriesService } from 'src/app/services/categories.service';
import { TasksService } from 'src/app/services/tasks.service';
import { fadeIn, fadeOut } from './animations/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [fadeIn, fadeOut],
})
export class DashboardComponent {
  @ViewChild('newTaskSwal')
  public newTaskSwal!: SwalComponent;
  @ViewChild('newCategorySwal')
  public newCategorySwal!: SwalComponent;
  categories$!: Observable<ICATEGORY[]>;
  tasks$!: Observable<ITASK[]>;
  filteredTasks$: Observable<ITASK[]> = this.tasks$;
  filters: string[] = filters;
  selectedFilter: string = 'All';
  constructor(
    public readonly swalTargets: SwalPortalTargets,
    private tasksService: TasksService,
    private categoriesService: CategoriesService
  ) {
    this.tasks$ = this.tasksService.getAll();
    this.filteredTasks$ = this.tasks$;
    this.categories$ = this.categoriesService.getAll();
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
          map((items) => items.filter((item) => item.completed == true))
        );
        break;
      default:
        break;
    }
  }
  addCategory(category: ICATEGORY) {
    this.categoriesService.addNew(category);
    this.newCategorySwal.close();
  }
}
