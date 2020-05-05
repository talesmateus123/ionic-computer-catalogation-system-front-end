import { Component, OnInit } from '@angular/core';

import { CredentialsDTO } from '../../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  credentials: CredentialsDTO = {
    "email": "",
    "password": ""
  }

  constructor() { }

  ngOnInit() {
  }

  login() {
    console.log(this.credentials)
  }

}
