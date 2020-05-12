import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { SectorNewDTO } from 'src/app/models/sector_new.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { SectorService } from '../shared';

@Component({
  selector: 'app-new-sector',
  templateUrl: './new-sector.page.html',
  styleUrls: ['./new-sector.page.scss'],
})
export class NewSectorPage implements OnInit {
  object: SectorNewDTO = {
    name: ""
  };

  constructor(
    public alertController: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    private service: SectorService) { }

  ngOnInit() {
  }

  create(){
    this.service.create(this.object).subscribe(
      res => {
        this.successMessageAlert("Setor criado com sucesso");
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
