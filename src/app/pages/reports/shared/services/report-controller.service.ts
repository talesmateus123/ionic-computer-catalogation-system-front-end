import { Injectable } from '@angular/core';
import { ReportService } from './report.service';
import { LoadingModalControllerService } from 'src/app/shared-resources';

@Injectable({
  providedIn: 'root'
})
export class ReportControllerService {
  private loadingMsg: string = 'Processando...';

  constructor(
    private reportService: ReportService,
    private loadingModalControllerService: LoadingModalControllerService
  ) { }

  async getComputersReport() {
    await this.loadingModalControllerService.loadingPresent(this.loadingMsg);
    this.reportService.getComputersReport()
      .subscribe(res => {
        this.savePdf(res, "Relatório dos computadores");
        this.loadingModalControllerService.loadingDismiss();
      },
      error => {
        
      });
  }

  async getPrintersReport() {
    await this.loadingModalControllerService.loadingPresent(this.loadingMsg);
    this.reportService.getPrintersReport()
      .subscribe(res => {
        this.savePdf(res, "Relatório das impressoras");
        this.loadingModalControllerService.loadingDismiss();
      },
      error => {

      });
  }

  async getMonitorsReport() {
    await this.loadingModalControllerService.loadingPresent(this.loadingMsg);
    this.reportService.getMonitorsReport()
      .subscribe(res => {
        this.savePdf(res, "Relatório dos monitores");
        this.loadingModalControllerService.loadingDismiss();
      },
      error => {

      });
  }

  async getComputerUsersReport() {
    await this.loadingModalControllerService.loadingPresent(this.loadingMsg);
    this.reportService.getComputerUsersReport()
      .subscribe(res => {
        this.savePdf(res, "Relatório dos usuários");
        this.loadingModalControllerService.loadingDismiss();
      },
      error => {

      });
  }

  async getSectorsReport() {
    await this.loadingModalControllerService.loadingPresent(this.loadingMsg);
    this.reportService.getSectorsReport()
      .subscribe(res => {
        this.savePdf(res, "Relatório dos setores");
        this.loadingModalControllerService.loadingDismiss();
      },
      error => {

      });
  }

  private savePdf(pdfFile: any, pdfTitle: String) {
      // It is necessary to create a new blob object with mime-type explicitly set
      // otherwise only Chrome works like it should
      var newBlob = new Blob([pdfFile], { type: "application/pdf" });

      // IE doesn't allow using a blob object directly as link href
      // instead it is necessary to use msSaveOrOpenBlob
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(newBlob);
          return;
      }

      // For other browsers: 
      // Create a link pointing to the ObjectURL containing the blob.
      const data = window.URL.createObjectURL(newBlob);

      var link = document.createElement('a');
      link.href = data;
      link.download = `${pdfTitle}.pdf`;
      // this is necessary as link.click() does not work on the latest firefox
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

      setTimeout(function () {
          // For Firefox it is necessary to delay revoking the ObjectURL
          window.URL.revokeObjectURL(data);
          link.remove();
      }, 100);
  }
}
