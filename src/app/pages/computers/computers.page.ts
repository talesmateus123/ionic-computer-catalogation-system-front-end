import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { ComputerService } from './domain';
import { ComputerDTO } from '../../models';

@Component({
  selector: 'app-computers',
  templateUrl: './computers.page.html',
  styleUrls: ['./computers.page.scss'],
})
export class ComputersPage implements OnInit {

  items: ComputerDTO[];

  constructor(
    private computerService: ComputerService) { }

  ngOnInit() {
    this.computerService.findAll()
      .subscribe(response => {
        this.items = response;
      },
      error => {
        console.log(error);
      });
  }

}
