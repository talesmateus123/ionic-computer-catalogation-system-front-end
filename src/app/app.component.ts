import { Component, OnInit } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Equipamentos',
      url: 'equipments',
      icon: 'desktop'
    },
    /*
    {
      title: 'Componentes eletrônicos',
      url: 'equipments/electronic-components',
      icon: 'hardware-chip'
    },
    */
    {
      title: 'Usuários',
      url: 'computer-users',
      icon: 'people'
    },
    {
      title: 'Setores',
      url: 'sectors',
      icon: 'albums'
    },
    {
      title: 'Gerar relatórios',
      url: 'reports',
      icon: 'document-text'
    }    
  ];
  public labels = ['Family', 'Friends'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}
