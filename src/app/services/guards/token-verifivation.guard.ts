import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user/user.service';

@Injectable()
export class TokenVerifivationGuard implements CanActivate {

  constructor(
    public _userService: UserService,
    public router: Router
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    console.log('Verificacion de Token');

        // TODO:Hacer que funcione el TokenVerifivationGuard
    const token = this._userService.token;
    console.log('Token en TokenVerificationGuards');
    console.log(token);
    console.log('Payload en TokenVerificationGuards');
    const payload = JSON.parse( atob(token.split('.')[1]));
    console.log(payload);
    console.log(payload.exp);

    const expired = this.expired ( payload.exp );

    if (expired) {
      this.router.navigate(['/login']);
      return false;
    }

    return this.renewVerification(payload.exp);
  }

  renewVerification( dateExpired ): Promise<boolean> {
    return new Promise ( (resolve, reject) => {
      const tokenExpiration = new Date( dateExpired * 1000);
      const now = new Date();

      now.setTime( now.getTime() + (1 * 60 * 60 * 1000) );
      // console.log( tokenExpiration );
      // console.log( now );

      if ( tokenExpiration.getTime() > now.getTime() ) {
        resolve(true);
      } else {
        this._userService.tokenRenew()
          .subscribe( () => {
            resolve(true);
          }, () => {
            this.router.navigate(['/login']);
            reject(false);
          });
      }

      resolve(true);

    });
  }

  expired( dateExpired: number) {
    const now = new Date().getTime() / 1000;

    if ( dateExpired < now) {
      return true;
    } else {
      return false;
    }

  }

}
