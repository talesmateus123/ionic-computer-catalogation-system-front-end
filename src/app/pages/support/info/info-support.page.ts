import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { SupportInfo, SupportControllerService } from '../shared';
import { LoadingModalControllerService } from '../../../shared-resources';

@Component({
  selector: 'app-info-support',
  templateUrl: './info-support.page.html',
  styleUrls: ['./info-support.page.scss'],
})
export class InfoSupportPage implements OnInit {
  private id: string;
  public filledValues: boolean = false;

  public supportInfo: SupportInfo;

  constructor(
    private route: ActivatedRoute,
    private loadingModalControllerService: LoadingModalControllerService,
    public controller: SupportControllerService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.initValues();
  }

  async initValues() {
    await this.loadingModalControllerService.loadingPresent();

    await this.controller.findSupport(this.id).toPromise().then(
      async res => {
        this.supportInfo = res;
        this.filledValues = true;
        this.loadingModalControllerService.loadingDismiss();
      }
    )
    .catch(() => {
      this.controller.redirectToRootPage();
    });
  }

}
