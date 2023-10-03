import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.scss']
})
export class UpdateStudentComponent implements OnInit{

  studentId: number = this.activatedRoute.snapshot.params['studentId']

  validateForm: FormGroup;
  isSpinning: boolean;

  ROLE: string[] = [
    "ADMIN", "USER"
  ]

  ngOnInit(): void {
      this.getStudentById();

      this.validateForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        // dob: ['', Validators.required],
        address: ['', Validators.required],
        role: ['', Validators.required],

      })
  }

  constructor(
    private service:AdminService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ){}


  getStudentById(){
    console.log(this.studentId);
    this.service.getStudentById(this.studentId).subscribe((res)=>{
      this.validateForm.patchValue(res);
      console.log(res);
    })
  }

  updateStudent(){
    this.service.updateStudent(this.studentId, this.validateForm.value).subscribe((res)=>{
      console.log(res);

      if(res.userId != null){
        this.snackBar.open("Student Updated Successfully", "Close", {duration: 5000});
      }else{
        this.snackBar.open("Student not found", "Close", {duration: 5000});
      }

    });
  }

}
