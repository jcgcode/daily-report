import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {timer} from 'rxjs';
import {AuthService} from './services/auth.service';
import {Router, Routes} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    showSplash = true;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private authService: AuthService,
        private router: Router
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            timer(3000).subscribe(() => this.showSplash = false);
            this.authService.authenticationState.subscribe(state => {
                console.log('Auth changed: ', state);
                if (state) {
                    this.router.navigate(['new-daily']);
                } else {
                    this.router.navigate(['login']);
                }
            });
        });
    }
}
