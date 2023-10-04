import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as UserActions from './actions';
import { catchError, map, mergeMap, of } from "rxjs";
import { AdminService } from "../admin-service/admin.service";

@Injectable()
export class UserEffects{


  getUsers$ = createEffect(()=>
    this.action$.pipe(
      ofType(UserActions.getUsers),
      mergeMap(() =>{
        return this.adminService
        .getAllStudent()
        .pipe(
          map(users => UserActions.getUsersSuccess({users})),
          catchError(error => of(UserActions.getUsersFailure({error: error.message})))
        );
      })
    )
  );

  createUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.createUser), // Replace with your specific action type
      mergeMap(({ user }) => {
        return this.adminService.addStudent(user).pipe(
          map(user => UserActions.createUserSuccess( user )),
          catchError(error => of(UserActions.createUserFailure({ error: error.message })))
        );
      })
    )
  );


  updateUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.updateUser),
      mergeMap(({ userId, user }) =>
        this.adminService.updateStudent(userId, user).pipe(
          map(() => UserActions.updateUserSuccess({ user })),
          catchError((error) => of(UserActions.updateUserFailure({ error: error.message })))
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.deleteUser),
      mergeMap(({ userId }) =>
        this.adminService.deleteStudent(userId).pipe(
          map(() => UserActions.deleteUserSuccess({ userId })),
          catchError((error) => of(UserActions.deleteUserFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(
    private action$ : Actions,
    private adminService: AdminService
  ){}
}
