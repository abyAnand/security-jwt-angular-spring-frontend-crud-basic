import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

const URL = 'http://localhost:8082/';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient, private storage: StorageService) {}

  private addAuthorizationHeader(headers: HttpHeaders): HttpHeaders {
    return headers.set('Authorization', 'Bearer ' + StorageService.getToken());
  }

  private refreshToken(): Observable<any> {
    const refreshToken = StorageService.getRefreshToken();
    const refreshHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + refreshToken);

    return this.http.post<any>(`${URL}api/v1/auth/refresh-token`, {}, { headers: refreshHeaders });
  }

  private handle403ErrorAndRetry(requestFn: () => Observable<any>): Observable<any> {
    return this.refreshToken().pipe(
      switchMap((response: any) => {
        this.storage.saveToken(response.access_token);
        this.storage.saveRefreshToken(response.refresh_token);

        const headers = this.addAuthorizationHeader(new HttpHeaders());

        return requestFn();
      }),
      catchError(refreshError => {
        return throwError(refreshError);
      })
    );
  }

  addStudent(studentDto: any): Observable<any> {
    const headers = this.addAuthorizationHeader(new HttpHeaders());

    return this.http.post<any>(`${URL}api/admin/user`, studentDto, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          return this.handle403ErrorAndRetry(() =>
            this.http.post<any>(`${URL}api/admin/user`, studentDto, { headers })
          );
        } else {
          return throwError(error);
        }
      })
    );
  }

  getAllStudent(): Observable<any> {
    const headers = this.addAuthorizationHeader(new HttpHeaders());

    return this.http.get<[]>(`${URL}api/admin/users`, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          return this.handle403ErrorAndRetry(() =>
            this.http.get<any>(`${URL}api/admin/users`, { headers })
          );
        } else {
          return throwError(error);
        }
      })
    );
  }


  deleteStudent(studentId: any): Observable<any> {
    const headers = this.addAuthorizationHeader(new HttpHeaders());

    return this.http.delete<any>(`${URL}api/admin/users/${studentId}`, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          return this.handle403ErrorAndRetry(() =>
            this.http.delete<[]>(`${URL}api/admin/users/${studentId}`, { headers })
          );
        } else {
          return throwError(error);
        }
      })
    );
  }

  getStudentById(studentId: any): Observable<any> {
    const headers = this.addAuthorizationHeader(new HttpHeaders());

    return this.http.get<[]>(`${URL}api/admin/users/${studentId}`, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          return this.handle403ErrorAndRetry(() =>
            this.http.get<[]>(`${URL}api/admin/users/${studentId}`, { headers })
          );
        } else {
          return throwError(error);
        }
      })
    );
  }


  updateStudent(studentId: number, studentDto: any): Observable<any> {
    const headers = this.addAuthorizationHeader(new HttpHeaders());

    return this.http.put<[]>(`${URL}api/admin/users/${studentId}`, studentDto, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          return this.handle403ErrorAndRetry(() =>
            this.http.put<[]>(`${URL}api/admin/users/${studentId}`, studentDto, { headers })
          );
        } else {
          return throwError(error);
        }
      })
    );
  }

}
