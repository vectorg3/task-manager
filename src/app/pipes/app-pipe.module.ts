import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITASK } from '../models/TASK';

@Pipe({ name: 'filterTasks'})
export class FilterTasks implements PipeTransform {
  constructor(){}

  transform(dataSource: ITASK[], activeFilter: string) {
    let result = dataSource;

    switch (activeFilter) {
      case 'All':
        return result
        break;
      case 'Active':
        result = result.filter((task) => task.completed == false)
        return result;
        break;
      case 'Completed':
        result = result.filter((task) => task.completed == true)
        return result;
        break;
      default:
        return result
        break;
    }
  }
}

@NgModule({
  declarations: [FilterTasks],
  imports: [
    CommonModule
  ],
  exports:[FilterTasks]
})
export class AppPipeModule { }
