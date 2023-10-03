import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './admin-components/dashboard/dashboard.component';
import { PostStudentComponent } from './admin-components/post-student/post-student.component';


import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AllStudentsComponent } from './admin-components/all-students/all-students.component';
import { UpdateStudentComponent } from './admin-components/update-student/update-student.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PostStudentComponent,
    AllStudentsComponent,
    UpdateStudentComponent,

  ],
  imports: [
    CommonModule,
    MatDatepickerModule,
    AdminRoutingModule,
    MatCardModule,

    HttpClientModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule

  ]
})
export class AdminModule { }
