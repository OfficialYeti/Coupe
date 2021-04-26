import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  accessToken: string;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.getAccessTokenAsync().then(x => this.accessToken = x);
  }

  public onLogin(): void {
    this.auth.login().then(x => console.log(x));
  }
}
