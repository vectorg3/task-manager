import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { categories } from 'src/app/constants/categories';
import { ICATEGORY } from 'src/app/models/CATEGORY';
import { ITASK } from 'src/app/models/TASK';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent {
  categories: ICATEGORY[] = categories;
  selectedCategory: number = 0;
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
  selectCategory(index: number) {
    this.selectedCategory = index;
    this.taskForm.patchValue({ category: categories[index] });
  }
  handleSubmit() {
    const task = { ...this.taskForm.getRawValue(), completed: false };
    this.newTask.emit(task);
    this.taskForm.reset();
  }
}
