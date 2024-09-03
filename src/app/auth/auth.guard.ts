import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const tokenService=inject(TokenService)
  const router = inject(Router);

  // Extract the user ID from the token
  const userId = tokenService.extractUserId();

  if (userId === null) {
    router.navigate(['/unauthorized']); // Redirect to unauthorized if no user ID
    return of(false);
  }

  // Check the user's role using the API
  return userService.CheckAuthorization(userId).pipe(
    map((response: any) => {
      const allowedRoles = ['Super Administrator', 'Client', 'Admin Depot', 'Administrateur réserve officine'];

      if (response.isAuthorized && allowedRoles.includes(response.name)) {
        return true;
      } else {
        router.navigate(['/unauthorized']); // Redirect to unauthorized if the role is not allowed
        return false;
      }
    }),
    catchError((error) => {
      router.navigate(['/unauthorized']); // Handle errors and redirect
      return of(false);
    })
  );
};
