import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SectorNewDTO } from '../shared/';
import { SectorControllerService } from '../shared';
import { LoadingModalControllerService } from 'src/app/shared-resources';
@Component({
  selector: 'app-info-sector',
  templateUrl: './info-sector.page.html',
  styleUrls: ['./info-sector.page.scss'],
})
export class InfoSectorPage implements OnInit {
  id: string;
  sector: SectorNewDTO;
  editForm: boolean

  constructor(
    public controller: SectorControllerService,
    private loadingModalControllerService: LoadingModalControllerService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.editForm = true;
    this.initValues();
  }

  async initValues() {
    await this.loadingModalControllerService.loadingPresent();
    this.controller.findSector(this.id).subscribe(
      res => {
        this.sector = res
        this.loadingModalControllerService.loadingDismiss();
      },
      error => {
        //this.controller.errorMessageAlert(error);
        this.controller.redirectToRootPage();
        this.loadingModalControllerService.loadingDismiss();
      }
    )
  }
  
  setEditForm() {
    if (this.editForm)
      this.editForm = false;
    else
      this.editForm = true;
  }

  update(){
    this.controller.updateSector(this.id, this.sector);
  }

  delete(){
    this.controller.deleteSector(this.id);
  }

  eventHandler($keyCode) {
    if ($keyCode === 13)
      this.update();
  }
}
