import { Component, OnInit } from '@angular/core';
import { ComputerUserControllerService } from './shared';

@Component({
  selector: 'app-computer-users',
  templateUrl: './computer-users.page.html',
  styleUrls: ['./computer-users.page.scss'],
})
export class ComputerUsersPage implements OnInit {

  constructor(public controller: ComputerUserControllerService) { }

  ngOnInit() {
    this.controller.updateComputerUsersList();
  }
}
