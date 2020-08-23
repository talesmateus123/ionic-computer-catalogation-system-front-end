import { Component, OnInit } from '@angular/core';

import { ClientDTO, AuthenticationControllerService } from '../login';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.page.html',
  styleUrls: ['./user-management.page.scss'],
})
export class UserManagementPage implements OnInit {
  user: ClientDTO;

  constructor(
    private authenticationControllerService: AuthenticationControllerService
  ) { }

  ngOnInit() {
    this.user = this.authenticationControllerService.getSessionUser();
  }

}
