import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { APP_ROUTES } from './app-routes.const';
import { LoginComponent } from './login/login.component';
import { SigninCallbackComponent } from './login/signin-callback/signin-callback.component';
import { SignoutCallbackComponent } from './login/signout-callback/signout-callback.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  {
    path: APP_ROUTES.HOME, component: MainPageComponent
  },
  {
    path: APP_ROUTES.LOGIN, component: LoginComponent
  },
  {
    path: APP_ROUTES.SIGNIN_CALLBACK, component: SigninCallbackComponent
  },
  {
    path: APP_ROUTES.SIGNOUT_CALLBACK, component: SignoutCallbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
