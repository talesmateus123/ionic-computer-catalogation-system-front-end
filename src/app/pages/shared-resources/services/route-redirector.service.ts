import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteRedirectorService {

  constructor(
    private router: Router
  ) { }

  public redirectToLoginPage(): void {
    this.router.navigate(['login']);
  }

  public redirectToEquipmentsPage(): void {
    this.router.navigate(['equipments']);
  }

  public redirectToNoConnectionPage(): void {
    this.router.navigate(['no-connection']);
  }

}
