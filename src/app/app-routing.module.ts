import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { noAuthGuard } from './auth/guards/noAuth-guard/no-auth.guard';

const routes: Routes = [
  {path: "login", component: LoginComponent, canActivate: [noAuthGuard]},
  {path:"admin", loadChildren: () => import("./modules/admin/admin.module").then(m => m.AdminModule)},
  {path:"student", loadChildren: () => import("./modules/student/student.module").then(s => s.StudentModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
