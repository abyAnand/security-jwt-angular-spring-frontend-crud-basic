import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { combineLatest } from 'rxjs';
import { DashboardComponent } from './admin-components/dashboard/dashboard.component';
import { adminGuard } from 'src/app/auth/guards/admin-guard/admin.guard';
import { PostStudentComponent } from './admin-components/post-student/post-student.component';
import { AllStudentsComponent } from './admin-components/all-students/all-students.component';
import { UpdateStudentComponent } from './admin-components/update-student/update-student.component';

const routes: Routes = [
  {path: "dashboard", component: DashboardComponent, canActivate: [adminGuard]},
  {path: "student", component: PostStudentComponent, canActivate: [adminGuard]},
  {path: "students", component: AllStudentsComponent, canActivate: [adminGuard]},
  {path: "student/:studentId", component: UpdateStudentComponent, canActivate: [adminGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
