import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signin-callback',
  templateUrl: './signin-callback.component.html',
  styleUrls: ['./signin-callback.component.scss']
})
export class SigninCallbackComponent implements OnInit {
  constructor(private _authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log("Complete login")

    if (this._route.snapshot.queryParamMap.get('error') === 'access_denied') {
      console.error('You do not have permission to use this application.');
      this._router.navigate(['/'], { replaceUrl: true });
    }

    this._authService.completeLogin().then((_) => {
      this._router.navigate(['/'], { replaceUrl: true });
    });
  }
}