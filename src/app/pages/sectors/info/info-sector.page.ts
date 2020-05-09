import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SectorDTO } from 'src/app/models/sector.dto';
import { SectorService } from '../shared';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info-sector',
  templateUrl: './info-sector.page.html',
  styleUrls: ['./info-sector.page.scss'],
})
export class InfoSectorPage implements OnInit {
  //@ViewChild('form') form: NgForm;
  id: string;
  object: SectorDTO;

  constructor(private service: SectorService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.service.findById(this.id).subscribe(
      res => {
        this.object = res
      }
    )
  }
}
