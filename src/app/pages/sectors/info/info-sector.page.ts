import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { SectorNewDTO } from '../shared/';
import { SectorService, SectorControllerService } from '../shared';
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
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.controller.findSector(this.id).subscribe(
      res => {
        this.sector = res
      }
    )
    this.editForm = true;
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
}
