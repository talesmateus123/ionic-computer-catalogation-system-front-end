import { Component, OnInit } from '@angular/core';
import { SupportControllerService } from './shared/services/support-controller.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {

  constructor(public controller: SupportControllerService) { }

  ngOnInit() {
    this.controller.updateSupportsList();
  }

}
