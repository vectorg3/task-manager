import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
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
  @ViewChild('authSwal')
  public authSwal!: SwalComponent;
  public showTasks: boolean = false;
  filters: string[] = filters;
  selectedFilter: string = 'All';
  constructor(
    public readonly swalTargets: SwalPortalTargets,
    public tasksService: TasksService,
    public categoriesService: CategoriesService
  ) {
  }
  ngOnInit() {
    setTimeout(() => {
      this.showTasks = true;
    }, 300);
  }
  addTask(task: ITASK) {
    this.tasksService.addTask(task);
    this.newTaskSwal.close();
    this.changeFilter('All');
  }
  clearCompleted() {
    this.tasksService.clearCompleted();
    this.changeFilter('All');
  }
  changeFilter(filter: string) {
    this.selectedFilter = filter;
  }
  addCategory(category: ICATEGORY) {
    this.categoriesService.addNew(category);
    this.newCategorySwal.close();
  }
}
