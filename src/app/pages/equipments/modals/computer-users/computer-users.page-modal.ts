import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { ComputerUserDTO, ComputerUserService } from '../../../computer-users';
import { SearchComputerUserModalPage } from './search';

@Component({
  selector: 'app-computer-users-modal',
  templateUrl: './computer-users-modal.page.html',
  styleUrls: ['./computer-users-modal.page.scss'],
})
export class ComputerUsersModalPage implements OnInit {
  private index: number;
  public computerUsersAlreadyEntered: ComputerUserDTO[];
  public computerUsers: ComputerUserDTO[];

  public searchTerm: string = '';
  public asc: boolean = true;
  public orderBy: string = 'name';

  constructor(
    private modalController: ModalController,
    private computerUserService: ComputerUserService
  ) { }

  ngOnInit() {
    this.updateComputerUsersList();
  }

  returnDataAndDismiss(computerUser: ComputerUserDTO) {
    this.modalController.dismiss(
      {
        index: this.index,
        computerUser
      }
     );
  }

  dismiss() {
    this.modalController.dismiss();
  }

  private updateComputerUsersList(): void {
    this.computerUsers = undefined;
    this.computerUserService.findAll()
      .subscribe(res => {
        this.computerUsers = [];
        for (const i in res) {
          if (!this.contains(this.computerUsersAlreadyEntered, res[i])) {
            this.computerUsers.push(res[i]);
          }
        }
      },
      error => {

      });
  }

  private contains(a: ComputerUserDTO[], obj: ComputerUserDTO) {
    let i = a.length;
    while (i--) {
      if (a[i] !== undefined) {
        if (a[i].id === obj.id) {
          return true;
        }
      }
    }
    return false;
  }

  private searchComputerUser(searchTerm: string, direction: string, orderBy: string) {
    this.computerUsers = undefined;
    this.computerUserService.search(searchTerm, direction, orderBy)
      .subscribe(res => {
        this.computerUsers = [];
        for (const index in res.body.content) {
          if (!this.contains(this.computerUsersAlreadyEntered, res.body.content[index])) {
            this.computerUsers.push(res.body.content[index]);
          }
        }
      },
      error => {
        // this.errorMessageAlert(error);
      });
  }

  async searchModalPresent() {
    const modal = await this.modalController.create({
      component: SearchComputerUserModalPage,
      componentProps: {
        searchTerm: this.searchTerm,
        asc: this.asc,
        orderBy: this.orderBy
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data) {
        this.searchTerm = dataReturned.data.searchTerm;
        this.asc = dataReturned.data.asc;
        this.orderBy = dataReturned.data.orderBy;
        this.searchComputerUser(dataReturned.data.searchTerm, dataReturned.data.asc ? 'ASC' : 'DESC', dataReturned.data.orderBy);
      }
    });
    return await modal.present();
  }

}
