import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin-service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-student',
  templateUrl: './post-student.component.html',
  styleUrls: ['./post-student.component.scss']
})
export class PostStudentComponent implements OnInit{

  ngOnInit(): void {
      this.validateForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        checkPassword: ['', Validators.required, this.confirmationValidator],
        // dob: ['', Validators.required],
        address: ['', Validators.required],
        role: ['', Validators.required],

      })
  }

  confirmationValidator = (control : FormControl): {[s: string]: boolean} =>{
    if(!control.value){
      return {requred: true};
    }else if(control.value !== this.validateForm.controls["password"].value){
      return {confirm: true, error: true};
    }
    return {};
  }

  constructor(
    private service: AdminService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ){}

  isSpinning: boolean;

  validateForm: FormGroup

  ROLE: string[] = [
    "ADMIN", "USER"
  ]


  postStudent(){
    console.log(this.validateForm.value);
    this.isSpinning = true;
    this.service.addStudent(this.validateForm.value).subscribe((res)=>{
      this.isSpinning = false;

      if(res.user.userId != null){
        this.snackBar.open("User Saved Successfully", "Close", {duration: 5000});
      }
      else{
        this.snackBar.open("Student already exist", "Close", {duration: 5000});
      }
      console.log(res);
    })
  }



}
