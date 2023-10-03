import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { StorageService } from '../storage/storage.service';

const URL = ['http://localhost:8082/api/v1/auth/']
export const AUTH_HEADER = 'authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor(private http: HttpClient,
              private storage: StorageService) { }

  login(email: string, password: string):Observable<any>{
    return this.http.post(URL+'authenticate', {
      email,
      password
    }, {observe: 'response'})
    .pipe(
      tap(__ => this.log("User Authentication")),
      map((res:HttpResponse<any>)=>{
        console.log(res);
        this.storage.saveToken(res.body.access_token);
        this.storage.saveUser(res.body.user)
        this.storage.saveRefreshToken(res.body.refresh_token);

        return res;
      })
    )
  }

  log(message: string){
    console.log(message)
  }

  logout(){
    this.http.get(`${URL}logout`);
  }
}
