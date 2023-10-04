import { createReducer, on } from '@ngrx/store';
import { UserStateInterface } from '../../../Store/types/UserState.interface';
import * as UserActions from './actions';

export const initialState: UserStateInterface = {
  isLoading: false,
  users: [],
  error: null
};

export const reducers = createReducer(
  initialState,

  // get all users
  on(UserActions.getUsers, (state) =>({
    ...state,
    isLoading: true
  })),
  on(UserActions.getUsersSuccess, (state, action) =>({
    ...state,
    isLoading: false,
    users: action.users
  })),
  on(UserActions.getUsersFailure, (state, action) =>({
    ...state,
    isLoading: false,
    error: action.error
  })),

  //create user

  on(UserActions.createUser,(state) =>({
    ...state,
    isLoading: true
  })),

  on(UserActions.createUserSuccess, (state, action) =>({
    ...state,
    isLoading:false,
    users: [...state.users, action.user]
  })),

  on(UserActions.createUserFailure, (state, action) =>({
    ...state,
    isLoading: false,
    error: action.error
  })),

  //update user


  on(UserActions.updateUser, (state) =>({
    ...state,
    isLoading: true
  })),

  on(UserActions.updateUserSuccess, (state, action) =>({
    ...state,
    isLoading: false,
    users: state.users.map((user) => (user.userId === action.user.userId ? action.user : user))
  })),

  on(UserActions.updateUserFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error
  })),


  // delete user

  on(UserActions.deleteUser, (state) => ({
    ...state,
    isLoading : true
  })),

  on(UserActions.createUserSuccess, (state, action) =>({
    ...state,
    isLoading : false,
    users: state.users.filter((user) => user.userId ! == action.user.userId)
  })),

  on(UserActions.deleteUserFailure, (state, action) =>({
    ...state,
    isLoading: false,
    error: action.error
  }))

  )
