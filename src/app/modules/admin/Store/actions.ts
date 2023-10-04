import { createAction, props } from "@ngrx/store";
import { TheUser } from "src/app/Model/data-type";


// get all users

export const getUsers = createAction(
  '[USER] GET-ALL'
  );

export const getUsersSuccess = createAction(
  '[USER] GET-ALL SUCCESS',
  props<{users: TheUser[]}>()
  );

export const getUsersFailure = createAction(
  '[USER] GET-ALL FAIL',
  props<{error: string}>()
  );

// create user

export const createUser = createAction(
  '[USER] CREATE USER',
  props<{ user: TheUser }>()
);

export const createUserSuccess = createAction(
  '[USER] CREATE SUCCESS',
  props<{ user: TheUser }>()
);

export const createUserFailure = createAction(
  '[USER] CREATE FAIL',
  props<{ error: string }>()
);


//update user

export const updateUser = createAction(
  '[USER] UPDATE',
  props<{ userId: number; user: TheUser }>()
);

export const updateUserSuccess = createAction(
  '[USER] UPDATE SUCCESS',
  props<{ user: TheUser }>()
);

export const updateUserFailure = createAction(
  '[USER] UPDATE FAIL',
  props<{ error: string }>()
);



//delete user

export const deleteUser = createAction(
  '[USER] DELETE',
  props<{ userId: number }>()
);

export const deleteUserSuccess = createAction(
  '[USER] DELETE SUCCESS',
  props<{ userId: number }>()
);

export const deleteUserFailure = createAction(
  '[USER] DELETE FAIL',
  props<{ error: string }>()
);



