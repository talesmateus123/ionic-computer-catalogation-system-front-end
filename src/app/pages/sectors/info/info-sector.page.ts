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
        this.successMessageAlert("Setor salvo com sucesso");
      },
      error => {
        this.errorMessageAlert(error);
      }
    );
    this.cancel();
  }

  delete(){
    this.service.delete(this.id).subscribe(
      res => {
        this.successMessageAlert("Setor excluído com sucesso");
      },
      error => {
        this.errorMessageAlert(error);
      }
    );
    this.cancel();
  }

  cancel() {
    this.router.navigate(['/sectors']);    
  }

  async successMessageAlert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Sucesso!',
      //subHeader: 'Subtitle',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  async errorMessageAlert(error: any) {
    let msg: any;
    if(error.error.error === undefined)
      msg = "Erro desconhecido";
    else
      msg = error.error.error;
    const alert = await this.alertController.create({
      header: 'Opps!',
      //subHeader: 'Subtitle',
      message: 'Parece que ocorreu um erro: ' + msg,
      buttons: ['OK']
    });

    await alert.present();
  }
}
