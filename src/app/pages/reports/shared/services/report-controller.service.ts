import { Injectable } from '@angular/core';

import { Platform } from '@ionic/angular';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';

import { ReportService } from './report.service';
import { LoadingModalControllerService, ToastMessageControllerService } from 'src/app/shared-resources';

@Injectable({
  providedIn: 'root'
})
export class ReportControllerService {
  private loadingMsg = 'Processando...';

  constructor(
    private fileOpener: FileOpener,
    private file: File,
    private platform: Platform,
    private reportService: ReportService,
    private loadingModalControllerService: LoadingModalControllerService,
    private toastMessageControllerService: ToastMessageControllerService
  ) { }

  async getComputersReport() {
    await this.loadingModalControllerService.loadingPresent(this.loadingMsg);
    this.reportService.getComputersReport()
      .subscribe(res => {
        this.save(res, 'Relatório dos computadores');
        this.loadingModalControllerService.loadingDismiss();
      },
      error => {

      });
  }

  async getPrintersReport() {
    await this.loadingModalControllerService.loadingPresent(this.loadingMsg);
    this.reportService.getPrintersReport()
      .subscribe(res => {
        this.save(res, 'Relatório das impressoras');
        this.loadingModalControllerService.loadingDismiss();
      },
      error => {

      });
  }

  async getMonitorsReport() {
    await this.loadingModalControllerService.loadingPresent(this.loadingMsg);
    this.reportService.getMonitorsReport()
      .subscribe(res => {
        this.save(res, 'Relatório dos monitores');
        this.loadingModalControllerService.loadingDismiss();
      },
      error => {

      });
  }

  async getComputerUsersReport() {
    await this.loadingModalControllerService.loadingPresent(this.loadingMsg);
    this.reportService.getComputerUsersReport()
      .subscribe(res => {
        this.save(res, 'Relatório dos usuários');
        this.loadingModalControllerService.loadingDismiss();
      },
      error => {

      });
  }

  async getSectorsReport() {
    await this.loadingModalControllerService.loadingPresent(this.loadingMsg);
    this.reportService.getSectorsReport()
      .subscribe(res => {
        this.save(res, 'Relatório dos setores');
        this.loadingModalControllerService.loadingDismiss();
      },
      error => {

      });
  }

  private save(pdfFile: any, pdfTitle: string) {
    const pdfBlob = new Blob([pdfFile], { type: 'application/pdf' });
    // IE doesn't allow using a blob object directly as link href
    // instead it is necessary to use msSaveOrOpenBlob

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      this.saveInIe(pdfBlob);
      return;
    }

    pdfTitle = `${pdfTitle}.pdf`;
    if (this.platform.is('mobileweb') || this.platform.is('android')) {
      this.saveInPlatform(pdfBlob, pdfTitle);
      return;
    }

    this.saveInOthersBrowsers(pdfBlob, pdfTitle);
  }

  private saveInIe(pdfBlob: any) {
    window.navigator.msSaveOrOpenBlob(pdfBlob);
  }

  private saveInPlatform(pdfBlob: any, pdfTitle: string) {
    this.file.writeFile(this.file.cacheDirectory, pdfTitle, pdfBlob, { replace: true }).then((fileEntry: any) => {
      // Open with File Opener plugin
      this.fileOpener.open(fileEntry.toURL(), 'application/pdf');
    }).catch((error) => {
        this.toastMessageControllerService.errorMessageAlert('Ocorreu um erro.', JSON.stringify(error));
      });
  }

  private saveInOthersBrowsers(pdfBlob: any, pdfTitle: string) {
    const link = document.createElement('a');
    // Create a link pointing to the ObjectURL containing the blob.
    link.href = window.URL.createObjectURL(pdfBlob);
    link.download = pdfTitle;

    // This is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

    setTimeout(function() {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(link.href);
      link.remove();
    }, 100);
  }

}
