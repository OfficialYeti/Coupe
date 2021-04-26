import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signout-callback',
  templateUrl: './signout-callback.component.html',
  styleUrls: ['./signout-callback.component.scss']
})
export class SignoutCallbackComponent implements OnInit {
  constructor(
    private _authService: AuthService,
    private _router: Router) { }

  ngOnInit(): void {
    this._authService.completeLogout().then(_ =>
      this._router.navigateByUrl('/', { replaceUrl: true })
    );
  }
}