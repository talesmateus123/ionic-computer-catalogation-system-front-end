import { Component, OnInit } from '@angular/core';
import { AuthenticationControllerService } from 'src/app/pages';
import { PingRequestService } from './../../shared-resources';

@Component({
  selector: 'app-auth-or-home',
  templateUrl: './auth-or-home.page.html',
  styleUrls: ['./auth-or-home.page.scss'],
})
export class AuthOrHomePage implements OnInit {

  constructor(
    private pingRequestService: PingRequestService,
    public authenticationControllerService: AuthenticationControllerService
  ) { }

  ngOnInit() {
  }

  private async checkIfLoggedIn() {
    if (this.authenticationControllerService.isLoggedIn()) {
      await this.pingRequestService.ping().toPromise().then(() => {
        this.authenticationControllerService.redirectToEquipmentsPage();
      });
      return;
    }
    this.authenticationControllerService.redirectToLoginPage();
  }

}
