import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  const authServices = inject(AuthService);
  const router = inject(Router);
  authServices.isLoggedIn || router.navigate(['login']);
  return true;
};
