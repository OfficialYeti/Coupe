import { Component, OnInit } from '@angular/core';
import { APP_ROUTES } from '../app-routes.const';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  public readonly loginRoute: string = APP_ROUTES.LOGIN;
  constructor() { }

  public ngOnInit(): void {
  }

}
