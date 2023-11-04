import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { categories } from 'src/app/constants/categories';
import { ICATEGORY } from 'src/app/models/CATEGORY';
import { ITASK } from 'src/app/models/TASK';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent {
  constructor(public categoriesService: CategoriesService){}
  //@ts-ignore
  selectedCategory: ICATEGORY;
  @Output() newTask = new EventEmitter<ITASK>();
  taskForm = new FormGroup({
    body: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5)],
    }),
    category: new FormControl<ICATEGORY>(
      {
        label: 'Completed',
        background: '#4CAF50',
      },
      {
        nonNullable: true,
      }
    ),
  });
  selectCategory(item: ICATEGORY) {
    this.selectedCategory = item;
    this.taskForm.patchValue({ category: item });
    console.log(this.taskForm.value)
  }
  handleSubmit() {
    const task = { ...this.taskForm.getRawValue(), completed: false };
    console.log(task)
    this.newTask.emit(task);
    this.taskForm.reset();
  }
}
