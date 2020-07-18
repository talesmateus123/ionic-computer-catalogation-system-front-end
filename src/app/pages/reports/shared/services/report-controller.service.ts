import { Injectable } from '@angular/core';
import { ReportService } from './report.service';

@Injectable({
  providedIn: 'root'
})
export class ReportControllerService {

  constructor(private reportService: ReportService) { }

  getComputersReport() {
    this.reportService.getComputersReport()
      .subscribe(response => {
        this.savePdf(response, "Relatório dos computadores");
      },
      error => {
        console.log(error);
      });
  }

  getPrintersReport() {
    this.reportService.getPrintersReport()
      .subscribe(response => {
        this.savePdf(response, "Relatório das impressoras");
      },
      error => {
        console.log(error);
      });
  }

  getMonitorsReport() {
    this.reportService.getMonitorsReport()
      .subscribe(response => {
        this.savePdf(response, "Relatório dos monitores");
      },
      error => {
        console.log(error);
      });
  }

  getComputerUsersReport() {
    this.reportService.getComputerUsersReport()
      .subscribe(response => {
        this.savePdf(response, "Relatório dos usuários");
      },
      error => {
        console.log(error);
      });
  }

  getSectorsReport() {
    this.reportService.getSectorsReport()
      .subscribe(response => {
        this.savePdf(response, "Relatório dos setores");
      },
      error => {
        console.log(error);
      });
  }

  savePdf(pdfFile: any, pdfTitle: String) {
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
