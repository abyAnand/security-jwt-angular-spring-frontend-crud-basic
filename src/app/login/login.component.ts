import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../auth/services/storage/storage.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;

constructor(private service: AuthService,
            private fb: FormBuilder,
            private router: Router,
            private snackBar: MatSnackBar) {

}

    ngOnInit(): void {
        this.loginForm = this.fb.group({
          email:['', Validators.required],
          password:['',Validators.required]

        })
    }

    login(){
      console.log(this.loginForm.value);
      this.service.login(
        this.loginForm.get(['email'])!.value,
        this.loginForm.get(['password'])!.value
        ).subscribe((response)=>{
        console.log(response);
        if(StorageService.isAdminLoggedIn()){
          this.router.navigateByUrl("admin/dashboard");
        }else if(StorageService.isStudentLoggedIn()){
          const userId = StorageService.getUserId();
          this.router.navigateByUrl("student/dashboard");
        }
      }),
      error => {
        if(error.status == 406){
          this.snackBar.open("User is not Active", "Close",{
            duration: 5000
          });
        }else{
          this.snackBar.open("Bad Credentials", "Close",{
            duration: 5000
          });
        }
      }
    }



}
