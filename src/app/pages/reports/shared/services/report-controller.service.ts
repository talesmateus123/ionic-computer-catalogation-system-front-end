import { Injectable } from '@angular/core';

import { Platform } from '@ionic/angular';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';

import { ReportService } from './report.service';
import { LoadingModalControllerService, ToastMessageControllerService } from 'src/app/shared-resources';

@Injectable({
  providedIn: 'root'
})
export class ReportControllerService {
  private loadingMsg: string = 'Processando...';

  constructor(
    private transfer: FileTransfer,
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
    var pdfBlob = new Blob([pdfFile], { type: 'application/pdf' });
    // IE doesn't allow using a blob object directly as link href
    // instead it is necessary to use msSaveOrOpenBlob
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        this.saveInIe(pdfBlob)
        return;
    }

    // Create a link pointing to the ObjectURL containing the blob.
    const data = window.URL.createObjectURL(pdfBlob);

    pdfTitle = `${pdfTitle}.pdf`
    //if(this.platform.is('mobileweb') || this.platform.is('android')) {

      this.saveInPlatform(encodeURI(data), pdfTitle);

      console.log(data.substring(5))
      return;
    //}

    this.saveInOthersBrowsers(data, pdfTitle);
  }

  private saveInIe(pdfBlob: any) {
    window.navigator.msSaveOrOpenBlob(pdfBlob);
  }

  private saveInPlatform(data: any, pdfTitle: string) {
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.download(data, this.file.dataDirectory + pdfTitle).then(
      entry => {
        this.fileOpener.open(entry.toURL(), 'application/pdf');
        //this.toastMessageControllerService.successMessageAlert("entrou" + entry.toURL());
      },
      error => {
        this.toastMessageControllerService.errorMessageAlert('erro');
        console.log(error)
      });
  }

  private saveInOthersBrowsers(data: any, pdfTitle: string) {
    let link = document.createElement('a');
    link.href = data;
    link.download = pdfTitle;

    console.log(link)

    /*
    // this is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

    setTimeout(function () {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(link.href);
        link.remove();
    }, 100);
    */
  }

}
