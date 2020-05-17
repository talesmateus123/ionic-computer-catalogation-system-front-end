import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { SectorNewDTO } from 'src/app/models/sector_new.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { SectorService, SectorControllerService } from '../shared';

@Component({
  selector: 'app-new-sector',
  templateUrl: './new-sector.page.html',
  styleUrls: ['./new-sector.page.scss'],
})
export class NewSectorPage implements OnInit {
  sector: SectorNewDTO = {
    name: ""
  };

  constructor(public controller: SectorControllerService) { }

  ngOnInit() {
  }

  create(){
    this.controller.createSector(this.sector);
  }
}
