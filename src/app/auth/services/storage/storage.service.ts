import { Injectable } from '@angular/core';

const USER = 'user';
const TOKEN = 'token';
const REFRESH = 'refresh';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public saveUser(user: any){
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  public saveToken(token: any){
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  public saveRefreshToken(refresh: any){
    window.localStorage.removeItem(REFRESH);
    window.localStorage.setItem(REFRESH, refresh);
  }

  static getToken(): string{
    return window.localStorage.getItem(TOKEN);
  }

  static getRefreshToken(): string{
    return window.localStorage.getItem(REFRESH);
  }

  static getUser(): any{
    return JSON.parse(localStorage.getItem(USER))
  }

  static hasToken(): boolean{
    if(this.getToken() === null){
      return false;
    }
    return true;
  }

  public static getUserId():string{
    const user = this.getUser();
    if( user == null){
      return '';
    }
    return user.userId;
  }

  static getUserRole(): string{
    const user = this.getUser();
    if( user == null){
      return '';
    }
    return user.role;
  }

  static isAdminLoggedIn(): boolean{
    if(this.getToken() == null){
      return false;
    }
    const role : string = this.getUserRole();
    return role == "ADMIN";

  }

  static isStudentLoggedIn(): boolean{
    if(this.getToken() == null){
      return false;
    }
    const role : string = this.getUserRole();
    return role == "USER";

  }

  static logout(){
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(REFRESH);
    window.localStorage.removeItem(USER);
  }
}
