import { Injectable } from '@angular/core';
import { ICATEGORY } from '../models/CATEGORY';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { categories } from '../constants/categories';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  categories$: BehaviorSubject<ICATEGORY[]> = new BehaviorSubject<ICATEGORY[]>(categories);
  constructor() {}
  addNew(category: ICATEGORY) {
    this.categories$.next([...this.categories$.value, category]);
  }
}
