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
        this.successMessageAlert();
        this.router.navigate(['/sectors']);
      },
      error => {
        this.errorMessageAlert();
      }
    )
  }

  async successMessageAlert() {
    const alert = await this.alertController.create({
      header: 'Sucesso!',
      //subHeader: 'Subtitle',
      message: 'Objeto criado com sucesso.',
      buttons: ['OK']
    });

    await alert.present();
  }
  async errorMessageAlert() {
    const alert = await this.alertController.create({
      header: 'Opps!',
      //subHeader: 'Subtitle',
      message: 'Parece que ocorreu um erro.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
