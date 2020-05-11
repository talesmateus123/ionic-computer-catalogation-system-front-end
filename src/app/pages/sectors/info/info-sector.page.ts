import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { SectorNewDTO } from 'src/app/models/sector_new.dto';
import { SectorService } from '../shared';
@Component({
  selector: 'app-info-sector',
  templateUrl: './info-sector.page.html',
  styleUrls: ['./info-sector.page.scss'],
})
export class InfoSectorPage implements OnInit {
  id: string;
  object: SectorNewDTO;
  editForm: boolean

  constructor(
    public alertController: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    private service: SectorService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.service.findById(this.id).subscribe(
      res => {
        this.object = res
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
    this.service.update(this.id, this.object).subscribe(
      res => {
        alert('Atualizado com sucesso!');
        this.router.navigate(['/sectors']);
      }
    )
  }

  delete(){
    this.service.delete(this.id).subscribe(
      res => {
        alert('Excluído com sucesso!');
        this.router.navigate(['/sectors']);
      }
    )
  }

}
