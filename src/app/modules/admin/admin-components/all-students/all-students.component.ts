import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store, select } from '@ngrx/store';
import * as UserActions from '../../Store/actions';
import { errorSelector, isLoadingSelector, usersSelector } from '../../Store/selectors';
import { Observable } from 'rxjs';
import { AppStateInterface } from 'src/app/Store/types/appState.interface';
import { TheUser, User } from 'src/app/Model/data-type';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.scss']
})
export class AllStudentsComponent implements OnInit{

  isLoading$: Observable<boolean>;

  students: any;
  error$: Observable<string | null>;
  users$: Observable<TheUser[]>;

  ngOnInit(): void {
      this.getAllUsers();

  }

  constructor(
    private service: AdminService,
    private snackBar: MatSnackBar,
    private store: Store<AppStateInterface>
  ){
  }

  getAllUsers(){
    this.store.dispatch(UserActions.getUsers());
      this.isLoading$ = this.store.pipe(select(isLoadingSelector));
      this.error$ = this.store.pipe(select(errorSelector));
      this.users$ = this.store.pipe(select(usersSelector));
  }

  deleteStudent(userId: number) {
    // Dispatch the deleteStudent action
    this.store.dispatch(UserActions.deleteUser({ userId }));
    this.getAllUsers();
  }



}
