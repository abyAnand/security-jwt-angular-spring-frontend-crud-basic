import { Component, OnInit } from '@angular/core';
import { StorageService } from './auth/services/storage/storage.service';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './auth/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'user-management';

  isAdminLoggedIn: boolean;
  isStudentLoggedIn: boolean;

  constructor(
    private router: Router,
    private authService: AuthService
    ) {}

  ngOnInit(): void {
    this.updateUserLoggedStatus();
    this.router.events.subscribe(event =>{
      if(event instanceof NavigationEnd){
        this.updateUserLoggedStatus();
      }
    })
  }

  private updateUserLoggedStatus():void{
    this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
    this.isStudentLoggedIn = StorageService.isStudentLoggedIn();
  }

  logout(){
    StorageService.logout();
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }


}
