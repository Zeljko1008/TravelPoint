import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

   const authService = inject(AuthService);
   const router = inject(Router);

    if (!authService.userIsAuthenticated) {
        router.navigate(['/auth']);
        return false;
    }

        return true;



};
