import { Injectable } from '@angular/core';
import { ReportService } from './report.service';
import { LoadingModalControllerService } from 'src/app/shared-resources';

@Injectable({
  providedIn: 'root'
})
export class ReportControllerService {

  constructor(
    private reportService: ReportService,
    private loadingModalControllerService: LoadingModalControllerService
  ) { }

  async getComputersReport() {
    await this.loadingModalControllerService.loadingPresent();
    this.reportService.getComputersReport()
      .subscribe(response => {
        this.savePdf(response, "Relatório dos computadores");
        this.loadingModalControllerService.loadingDismiss();
      },
      error => {
        //console.log(error);
        this.loadingModalControllerService.loadingDismiss();
      });
  }

  async getPrintersReport() {
    await this.loadingModalControllerService.loadingPresent();
    this.reportService.getPrintersReport()
      .subscribe(response => {
        this.savePdf(response, "Relatório das impressoras");
        this.loadingModalControllerService.loadingDismiss();
      },
      error => {
        //console.log(error);
        this.loadingModalControllerService.loadingDismiss();
      });
  }

  async getMonitorsReport() {
    await this.loadingModalControllerService.loadingPresent();
    this.reportService.getMonitorsReport()
      .subscribe(response => {
        this.savePdf(response, "Relatório dos monitores");
        this.loadingModalControllerService.loadingDismiss();
      },
      error => {
        //console.log(error);
        this.loadingModalControllerService.loadingDismiss();
      });
  }

  async getComputerUsersReport() {
    await this.loadingModalControllerService.loadingPresent();
    this.reportService.getComputerUsersReport()
      .subscribe(response => {
        this.savePdf(response, "Relatório dos usuários");
        this.loadingModalControllerService.loadingDismiss();
      },
      error => {
        //console.log(error);
        this.loadingModalControllerService.loadingDismiss();
      });
  }

  async getSectorsReport() {
    await this.loadingModalControllerService.loadingPresent();
    this.reportService.getSectorsReport()
      .subscribe(response => {
        this.savePdf(response, "Relatório dos setores");
        this.loadingModalControllerService.loadingDismiss();
      },
      error => {
        //console.log(error);
        this.loadingModalControllerService.loadingDismiss();
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
