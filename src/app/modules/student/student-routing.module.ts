import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './student-components/dashboard/dashboard.component';
import { studentGuard } from 'src/app/auth/guards/student-guard/student.guard';

const routes: Routes = [
  {path: "dashboard", component: DashboardComponent, canActivate: [studentGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
