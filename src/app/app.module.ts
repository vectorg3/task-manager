import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ReactiveFormsModule } from '@angular/forms';
import { NewTaskComponent } from './components/new-task/new-task.component';
import { NewCategoryComponent } from './components/new-category/new-category.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NewTaskComponent,
    NewCategoryComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SweetAlert2Module.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
