import { Component, OnInit } from '@angular/core';
import { RouteRedirectorService, PingRequestService } from './../../shared-resources';
import { AuthenticationControllerService } from 'src/app/pages/authentication/login/shared/services/authentication-controller.service';

@Component({
  selector: 'app-auth-or-home',
  templateUrl: './auth-or-home.page.html',
  styleUrls: ['./auth-or-home.page.scss'],
})
export class AuthOrHomePage implements OnInit {

  constructor(
    private routeRedirectorService: RouteRedirectorService,
    private authenticationControllerService: AuthenticationControllerService,
    private pingRequestService: PingRequestService
  ) { }

  ngOnInit() {
    this.checkIfLoggedIn();
  }

  private async checkIfLoggedIn() {
    if (this.authenticationControllerService.isLoggedIn()) {
      await this.pingRequestService.ping().toPromise().then(() => {
        this.routeRedirectorService.redirectToEquipmentsPage();
      });
      return;
    }
    this.routeRedirectorService.redirectToLoginPage();
  }

}
