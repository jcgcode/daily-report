import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {timer} from 'rxjs';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';
import {environment} from '../environments/environment';

declare var TestFairy: any;

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
        /*this.router.events.subscribe((event: any) => {
            console.log(event);
            if (event instanceof NavigationEnd) {
            }
        });*/
    }

    initializeApp() {
        this.platform.ready().then(() => {
            if ((window as any).TestFairy) {
                TestFairy.begin(environment.TEST_FAIRY);
            }
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            timer(3000).subscribe(() => this.showSplash = false);
            this.authService.authenticationState.subscribe(state => {
                console.log('Auth changed: ', state);
                if (state) {
                    this.router.navigate(['tabs']);
                } else {
                    this.router.navigate(['login']);
                }
            });
        });
    }
}
