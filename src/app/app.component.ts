import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationControllerService } from './pages';

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
    {
      title: 'Suporte',
      url: 'support',
      icon: 'sad'
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

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public authenticationControllerService: AuthenticationControllerService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.show();
      this.splashScreen.hide();
    });
  }

}
