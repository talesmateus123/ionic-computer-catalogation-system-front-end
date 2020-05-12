import { Component, OnInit } from '@angular/core';
import { SectorDTO } from 'src/app/models/sector.dto';
import { SectorService } from './shared';

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.page.html',
  styleUrls: ['./sectors.page.scss'],
})
export class SectorsPage implements OnInit {
  items: SectorDTO[];

  constructor(private sectorService: SectorService) { }

  ngOnInit() {
    this.populateSectors();
  }

  populateSectors() {
    this.sectorService.findAll()
      .subscribe(response => {
        this.items = response;
      },
      error => {
        console.log(error);
      });
  }

}
