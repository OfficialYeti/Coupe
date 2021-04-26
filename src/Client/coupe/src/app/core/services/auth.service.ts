import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignoutResponse, User, UserManager, UserManagerSettings } from 'oidc-client';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _userManager: UserManager;
  public user: User;

  private _loginStateChangedSubject = new Subject<boolean>();
  public loginStateChanged = this._loginStateChangedSubject.asObservable();

  constructor(private router: Router) {
    const IdProviderSerttings: UserManagerSettings = {
      authority: 'https://localhost:5001',
      client_id: 'angular-at',
      response_type: 'code',
      scope: 'openid profile api.scope',
      redirect_uri: `http://localhost:4200/signin-callback`,
      post_logout_redirect_uri: `http://localhost:4200/signout-callback`,
      automaticSilentRenew: true,
      revokeAccessTokenOnSignout: true,
      // silent_redirect_uri: environment.tokenRenewUrl,
    };
    this._userManager = new UserManager(IdProviderSerttings);
    this._userManager.events.addAccessTokenExpired((_) => {
      console.log('Your token has expired.');
      this._loginStateChangedSubject.next(false);
      this.router.navigateByUrl('/');
    });
  }

  public login(): Promise<void> {
    return this._userManager.signinRedirect();
  }

  public async isLoggedIn(): Promise<boolean> {
    const user = await this._userManager.getUser();
    const isUserValid = !!user && !user.expired;
    if (this.user !== user) {
      this.user = user;
      this._loginStateChangedSubject.next(isUserValid);
    }
    return isUserValid;
  }

  public async completeLogin(): Promise<User> {
    const user = await this._userManager.signinRedirectCallback();
    this.user = user;
    this._loginStateChangedSubject.next(!!user && !user.expired);
    return user;
  }

  public logout(): Promise<void> {
    return this._userManager.signoutRedirect();
  }

  public completeLogout(): Promise<SignoutResponse> {
    this.user = undefined;
    this._loginStateChangedSubject.next(false);
    return this._userManager.signoutRedirectCallback();
  }

  public async getAccessTokenAsync(): Promise<string> {
    const user = await this._userManager.getUser();
    return !!user && !user.expired ? user.access_token : undefined;
  }

  public getAccessToken(): string {
    if (this.user && this.user.expired) {
      this.refreshToken();
    }
    return !!this.user && !this.user.expired ? this.user.access_token : undefined;
  }

  private refreshToken(): void {
    this._userManager.getUser().then((user) => {
      this.user = user;
    });
  }
}