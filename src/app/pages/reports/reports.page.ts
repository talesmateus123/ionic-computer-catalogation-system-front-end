import { Component, OnInit } from '@angular/core';
import { ReportControllerService } from './shared';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {

  constructor(public controller: ReportControllerService) { }

  ngOnInit() {
  }

}
