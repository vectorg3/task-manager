import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { categories } from 'src/app/constants/categories';
import { colors } from 'src/app/constants/colors';
import { ICATEGORY } from 'src/app/models/CATEGORY';
import { ITASK } from 'src/app/models/TASK';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss'],
})
export class NewCategoryComponent {
  colors: string[] = colors;
  selectedColor: number = 0;
  @Output() newCategory = new EventEmitter<ICATEGORY>();
  categoryForm = new FormGroup({
    label: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    background: new FormControl<string>('', {
      nonNullable: true,
    }),
  });
  selectColor(index: number) {
    this.selectedColor = index;
    this.categoryForm.patchValue({ background: this.colors[index] });
  }
  handleSubmit() {
    this.newCategory.emit(this.categoryForm.getRawValue());
    this.categoryForm.reset();
  }
}
