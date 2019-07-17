import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {DailyService} from '../../services/daily.service';

@Component({
    selector: 'app-new-daily',
    templateUrl: './new-daily.page.html',
    styleUrls: ['./new-daily.page.scss'],
})
export class NewDailyPage implements OnInit {

    dailyDone: boolean;

    constructor(private authService: AuthService,
                private dailyService: DailyService) {
    }

    ngOnInit() {
        this.dailyService.isTodaysDailyDone().then((response) => {
            this.dailyDone = response;
        });
    }

    /*ionViewDidEnter() {
        document.addEventListener('backbutton', e => {
            console.log('disable back button');
        }, false);
    }*/

    logout() {
        this.authService.logout();
    }

}
