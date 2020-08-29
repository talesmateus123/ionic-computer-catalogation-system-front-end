import { Component, OnInit } from '@angular/core';
import { AuthenticationControllerService, AuthenticationService, ClientService, ClientDTO, ClientNewDTO } from '../../login';
import { ToastMessageControllerService } from 'src/app/shared-resources';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.page.html',
  styleUrls: ['./info-user.page.scss'],
})
export class InfoUserPage implements OnInit {
  id: string;
  user: ClientNewDTO;
  editForm: boolean;

  constructor(
    private authenticationControllerService: AuthenticationControllerService,
    private service: ClientService,
    private toastMessageControllerService: ToastMessageControllerService
  ) { }

  ngOnInit() {
    this.editForm = true;
    let clientDTO: ClientDTO = this.authenticationControllerService.user;
    this.id = clientDTO.id;
    this.user = {
      name: clientDTO.name,
      email: clientDTO.email,
      password: ""
    };
  } 

  setEditForm() {
    if (this.editForm)
      this.editForm = false;
    else
      this.editForm = true;
  }
  
  update(){
    this.service.update(this.id, this.user)
      .subscribe(res => {
        this.toastMessageControllerService.successMessageAlert("Usuário salvo com sucesso")
        this.authenticationControllerService.logout();
      },
      error => {

      });
  }

  delete(){
    this.service.delete(this.id)
      .subscribe(res => {
        this.toastMessageControllerService.successMessageAlert("Usuário excluído com sucesso")
        this.authenticationControllerService.logout();
      },
      error => {

      });
  }

  eventHandler($keyCode) {
    if ($keyCode === 13)
      this.update();
  }

}
