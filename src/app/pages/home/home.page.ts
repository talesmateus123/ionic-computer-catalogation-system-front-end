import { Component, OnInit } from '@angular/core';

import { CredentialsDTO } from 'src/app/models';
import { AuthService } from 'src/app/services';
import { RouterLink, Router } from '@angular/router';

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

  constructor(
    public authService: AuthService,
    public router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.authenticate(this.credentials).subscribe(response => {
      this.authService.successfulLogin(response.headers.get('Authorization'));
      this.router.navigate(['/computers']);
    }, error => {
      console.log(error);
    })
  }


}
