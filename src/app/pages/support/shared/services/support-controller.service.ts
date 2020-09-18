import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { SupportInfo } from './../models';
import { SupportInfoService } from './support-info.service';
import { SearchSupportModalPage } from './../../modals/search/search-support-modal.page';

@Injectable({
  providedIn: 'root'
})
export class SupportControllerService {
  public searchTerm: string = '';
  public asc: boolean = true;
  public orderBy: string = 'patrimonyId';

  public supportInfos: SupportInfo[];

  constructor(
    private router: Router,
    private modalController: ModalController,
    private service: SupportInfoService
  ) { }

  findSupport(id: string): Observable<any> {
    return this.service.findById(id);
  }

  searchSupport(searchTerm: string, direction: string, orderBy: string): void {
    this.supportInfos = undefined;
    this.service.search(searchTerm, direction, orderBy)
      .subscribe(response => {
        this.supportInfos = response.body.content;
      },
      error => {

      });
  }

  updateSupportsList(): void {
    this.supportInfos = undefined;
    this.service.findAll()
      .subscribe(response => {
        this.supportInfos = response;
      },
      error => {

      });
  }

  redirectToRootPage(): void {
    this.router.navigate(['equipments']);
  }

  async searchModalPresent() {
    const modal = await this.modalController.create({
      component: SearchSupportModalPage,
      componentProps: {
        searchTerm: this.searchTerm,
        asc: this.asc,
        orderBy: this.orderBy
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data !== undefined) {
        this.searchTerm = dataReturned.data.searchTerm;
        this.asc = dataReturned.data.asc;
        this.orderBy = dataReturned.data.orderBy;

        this.searchSupport(dataReturned.data.searchTerm, dataReturned.data.asc ? 'ASC' : 'DESC', dataReturned.data.orderBy);
      }
    });
    return await modal.present();
  }
}
