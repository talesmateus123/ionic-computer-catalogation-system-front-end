import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Computadores',
      url: '/computers',
      icon: 'laptop'
    },
    {
      title: 'Monitores',
      url: '/monitors',
      icon: 'desktop'
    },
    {
      title: 'Setores',
      url: '/sectors',
      icon: 'desktop'
    }
  ];
  public labels = ['Family', 'Friends'];
  public isTheHomePage: boolean;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    /*
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd ) {
        if(event.url === "/" || event.url === "/home")
          this.isTheHomePage = true;
        else
          this.isTheHomePage = false;
      }
    });
    */
  }
}
