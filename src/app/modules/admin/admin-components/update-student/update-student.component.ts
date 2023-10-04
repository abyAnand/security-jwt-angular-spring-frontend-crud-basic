import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as UserActions from '../../Store/actions';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/Store/types/appState.interface';
import { isLoadingSelector, usersSelector } from '../../Store/selectors'; // Import your selectors

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.scss']
})
export class UpdateStudentComponent implements OnInit {
  studentId: number = this.activatedRoute.snapshot.params['studentId'];
  validateForm: FormGroup;
  isSpinning: any;

  ROLE: string[] = ["ADMIN", "USER"];

  constructor(
    private service: AdminService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private store: Store<AppStateInterface>
  ) {}

  ngOnInit(): void {
    this.getStudentById();

    this.validateForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  getStudentById() {
    console.log(this.studentId);
    this.service.getStudentById(this.studentId).subscribe((res) => {
      this.validateForm.patchValue(res);
      console.log(res);
    });
  }

  updateStudent() {

    this.store.dispatch(
      UserActions.updateUser({
        userId: this.studentId,
        user: this.validateForm.value,
      })
    );
  }
}
