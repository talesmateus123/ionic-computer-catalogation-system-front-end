import { Component, OnInit } from '@angular/core';
import { SectorControllerService } from './shared';

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.page.html',
  styleUrls: ['./sectors.page.scss'],
})
export class SectorsPage implements OnInit {

  constructor(public controller: SectorControllerService) { }

  ngOnInit() {
    this.controller.updateSectorsList();
  }

}
