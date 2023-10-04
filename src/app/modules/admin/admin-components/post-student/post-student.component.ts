import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin-service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/Store/types/appState.interface';
import * as UserActions from '../../Store/actions';

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
        checkPassword: ['', Validators.required,  this.confirmationValidator],
        // dob: ['', Validators.required],
        address: ['', Validators.required],
        role: ['', Validators.required],

      })
  }

  confirmationValidator = async (control : FormControl): Promise<{[s: string]: boolean}> =>{
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
    private snackBar: MatSnackBar,
    private store: Store<AppStateInterface>
  ){}

  isSpinning: boolean;

  validateForm: FormGroup

  ROLE: string[] = [
    "ADMIN", "USER"
  ]


  postStudent(){
    console.log(this.validateForm.value);
    console.log(this.validateForm.enabled);

    this.isSpinning = false;
    this.store.dispatch(UserActions.createUser({user: this.validateForm.value}));

  }



}
