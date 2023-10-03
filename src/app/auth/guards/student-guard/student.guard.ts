import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { StorageService } from '../../services/storage/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: "root"
})


export class studentGuard implements CanActivate {

  constructor(
    private router: Router,
    private snackBar: MatSnackBar
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean{
    if(StorageService.isAdminLoggedIn()){
      this.router.navigateByUrl("/admin/dashboard");
      this.snackBar.open("You don't have Access to this page", "Close",{duration: 5000});
      return false;
    }
    else if(!StorageService.hasToken()){
      StorageService.logout()
      this.router.navigateByUrl("/login");
      this.snackBar.open("You are not Logged-In", "Close", {duration: 5000});
      return false;
    }
    return true;
  }

};
