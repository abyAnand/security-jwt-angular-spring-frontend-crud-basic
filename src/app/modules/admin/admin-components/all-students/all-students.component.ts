import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.scss']
})
export class AllStudentsComponent implements OnInit{

  students: any;

  ngOnInit(): void {
      this.getAllUsers();
  }

  constructor(
    private service: AdminService,
    private snackBar: MatSnackBar
  ){}

  getAllUsers(){
    this.service.getAllStudent().subscribe((res)=>{
      this.students = res;
      console.log(res);
    });
  }

  deleteStudent(studentId: number){

    console.log(studentId);
    this.service.deleteStudent(studentId).subscribe((res)=>{
      console.log(res);
      this.getAllUsers();
      this.snackBar.open("Student deleted Successfully", "Close", {duration: 5000});
    });
  }

}
