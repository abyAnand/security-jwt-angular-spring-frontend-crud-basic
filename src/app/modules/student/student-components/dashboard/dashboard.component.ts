import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../student-service/student.service';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

   userIdString = StorageService.getUserId();
   studentId = parseFloat(this.userIdString);


  validateForm: FormGroup;
  isSpinning: boolean;

  ngOnInit(): void {
      this.getStudentById();

      this.validateForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        address: ['', Validators.required]

      })
  }

  constructor(
    private service:StudentService,
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
