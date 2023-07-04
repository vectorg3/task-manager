import { Injectable } from '@angular/core';
import { ICATEGORY } from '../models/CATEGORY';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  categories: ICATEGORY[] = [
    {
      label: 'Completed',
      background: '#4CAF50',
    },
    {
      label: 'Urgent',
      background: '#FF5252',
    },
    {
      label: 'Important',
      background: '#FFC107',
    },
    {
      label: 'Later',
      background: '#9C27B0',
    },
    {
      label: 'To study',
      background: '#25A7B8',
    },
  ];
  constructor() {}
  getAll(): Observable<ICATEGORY[]> {
    return of(this.categories);
  }
  addNew(category: ICATEGORY) {
    this.categories.push(category);
  }
}
