import { Injectable } from '@angular/core';
import { ICATEGORY } from '../models/CATEGORY';
import { Observable, of } from 'rxjs';
import { categories } from '../constants/categories';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  categories: ICATEGORY[] = categories;
  constructor() {}
  getAll(): Observable<ICATEGORY[]> {
    return of(this.categories);
  }
  addNew(category: ICATEGORY) {
    this.categories.push(category);
  }
}
